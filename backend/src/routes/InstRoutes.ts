import express from 'express';
import {verifyToken} from '../middlewares/Token';
import { verifyAdmin } from '../middlewares/Admin';
import validateInstance from '../middlewares/validateInstance';
import { flagSubmissionLimiter } from '../middlewares/rateLimiter';
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
InstRoutes.post('/start-instance/:machineId', verifyToken, startInstance);

// Route for EC2 instance to post VPN IP, differentiated by instanceId
InstRoutes.post('/receive-vpn-ip', receiveVpnIp);

// Route to submit flag for a specific instance
InstRoutes.post('/:instanceId/submit-flag',
  verifyToken,
  validateInstance,
  flagSubmissionLimiter,
  submitFlag
);

// Route to get details of all instances
InstRoutes.get('/', verifyToken, getAllInstances);

// Route to get details of a specific instance
InstRoutes.get('/:instanceId',
  verifyToken,
  validateInstance,
  getInstanceDetails
);

// Route to delete a specific instance(Admin only)
InstRoutes.delete('/:instanceId', 
  verifyToken, 
  verifyAdmin, 
  validateInstance, 
  deleteInstance
);

export default InstRoutes;
