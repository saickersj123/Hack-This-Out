import { EC2Client, RunInstancesCommand, TerminateInstancesCommand, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import Instance from '../models/Instance.js';
import Machine from '../models/Machine.js';
import config from '../config/config.js';

// Configure AWS SDK v3
const ec2Client = new EC2Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

/**
 * Start an EC2 instance based on user's machine selection.
 */
export const startInstance = async (req, res) => {
  try {
    const { machineId } = req.params;
    const userId = req.user.id;
    // Fetch the machine from the database to get the AMI ID
    const machine = await Machine.findById(machineId);
    if (!machine) {
      return res.status(400).json({ msg: 'Invalid machine ID selected' });
    }

    const ImageId = machine.amiId;
    const params = {
      ImageId,
      InstanceType: 't2.micro', // Choose appropriate instance type
      MinCount: 1,
      MaxCount: 1,
      SecurityGroupIds: [config.aws.securityGroupId], // Add your Security Group ID here
      TagSpecifications: [
        {
          ResourceType: 'instance',
          Tags: [{ Key: 'User', Value: userId }],
        },
      ],
    };

    // Create and send RunInstancesCommand
    const runCommand = new RunInstancesCommand(params);
    const data = await ec2Client.send(runCommand);
    
    if (!data.Instances || data.Instances.length === 0) {
      return res.status(500).json({ msg: 'Failed to create instance' });
    }

    const instanceId = data.Instances[0].InstanceId;

    // Save instance info to DB
    const newInstance = new Instance({
      user: userId,
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
 * Receive VPN IP posted by the EC2 instance.
 */
export const receiveVpnIp = async (req, res) => {
  try {
    const { instanceId, vpnIp } = req.body;
    console.log(instanceId, vpnIp);
    // Find the instance
    const instance = await Instance.findOne({ instanceId });
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found' });
    }

    // Update instance with VPN IP and status
    instance.vpnIp = vpnIp;
    instance.status = 'running';
    await instance.save();

    res.json({ msg: 'VPN IP updated successfully' });
  } catch (error) {
    console.error('Error receiving VPN IP:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Handle flag submission, terminate instance, and clean up.
 */
export const submitFlag = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const { flag } = req.body;
    const userId = req.user.id;

    // Validate flag
    const isValidFlag = validateFlag(flag, userId, instanceId);
    if (!isValidFlag) {
      return res.status(400).json({ msg: 'Invalid flag' });
    }

    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: userId });
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found' });
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
export const getAllInstances = async (req, res) => {
  try {
    const userId = req.user.id;
    const instances = await Instance.find({ user: userId });
    res.json(instances);
  } catch (error) {
    console.error('Error fetching all instances:', error);  
    res.status(500).send('Server error');
  }
};
/**
 * Get details of a specific instance.
 */
export const getInstanceDetails = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const userId = req.user.id;

    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: userId });
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found' });
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
export const deleteInstance = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const userId = req.user.id;

    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: userId });
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found' });
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
 * Get user ID by instance ID.
 */
export const getUserIdByInstanceId = async (req, res) => {
  try {
    const { instanceId } = req.params;

    // Find the instance by instanceId and populate the user field
    const instance = await Instance.findOne({ instanceId }).populate('user', '_id');
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found' });
    }

    res.json({ userId: instance.user._id });
  } catch (error) {
    console.error('Error fetching user ID by instance ID:', error);
    res.status(500).send('Server error');
  }
};



/**
 * Validate the submitted flag.
 * Implement your own logic to validate the flag.
 */
const validateFlag = (flag, userId, instanceId) => {
  // TODO: Implement flag validation logic
  return true; // Placeholder
};


