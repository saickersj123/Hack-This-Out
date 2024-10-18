import express from 'express';
import auth from '../middlewares/auth.js';
import validateInstance from '../middlewares/validateInstance.js';
import {
  startInstance,
  receiveVpnIp,
  submitFlag,
  getInstanceDetails,
  deleteInstance,
  getAllInstances,
} from '../controllers/InstController.js';

const InstRoutes = express.Router();

// Route to start a new instance with machineId
InstRoutes.post('/start-instance/:machineId', auth, startInstance);

// Route for EC2 instance to post VPN IP, differentiated by instanceId
InstRoutes.post('/receive-vpn-ip', receiveVpnIp);

// Route to submit flag for a specific instance
InstRoutes.post('/:instanceId/submit-flag', auth, validateInstance, submitFlag);

// Route to get details of all instances
InstRoutes.get('/', auth, getAllInstances);

// Route to get details of a specific instance
InstRoutes.get('/:instanceId', auth, validateInstance, getInstanceDetails);

// Route to delete a specific instance
InstRoutes.delete('/:instanceId', auth, validateInstance, deleteInstance);

export default InstRoutes;
