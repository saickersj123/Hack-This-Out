import express from 'express';
import {verifyToken} from '../middlewares/Token.js';
import validateMachine from '../middlewares/validateMachine';
import {
  createMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
  useHint,
  MachinesubmitFlag,
  downloadOpenVPNProfile,
} from '../controllers/MachineController.js';
import { flagSubmissionLimiter } from '../middlewares/rateLimiter';

const MachineRoutes = express.Router();

// Route to create a new machine
MachineRoutes.post('/', validateMachine, verifyToken,  createMachine);

// Route to get all machines
MachineRoutes.get('/', getAllMachines);

// Route to get a single machine by ID
MachineRoutes.get('/:machineId', verifyToken, getMachine);

// Route to update a machine by ID
MachineRoutes.put('/:machineId', validateMachine, verifyToken, updateMachine);

// Route to delete a machine by ID
MachineRoutes.delete('/:machineId', verifyToken, deleteMachine);

// Route to use a hint
MachineRoutes.post('/:machineId/use-hint', verifyToken, useHint);

// Route to submit a flag
MachineRoutes.post('/:machineId/submit-flag', verifyToken, flagSubmissionLimiter, MachinesubmitFlag);

// Route to download OpenVPN profile
MachineRoutes.get('/:machineId/download-ovpn', verifyToken, downloadOpenVPNProfile);

export default MachineRoutes;
