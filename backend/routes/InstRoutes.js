import express from 'express';
import auth from '../middleware/auth.js';
import validateInstance from '../middleware/validateInstance.js';
import {
  startInstance,
  receiveVpnIp,
  submitFlag,
  getInstanceDetails,
  deleteInstance,
} from '../controller/InstController.js';

const InstRoutes = express.Router();

// Route to start a new instance with machineId
InstRoutes.post('/start-instance/:machineId', auth, startInstance);

// Route for EC2 instance to post VPN IP, differentiated by instanceId
InstRoutes.post('/:instanceId/receive-vpn-ip', receiveVpnIp);

// Route to submit flag for a specific instance
InstRoutes.post('/:instanceId/submit-flag', auth, validateInstance, submitFlag);

// Route to get details of a specific instance
InstRoutes.get('/:instanceId', auth, validateInstance, getInstanceDetails);

// Route to delete a specific instance
InstRoutes.delete('/:instanceId', auth, validateInstance, deleteInstance);

export default InstRoutes;
