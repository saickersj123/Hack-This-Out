import cron from 'node-cron';
import { EC2Client, TerminateInstancesCommand } from '@aws-sdk/client-ec2';
import Instance from '../models/Instance';
import config from '../config/config';

// Initialize AWS EC2 Client
const ec2Client = new EC2Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId!,
    secretAccessKey: config.aws.secretAccessKey!,
  },
});

/**
 * Function to terminate and delete instances running over 6 hours.
 */
const cleanupInstances = async () => {
  try {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);

    // Find instances with status 'running' and createdAt older than 6 hours
    const instancesToTerminate = await Instance.find({
      status: 'running',
      createdAt: { $lte: sixHoursAgo },
    });

    if (instancesToTerminate.length === 0) {
      console.log('No instances to terminate at this time.');
      return;
    }

    console.log(`Found ${instancesToTerminate.length} instance(s) to terminate.`);

    for (const instance of instancesToTerminate) {
      try {
        // Terminate the EC2 instance
        const terminateParams = {
          InstanceIds: [instance.instanceId],
        };
        const terminateCommand = new TerminateInstancesCommand(terminateParams);
        await ec2Client.send(terminateCommand);

        console.log(`Terminated EC2 Instance: ${instance.instanceId}`);

        // Optionally, you can check the termination status from 'data'

        // Delete the instance document from the database
        await Instance.deleteOne({ _id: instance._id });
        console.log(`Deleted Instance record from DB: ${instance._id}`);
      } catch (err) {
        console.error(`Error terminating instance ${instance.instanceId}:`, err);
      }
    }
  } catch (error) {
    console.error('Error during instance cleanup:', error);
  }
};

// Schedule the cleanup task to run every hour
cron.schedule('0 * * * *', () => { // Runs at minute 0 of every hour
  console.log('Running scheduled instance cleanup task...');
  cleanupInstances();
});
