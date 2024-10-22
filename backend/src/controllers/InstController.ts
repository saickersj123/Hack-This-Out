import { 
  EC2Client, 
  RunInstancesCommand, 
  TerminateInstancesCommand, 
  _InstanceType as EC2InstanceType 
} from '@aws-sdk/client-ec2';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Instance from '../models/Instance';
import Machine from '../models/Machine';
import Contest from '../models/Contest';
import ContestParticipation from '../models/ContestParticipation';
import User from '../models/User';
import config from '../config/config';

// Configure AWS SDK v3
const ec2Client = new EC2Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId!,
    secretAccessKey: config.aws.secretAccessKey!,
  },
});

/**
 * Start an EC2 instance based on user's machine selection.
 */
export const startInstance = async (req: Request, res: Response) => {
  try {
    const { machineId } = req.params;
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json("User not registered / token malfunctioned");
    }

    // Fetch the machine from the database to get the AMI ID
    const machine = await Machine.findById(machineId);
    if (!machine) {
      res.status(400).json({ msg: 'Invalid machine ID selected' });
      return;
    }

    const ImageId = machine.amiId;
    const params = {
      ImageId,
      InstanceType: EC2InstanceType.t2_micro, // Use the enum for InstanceType
      MinCount: 1,
      MaxCount: 1,
      SecurityGroupIds: [config.aws.securityGroupId!], // Add your Security Group ID here
      TagSpecifications: [
        {
          ResourceType: 'instance',
          Tags: [{ Key: 'User', Value: user.id }],
        },
      ],
    };
    // Create and send RunInstancesCommand
    const runCommand = new RunInstancesCommand({
      ...params,
      TagSpecifications: [
        {
          ResourceType: 'instance' as const,
          Tags: [{ Key: 'User', Value: user.id }],
        },
      ],
    });
    const data = await ec2Client.send(runCommand);
    
    if (!data.Instances || data.Instances.length === 0 || !data.Instances[0].InstanceId) {
      res.status(500).json({ msg: 'Failed to create instance' });
      return;
    }

    const instanceId = data.Instances[0].InstanceId;

    // Save instance info to DB
    const newInstance = new Instance({
      user: user.id,
      instanceId,
      machineType: machine.name,
    });
    await newInstance.save();

    res.json({ msg: 'Instance is being created', instanceId });
  } catch (error) {
    console.error('Error starting instance:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Handle receiving VPN IP and updating instance status to 'running'.
 */
export const receiveVpnIp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { instanceId, vpnIp } = req.body;

        // Find the instance by instanceId
        const instance = await Instance.findOne({ instanceId });
        if (!instance) {
            res.status(404).json({ msg: 'Instance not found.' });
            return;
        }

        // Update the instance with VPN IP and set status to 'running'
        instance.vpnIp = vpnIp;
        instance.status = 'running';
        instance.runningTime = new Date();

        // Determine active contests for this instance based on current time and machine type
        const currentTime = new Date();
        const activeContests = await Contest.find({
            machines: instance.machineType,
            startTime: { $lte: currentTime },
            endTime: { $gte: currentTime },
        }).select('_id'); // Only retrieve the _id fields

        instance.activeContests = activeContests.map(contest => contest._id);

        await instance.save();

        if (activeContests.length > 0) {
            // Find related ContestParticipation records for this instance's machine and user
            const participations = await ContestParticipation.find({
                user: instance.user,
                machine: instance.machineType,
                contest: { $in: instance.activeContests },
                participationStartTime: null // Only update participations that haven't started
            });

            // Update participationStartTime for each relevant participation
            for (const participation of participations) {
                participation.participationStartTime = currentTime;
                await participation.save();
            }
        } else {
            console.log(`Instance ${instanceId} is running but has no active contests.`);
        }

        res.status(200).json({ msg: 'VPN IP received and instance is running.', instance });
    } catch (error: any) {
        console.error('Error receiving VPN IP:', error);
        res.status(500).send('Server error');
    }
};

/**
 * Handle flag submission, terminate instance, and clean up.
 */
export const submitFlag = async (req: Request, res: Response) => {
  try {
    const { instanceId } = req.params;
    const { flag } = req.body;
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json("User not registered / token malfunctioned");
    }

    // Validate flag
    const isValidFlag = await validateFlag(flag, user.id, instanceId);
    if (!isValidFlag) {
      res.status(400).json({ msg: 'Invalid flag' });
      return;
    }

    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: user.id });
    if (!instance) {
      res.status(404).json({ msg: 'Instance not found' });
      return;
    }

    // Check if the machine is part of an active contest
    const activeContest = await Contest.findOne({
      machines: instance.machineType,
      startTime: { $lte: new Date() },
      endTime: { $gte: new Date() },
    });

    if (activeContest) {
      // User should have participated in the contest for this machine
      const participation = await ContestParticipation.findOne({
        user: user.id,
        contest: activeContest._id,
        machine: instance.machineType,
      });

      if (participation && !participation.participationEndTime) {
        // Calculate EXP based on contest rules
        const currentTime = new Date();
        const timeTaken = (currentTime.getTime() - participation.participationStartTime.getTime()) / 1000; // in seconds
        const hintsUsed = participation.hintsUsed;

        //EXP calculation
        let expEarned = activeContest.contestExp;
        expEarned -= Math.floor(timeTaken / 60); // Reduce 1 EXP per minute taken
        expEarned -= hintsUsed * 5; // Reduce 5 EXP per hint used

        if (expEarned < 0) expEarned = 0;

        participation.participationEndTime = currentTime;
        participation.expEarned = expEarned;

        await participation.save();

        // Update user's EXP and level
        user.exp += expEarned;
        await (user as any).updateLevel();
        await user.save();
      }
    } else {
      // Normal submission: Add machine's EXP to user
      user.exp += (await Machine.findById(instance.machineType))?.exp || 0;
      await (user as any).updateLevel();
      await user.save();
    }

    // Terminate the instance
    const terminateParams = {
      InstanceIds: [instanceId],
    };
    const terminateCommand = new TerminateInstancesCommand(terminateParams);
    await ec2Client.send(terminateCommand);

    // Update instance status in DB
    instance.status = 'terminated';
    await instance.save();

    // Optionally, delete the instance record from DB
    await Instance.deleteOne({ instanceId });

    res.json({ msg: 'Flag accepted. Instance terminated.' });
  } catch (error) {
    console.error('Error submitting flag:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get details of all instances.
 */
export const getAllInstances = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json("User not registered / token malfunctioned");
    }

    const instances = await Instance.find({ user: user.id });
    res.json(instances);
  } catch (error) {
    console.error('Error fetching all instances:', error);  
    res.status(500).send('Server error');
  }
};

/**
 * Get details of a specific instance.
 */
export const getInstanceDetails = async (req: Request, res: Response) => {
  try {
    const { instanceId } = req.params;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json("User not registered / token malfunctioned");
    }
    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: user.id });
    if (!instance) {
      res.status(404).json({ msg: 'Instance not found' });
      return;
    }

    res.json(instance);
  } catch (error) {
    console.error('Error fetching instance details:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Delete a specific instance.
 */
export const deleteInstance = async (req: Request, res: Response) => {
  try {
    const { instanceId } = req.params;
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json("User not registered / token malfunctioned");
    }

    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: user.id });
    if (!instance) {
      res.status(404).json({ msg: 'Instance not found' });
      return;
    }

    // Terminate the instance
    const terminateParams = {
      InstanceIds: [instanceId],
    };
    const terminateCommand = new TerminateInstancesCommand(terminateParams);
    await ec2Client.send(terminateCommand);

    // Update instance status in DB
    instance.status = 'terminated';
    await instance.save();

    // Optionally, delete the instance record from DB
    await Instance.deleteOne({ instanceId });

    res.json({ msg: 'Instance terminated and deleted successfully.' });
  } catch (error) {
    console.error('Error deleting instance:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Validate the submitted flag.
 */
const validateFlag = async (flag: string, userId: string, instanceId: string): Promise<boolean> => {
  try {
    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: userId });
    if (!instance) {
      return false;
    }

    // Find the machine associated with the instance
    const machine = await Machine.findOne({ name: instance.machineType });
    if (!machine) {
      return false;
    }

    // Compare the submitted flag with the stored hashed flag
    const isMatch = await bcrypt.compare(flag, machine.flag);
    return isMatch;
  } catch (error) {
    console.error('Error validating flag:', error);
    return false;
  }
};

