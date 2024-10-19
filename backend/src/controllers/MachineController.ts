import { Request, Response } from 'express';
import Machine from '../models/Machine';
import User from '../models/User';
import bcrypt from 'bcrypt';
/**
 * Create a new machine.
 */
export const createMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, info, exp, amiId, flag } = req.body;

    // Validate required fields
    if (!name || !category || !amiId || !flag) {
      res.status(400).json({ msg: 'Please provide name, category, amiId, and flag.' });
      return;
    }

    // Check if machine with the same name already exists
    const existingMachine = await Machine.findOne({ name });
    if (existingMachine) {
      res.status(400).json({ msg: 'Machine with this name already exists.' });
      return;
    }

    // Hash the flag before saving
    const saltRounds = 10;
    const hashedFlag = await bcrypt.hash(flag, saltRounds);

    const newMachine = new Machine({
      name,
      category,
      info,
      exp,
      amiId,
      flag: hashedFlag, // Assign the hashed flag
      status: 'pending' // Set status to pending
    });

    await newMachine.save();
    res.status(201).json({ msg: 'Machine registered successfully and is pending confirmation.', machine: newMachine });
  } catch (error: any) {
    console.error('Error creating machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get a single machine by ID.
 */
export const getMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId);

    if (!machine) {
      res.status(404).json({ msg: 'Machine not found.' });
      return;
    }

    // If user is not admin, ensure the machine is confirmed
    const user = await User.findById(res.locals.jwtData.id);
    if (user?.role !== 'admin' && machine.status !== 'confirmed') {
      res.status(403).json({ msg: 'Access denied. Machine is not confirmed yet.' });
      return;
    }

    res.json({ machine });
  } catch (error: any) {
    console.error('Error fetching machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Update a machine by ID.
 */
export const updateMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const { name, category, info, exp, amiId, flag } = req.body;

    // Find the machine
    const machine = await Machine.findById(machineId);
    if (!machine) {
      res.status(404).json({ msg: 'Machine not found.' });
      return;
    }

    // Update fields if provided
    if (name) machine.name = name;
    if (category) machine.category = category;
    if (info) machine.info = info;
    if (exp !== undefined) machine.exp = exp;
    if (amiId) machine.amiId = amiId;
    if (flag) {
      // Hash the new flag before updating
      const saltRounds = 10;
      const hashedFlag = await bcrypt.hash(flag, saltRounds);
      machine.flag = hashedFlag;
    } // Update flag if provided

    await machine.save();
    res.json({ msg: 'Machine updated successfully.', machine });
  } catch (error: any) {
    console.error('Error updating machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Delete a machine by ID.
 */
export const deleteMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;

    const machine = await Machine.findByIdAndDelete(machineId);
    if (!machine) {
      res.status(404).json({ msg: 'Machine not found.' });
      return;
    }
    res.json({ msg: 'Machine deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get all confirmed machines.
 */
export const getAllMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({ status: 'confirmed' });
    res.json({ machines });
  } catch (error: any) {
    console.error('Error fetching machines:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get all pending machines (admin only).
 */
export const getPendingMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({ status: 'pending' });
    res.json({ machines });
  } catch (error: any) {
    console.error('Error fetching pending machines:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Approve a pending machine (admin only).
 */
export const approveMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId);

    if (!machine) {
      res.status(404).json({ msg: 'Machine not found.' });
      return;
    }

    if (machine.status === 'confirmed') {
      res.status(400).json({ msg: 'Machine is already confirmed.' });
      return;
    }

    machine.status = 'confirmed';
    await machine.save();

    res.json({ msg: 'Machine approved successfully.', machine });
  } catch (error: any) {
    console.error('Error approving machine:', error);
    res.status(500).send('Server error');
  }
};