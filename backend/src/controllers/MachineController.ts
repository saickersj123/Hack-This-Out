import { Request, Response } from 'express';
import Machine from '../models/Machine';
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
    });

    await newMachine.save();
    res.status(201).json({ msg: 'Machine created successfully.', machine: newMachine });
  } catch (error: any) {
    console.error('Error creating machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get all machines.
 */
export const getAllMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({});
    res.json({ machines });
  } catch (error: any) {
    console.error('Error fetching machines:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get a single machine by ID.
 */
export const getMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineName } = req.params;
    console.log(machineName);
    const machine = await Machine.findOne({ name: machineName });
    if (!machine) {
      res.status(404).json({ msg: 'Machine not found.' });
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
