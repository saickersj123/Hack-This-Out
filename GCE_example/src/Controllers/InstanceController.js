const compute = require('@google-cloud/compute');
const projectId = 'hto2024';
const zone = 'us-west1-c'

module.exports = {
    // Function to create a new instance
    async createInstance(req, res) {
      const instanceName = req.body.instanceName;
      const instancesClient = new compute.InstancesClient();
      const uniqueInstanceName = `${instanceName}-${Date.now()}`;
  
      const instanceConfig = {
        // Add necessary instance configuration here
        // For example:
        name: uniqueInstanceName,
        machineType: `zones/${zone}/machineTypes/n1-small-1`,
        disks: [
          {
            boot: true,
            initializeParams: {
              sourceImage: 'projects/debian-cloud/global/images/family/debian-10'
            }
          }
        ],
        networkInterfaces: [
          {
            network: 'global/networks/default'
          }
        ]
      };
  
      const [response] = await instancesClient.insert({
        project: projectId,
        zone,
        instanceResource: instanceConfig,
      });
  
      let operation = response.latestResponse;
      const operationsClient = new compute.ZoneOperationsClient();
  
      // Wait for the operation to complete.
      while (operation.status !== 'DONE') {
        [operation] = await operationsClient.wait({
          operation: operation.name,
          project: projectId,
          zone: operation.zone.split('/').pop(),
        });
      }
  
      console.log(`Instance ${uniqueInstanceName} created.`);
      res.status(200).send(`Instance ${uniqueInstanceName} created.`);
    },
  // Function to delete an instance
  async deleteInstance(req, res) {
    const instancesClient = new compute.InstancesClient();
    const instanceName = req.body.instanceName; // Get instance name from request body

    const [response] = await instancesClient.delete({
      project: projectId,
      zone,
      instance: instanceName,
    });
    let operation = response.latestResponse;
    const operationsClient = new compute.ZoneOperationsClient();

    // Wait for the operation to complete.
    while (operation.status !== 'DONE') {
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: projectId,
        zone: operation.zone.split('/').pop(),
      });
    }

    console.log(`Instance ${instanceName} deleted.`);
    res.status(200).send(`Instance ${instanceName} deleted.`);
  },
  async startInstance(req,res) {
    const instancesClient = new compute.InstancesClient();
  
    const [response] = await instancesClient.start({
      project: projectId,
      zone,
      instance: instanceName,
    });
    let operation = response.latestResponse;
    const operationsClient = new compute.ZoneOperationsClient();
  
    // Wait for the operation to complete.
    while (operation.status !== 'DONE') {
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: projectId,
        zone: operation.zone.split('/').pop(),
      });
    }
  
    console.log('Instance started.');
  },

  async stopInstance(req,res) {
    const instancesClient = new compute.InstancesClient();
  
    const [response] = await instancesClient.stop({
      project: projectId,
      zone,
      instance: instanceName,
    });
    let operation = response.latestResponse;
    const operationsClient = new compute.ZoneOperationsClient();
  
    // Wait for the operation to complete.
    while (operation.status !== 'DONE') {
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: projectId,
        zone: operation.zone.split('/').pop(),
      });
    }
  
    console.log('Instance stopped.');
  }
}


