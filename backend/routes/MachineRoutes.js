import express from 'express';
import auth from '../middlewares/auth.js';
import validateMachine from '../middlewares/validateMachine.js';
import {
  createMachine,
  getAllMachines,
  getMachine,
  updateMachine,
  deleteMachine,
} from '../controllers/MachineController.js';

const MachineRoutes = express.Router();

// Route to create a new machine
MachineRoutes.post('/', auth, validateMachine, createMachine);

// Route to get all machines
MachineRoutes.get('/', auth, getAllMachines);

// Route to get a single machine by ID
MachineRoutes.get('/:machineName', auth, getMachine);

// Route to update a machine by ID
MachineRoutes.put('/:machineId', auth, validateMachine, updateMachine);

// Route to delete a machine by ID
MachineRoutes.delete('/:machineId', auth, deleteMachine);

export default MachineRoutes;