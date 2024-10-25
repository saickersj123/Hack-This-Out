import express from 'express';
import {verifyToken} from '../middlewares/Token';
import { verifyAdmin } from '../middlewares/Admin';
import validateMachine from '../middlewares/validateMachine';
import { flagSubmissionLimiter } from '../middlewares/rateLimiter';
import {
  createMachine,
  getAllMachines,
  getMachineDetails,
  updateMachineDetails,
  deleteMachine,
  getMachineHints,
  submitFlagMachine,
  getInactiveMachines,
  getActiveMachines,
  getMachineStatus,
  activateMachine,
  deactivateMachine,
  getActiveMachineDetails,
  getInactiveMachineDetails,
} from '../controllers/MachineController.js';

const MachineRoutes = express.Router();

// Public Routes
// Route to create a new machine
MachineRoutes.post('/', validateMachine, verifyToken, createMachine);

// Route to get active machine details by ID
MachineRoutes.get('/:machineId', verifyToken, getActiveMachineDetails);

// Route to get machine hints
MachineRoutes.get('/:machineId/hints', verifyToken, getMachineHints);

// Route to submit flag for a machine
MachineRoutes.post('/:machineId/submit-flag', verifyToken, flagSubmissionLimiter, submitFlagMachine);

// Route to get active machines
MachineRoutes.get('/active', verifyToken, getActiveMachines);

// Admin Routes
// Route to get all machines(Admin only)
MachineRoutes.get('/', verifyToken, verifyAdmin, getAllMachines);

// Route to get inactive machine details by ID(Admin only)
MachineRoutes.get('/:machineId', verifyToken, verifyAdmin, getInactiveMachineDetails);

// Route to get a single machine details by ID(Admin only)
MachineRoutes.get('/:machineId', verifyToken, verifyAdmin, getMachineDetails);

// Route to update a machine details by ID(Admin only)
MachineRoutes.put('/:machineId', validateMachine, verifyToken, verifyAdmin, updateMachineDetails);

// Route to delete a machine by ID(Admin only)
MachineRoutes.delete('/:machineId', verifyToken, verifyAdmin, deleteMachine);

// Route to get inactive machines(Admin only)
MachineRoutes.get('/inactive', verifyToken, verifyAdmin, getInactiveMachines);

// Route to activate machine(Admin only)
MachineRoutes.post('/:machineId/active', verifyToken, verifyAdmin, activateMachine);

// Route to deactivate machine(Admin only)
MachineRoutes.post('/:machineId/deactive', verifyToken, verifyAdmin, deactivateMachine);

// Route to get machine status(Admin only)
MachineRoutes.get('/:machineId/status', verifyToken, verifyAdmin, getMachineStatus);

export default MachineRoutes;