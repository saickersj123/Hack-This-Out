import { EC2Client, RunInstancesCommand, TerminateInstancesCommand, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import Instance from '../model/Instance.js';
import Machine from '../model/Machine.js';
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

    // Create EC2 instance parameters
    const userDataScript = `#!/bin/bash
sudo apt-get update
sudo apt-get install -y curl jq tunctl
USER_ID="${userId}"
INSTANCE_ID=$(curl http://169.254.169.254/latest/meta-data/instance-id)
VPN_IP=$(ip addr show tun0 | grep 'inet ' | awk '{print $2}' | cut -d'/' -f1)
SERVER_URL="https://api.hackthisout.o-r.kr/api/inst/${INSTANCE_ID}/receive-vpn-ip"
curl -X POST $SERVER_URL \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "${USER_ID}",
    "vpnIp": "${VPN_IP}"
  }'

# Additional configuration for VPN or other services can be added here
`;

    const params = {
      ImageId,
      InstanceType: 't2.micro', // Choose appropriate instance type
      MinCount: 1,
      MaxCount: 1,
      TagSpecifications: [
        {
          ResourceType: 'instance',
          Tags: [{ Key: 'User', Value: userId }],
        },
      ],
      UserData: Buffer.from(userDataScript).toString('base64'),
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
    const { instanceId } = req.params;
    const { userId, vpnIp } = req.body;

    // Find the instance
    const instance = await Instance.findOne({ instanceId, user: userId });
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
 * Validate the submitted flag.
 * Implement your own logic to validate the flag.
 */
const validateFlag = (flag, userId, instanceId) => {
  // TODO: Implement flag validation logic
  return true; // Placeholder
};