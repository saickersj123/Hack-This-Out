import Machine from '../models/Machine.js';

/**
 * Create a new machine.
 */
export const createMachine = async (req, res) => {
  try {
    const { name, category, info, exp, amiId } = req.body;

    // Validate required fields
    if (!name || !category || !amiId) {
      return res.status(400).json({ msg: 'Please provide name, category, and amiId.' });
    }

    // Check if machine with the same name already exists
    const existingMachine = await Machine.findOne({ name });
    if (existingMachine) {
      return res.status(400).json({ msg: 'Machine with this name already exists.' });
    }

    const newMachine = new Machine({
      name,
      category,
      info,
      exp,
      amiId,
    });

    await newMachine.save();
    res.status(201).json({ msg: 'Machine created successfully.', machine: newMachine });
  } catch (error) {
    console.error('Error creating machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get all machines.
 */
export const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find({});
    res.json({ machines });
  } catch (error) {
    console.error('Error fetching machines:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Get a single machine by ID.
 */
export const getMachine = async (req, res) => {
  try {
    const { machineName } = req.params;
    console.log(machineName);
    const machine = await Machine.findOne({ name: machineName });
    if (!machine) {
      return res.status(404).json({ msg: 'Machine not found.' });
    }
    res.json({ machine });
  } catch (error) {
    console.error('Error fetching machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Update a machine by ID.
 */
export const updateMachine = async (req, res) => {
  try {
    const { machineId } = req.params;
    const { name, category, info, exp, amiId } = req.body;

    // Find the machine
    const machine = await Machine.findById(machineId);
    if (!machine) {
      return res.status(404).json({ msg: 'Machine not found.' });
    }

    // Update fields if provided
    if (name) machine.name = name;
    if (category) machine.category = category;
    if (info) machine.info = info;
    if (exp) machine.exp = exp;
    if (amiId) machine.amiId = amiId;

    await machine.save();
    res.json({ msg: 'Machine updated successfully.', machine });
  } catch (error) {
    console.error('Error updating machine:', error);
    res.status(500).send('Server error');
  }
};

/**
 * Delete a machine by ID.
 */
export const deleteMachine = async (req, res) => {
  try {
    const { machineId } = req.params;

    // Find and delete the machine
    const machine = await Machine.findByIdAndDelete(machineId);
    if (!machine) {
      return res.status(404).json({ msg: 'Machine not found.' });
    }

    res.json({ msg: 'Machine deleted successfully.' });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).send('Server error');
  }
};
