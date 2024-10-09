import express from 'express';
import auth from '../middleware/auth.js';
import {
  startInstance,
  receiveVpnIp,
  submitFlag,
} from '../controller/InstController.js';

const MachineRoutes = express.Router();

// Route to start an instance
MachineRoutes.post('/start-instance', auth, startInstance);

// Route for EC2 instance to post VPN IP
MachineRoutes.post('/receive-vpn-ip', receiveVpnIp);

// Route to submit flag
MachineRoutes.post('/submit-flag', auth, submitFlag);

export default MachineRoutes;