import express from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/Token.js';
import validateMachine from '../middlewares/validateMachine';
import {
  createMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
  getPendingMachines,
  approveMachine,
} from '../controllers/MachineController.js';

const MachineRoutes = express.Router();

// Route to create a new machine
MachineRoutes.post('/', validateMachine, verifyToken,  createMachine);

// Route to get all machines
MachineRoutes.get('/', getAllMachines);

// Route to get a single machine by ID
MachineRoutes.get('/:machineId', verifyToken, getMachine);

// Route to update a machine by ID (only admins can update status)
MachineRoutes.put('/:machineId', validateMachine, verifyToken, verifyAdmin, updateMachine);

// Route to delete a machine by ID
MachineRoutes.delete('/:machineId', verifyToken, verifyAdmin, deleteMachine);

// Route to get all pending machines (admin only)
MachineRoutes.get('/admin/pending', verifyToken, verifyAdmin, getPendingMachines);

// Route to approve a machine (admin only)
MachineRoutes.post('/admin/approve/:machineId', verifyToken, verifyAdmin, approveMachine);

export default MachineRoutes;