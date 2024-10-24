import express from 'express';
import {verifyToken} from '../middlewares/Token.js';
import validateMachine from '../middlewares/validateMachine';
import {
  createMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
  getMachineHints,
  submitFlagMachine,
} from '../controllers/MachineController.js';

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

// Route to get machine hints
MachineRoutes.get('/:machineId/hints', verifyToken, getMachineHints);

// Route to submit flag for a machine
MachineRoutes.post('/:machineId/submit-flag', verifyToken, submitFlagMachine);

export default MachineRoutes;