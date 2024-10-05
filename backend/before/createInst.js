const express = require('express');
const router = express.Router(); // express.Router()를 사용하여 새로운 라우터 객체 생성
const { InstancesClient, ZoneOperationsClient } = require('@google-cloud/compute');

// 이 부분은 router 객체에 대한 미들웨어 함수로서 작성되어야 합니다.
router.post('/createInstance', async (req, res) => {
  const { projectId, zone, instanceName } = req.body;

  try {
    const compute = new InstancesClient();
    console.log(`Creating the ${instanceName} instance in ${zone}...`);

    const [response] = await compute.insert({
      instanceResource: {
        name: instanceName,
        disks: [
          {
            initializeParams: {
              diskSizeGb: '10',
              sourceImage: 'projects/debian-cloud/global/images/family/debian-10',
            },
            autoDelete: true,
            boot: true,
            type: 'PERSISTENT',
          },
        ],
        machineType: `zones/${zone}/machineTypes/n1-standard-1`,
        networkInterfaces: [
          {
            name: 'global/networks/default',
          },
        ],
      },
      project: projectId,
      zone,
    });

    let operation = response.latestResponse;
    const operationsClient = new ZoneOperationsClient();

    while (operation.status !== 'DONE') {
      [operation] = await operationsClient.wait({
        operation: operation.name,
        project: projectId,
        zone: operation.zone.split('/').pop(),
      });
    }

    console.log('Instance created.');
    res.status(200).json({ message: 'Instance created successfully' });
  } catch (error) {
    console.error('Error creating instance:', error);
    res.status(500).json({ message: 'Error creating instance' });
  }
});

// 이 부분을 추가하여 다른 파일에서 router 객체를 사용할 수 있도록 해줍니다.
module.exports = router;
