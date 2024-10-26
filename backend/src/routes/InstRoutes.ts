import express from 'express';
import {verifyToken} from '../middlewares/Token';
import { verifyAdmin } from '../middlewares/Admin';
import { flagSubmissionLimiter } from '../middlewares/rateLimiter';
import {
  startInstance,
  receiveVpnIp,
  submitFlag,
  getInstanceDetails,
  deleteInstance,
  getInstanceByMachine,
  getAllInstances,
  downloadOpenVPNProfile,
  terminateInstance,
} from '../controllers/InstController.js';

const InstRoutes = express.Router();

// Most specific routes first
InstRoutes.get('/download-ovpn', verifyToken, downloadOpenVPNProfile);
InstRoutes.post('/start-instance/:machineId', verifyToken, startInstance);
InstRoutes.post('/receive-vpn-ip', receiveVpnIp);

// Route to get all instances (should come before parameterized routes)
InstRoutes.get('/', verifyToken, verifyAdmin, getAllInstances);

// Parameterized routes
InstRoutes.post('/:machineId/submit-flag', verifyToken, flagSubmissionLimiter, submitFlag);
InstRoutes.get('/:machineId', verifyToken, getInstanceByMachine);
InstRoutes.get('/:instanceId', verifyToken, getInstanceDetails);
InstRoutes.delete('/:instanceId', verifyToken, verifyAdmin, deleteInstance);
InstRoutes.delete('/:machineId', verifyToken, terminateInstance);

export default InstRoutes;
