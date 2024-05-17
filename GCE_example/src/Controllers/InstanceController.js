const compute = require('@google-cloud/compute');
const projectId = 'hto2024';
const zone = 'us-central1-b'
const instanceName = 'ftp-target'

module.exports = {
  // [START compute_instances_create]
  // Create a new instance with the values provided above in the specified project and zone.
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


