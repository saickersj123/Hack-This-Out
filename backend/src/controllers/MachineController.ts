import { Request, Response } from 'express';
import Machine from '../models/Machine';
import User from '../models/User';
import UserProgress from '../models/UserProgress';
import bcrypt from 'bcrypt';
/**
 * Create a new machine.
 */
export const createMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, info, exp, amiId, hints, hintCosts, flag } = req.body;

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
    const hintsArray = hints.filter((hint: string) => hint.trim() !== '');

    const newMachine = new Machine({
      name,
      category,
      info,
      exp,
      amiId,
      hints: hintsArray.map((hint: string, index: number) => ({ content: hint, cost: hintCosts[index] })),
      flag: hashedFlag, // Assign the hashed flag
      isActive: false
    });

    await newMachine.save();
    res.status(201).json({ msg: 'Machine created successfully.', machine: newMachine });
  } catch (error: any) {
    console.error('Error creating machine:', error);
    res.status(500).send('Failed to create machine.');
  }
};

/**
 * Get all machines.
 */
export const getAllMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find();
    res.json({ machines });
  } catch (error: any) {
    console.error('Error fetching machines:', error);
    res.status(500).send('Failed to fetch machines.');
  }
};

/**
 * Get a single machine details by ID(Admin only).
 */
export const getMachineDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId);
    if (!machine) {
      res.status(404).json({ msg: 'Machine not found.' });
      return;
    }
    res.json({ machine });
  } catch (error: any) {
    console.error('Error fetching machine:', error);
    res.status(500).send('Failed to fetch machine.');
  }
};

/**
 * Get active machine details.
 */
export const getActiveMachineDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId, { isActive: true });
    res.json({ machine });
  } catch (error: any) {
    console.error('Error fetching active machines:', error);
    res.status(500).send('Failed to fetch active machines.');
  }
};

/**
 * Get inactive machine details(Admin only).
 */
export const getInactiveMachineDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId, { isActive: false });
    res.json({ machine });
  } catch (error: any) {
    console.error('Error fetching inactive machines:', error);
    res.status(500).send('Failed to fetch inactive machines.');
  }
};

/**
 * Get active machines.
 */
export const getActiveMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({ isActive: true }).select('-hints');
    if (machines.length === 0) {
      res.status(404).json({ msg: 'No active machines found.' });
      return;
    };
    res.json({ machines });
  } catch (error: any) {
    console.error('Error fetching active machines:', error);
    res.status(500).send('Failed to fetch active machines.');
  }
};

/**
 * Get inactive machines(Admin only).
 */
export const getInactiveMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({ isActive: false });
    res.json({ machines });
  } catch (error: any) {
    console.error('Error fetching inactive machines:', error);
    res.status(500).send('Failed to fetch inactive machines.');
  }
};

/**
 * Activate machine(Admin only).
 */
export const activateMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    await Machine.findByIdAndUpdate(machineId, { isActive: true });
    res.json({ msg: 'Machine status updated successfully.' });
  } catch (error: any) {
    console.error('Error updating machine status:', error);
    res.status(500).send('Failed to activate machine.');
  }
};

/**
 * Deactivate machine(Admin only).
 */
export const deactivateMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    await Machine.findByIdAndUpdate(machineId, { isActive: false });
    res.json({ msg: 'Machine status updated successfully.' });
  } catch (error: any) {
    console.error('Error deactivating machine:', error);
    res.status(500).send('Failed to deactivate machine.');
  }
};

/**
 * Get machine status.
 */
export const getMachineStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const machine = await Machine.findById(machineId);
    res.json({ machine: machine.isActive });
  } catch (error: any) {
    console.error('Error fetching machine status:', error);
    res.status(500).send('Failed to fetch machine status.');
  }
};

/**
 * Update a machine details by ID.(Admin only)
 */
export const updateMachineDetails = async (req: Request, res: Response): Promise<void> => {
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
    res.status(500).send('Failed to update machine.');
  }
};

/**
 * Delete a machine by ID.(Admin only)
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
    res.status(500).send('Failed to delete machine.');
  }
};
/**
 * Get machine hints.
 */
export const getMachineHints = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const userId = res.locals.jwtData.id;

    // Find or create user progress
    let progress = await UserProgress.findOne({ 
        user: userId, 
        machine: machineId,
        expEarned: 0
    });

    if (!progress) {
        progress = new UserProgress({
            user: userId,
            machine: machineId,
        });
    }
    // Get the hint content
    const machine = await Machine.findById(machineId);
    if (!machine || !machine.hints || machine.hints.length === 0) {
        res.status(404).json({ msg: 'No hints available for this machine.' });
        return;
    }
    // Limit hintsUsed to the number of hints available
    if (progress.hintsUsed > machine.hints.length-1) {
      res.status(400).json({ msg: 'No more hints available.' });
      return;
  } else {
      // Increment hints used
      progress.hintsUsed += 1;
      await progress.save();
  }
    // Get the next hint based on hintsUsed count
    const hintIndex = Math.min(progress.hintsUsed - 1, machine.hints.length - 1);
    const hint = machine.hints[hintIndex];

    res.status(200).json({ 
        msg: 'Hint revealed.',
        hint: hint.content,
        hintsUsed: progress.hintsUsed,
        remainingHints: Math.max(0, machine.hints.length - progress.hintsUsed)
    });
} catch (error: any) {
    console.error('Error using hint:', error);
    res.status(500).send('Failed to get hint.');
}
};

export const submitFlagMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const { flag } = req.body;
        const userId = res.locals.jwtData.id;
        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ msg: 'Machine not found.' });
            return;
        }
        
        // Verify flag
        const isMatch = await bcrypt.compare(flag, machine.flag);
        if (!isMatch) {
            res.status(400).json({ msg: 'Incorrect flag.' });
            return;
        }
  
        // Calculate EXP based on hints used
        const progress = await UserProgress.findOne({ user: userId, machine: machineId });
        const hintsUsed = progress ? progress.hintsUsed : 0;
        let expEarned = machine.exp;
        expEarned -= hintsUsed * 5; // 5 EXP penalty per hint
  
        if (expEarned < 0) expEarned = 0;
  
        // Update user progress and EXP
        await UserProgress.findOneAndUpdate(
            { user: userId, machine: machineId, completedAt: null },
            { 
                completed: true,
                completedAt: new Date(),
                expEarned: expEarned
            },
            { upsert: true }
        );
  
        const user = await User.findById(userId);
        if (user) {
            user.exp += expEarned;
            await (user as any).updateLevel();
            await user.save();
        }
        machine.playerCount += 1;
        await machine.save();
  
        res.status(200).json({ 
            msg: 'Flag accepted.',
            expEarned,
            totalExp: user?.exp
        });
    } catch (error) {
        console.error('Error submitting flag:', error);
        res.status(500).send('Failed to submit flag for machine.');
    }
};

/**
 * Post a machine review.
 */
export const postMachineReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const { rating, review } = req.body;
        const userId = res.locals.jwtData.id;

        if (!rating || !review) {
            res.status(400).json({ msg: 'Rating and review are required.' });
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ msg: 'User not found.' });
            return;
        }
        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ msg: 'Machine not found.' });
            return;
        }
        //Only one review per user
        if (machine.reviews.some((r) => r.reviewerId.toString() === userId)) {
            res.status(400).json({ msg: 'You have already reviewed this machine.' });
            return;
        }
        machine.reviews.push({
            reviewerId: userId,
            reviewerName: user.name,
            content: review,
            rating,
        });
        await machine.save();
        res.status(200).json({ msg: 'Review posted successfully.' });
    } catch (error) {
        console.error('Error posting machine review:', error);
        res.status(500).send('Failed to post machine review.');
    }
};

/**
 * Get machine reviews.
 */
export const getMachineReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const machine = await Machine.findById(machineId);
        res.json({ reviews: machine?.reviews });
    } catch (error) {
        console.error('Error fetching machine reviews:', error);
        res.status(500).send('Failed to fetch machine reviews.');
    }
};

/**
 * Get machine review.
 */
export const getMachineReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId, reviewId } = req.params;
        const machine = await Machine.findById(machineId);
        const review = machine?.reviews.find((r) => r._id.toString() === reviewId);
        res.json({ review });
    } catch (error) {
        console.error('Error fetching machine review:', error);
        res.status(500).send('Failed to fetch machine review.');
    }
};

/**
 * Delete a machine review.
 */
export const deleteMachineReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId, reviewId } = req.params;
        const machine = await Machine.findById(machineId);
        const review = machine?.reviews.find((r) => r._id.toString() === reviewId);
        if (!machine || !review) {
            res.status(404).json({ msg: 'Machine or review not found.' });
            return;
        }
        await Machine.findByIdAndUpdate(machineId, {
            $pull: { reviews: { _id: reviewId } }
        });
        res.json({ msg: 'Review deleted successfully.' });
    } catch (error) {
        console.error('Error deleting machine review:', error);
        res.status(500).send('Failed to delete machine review.');
    }
};

/**
 * Update machine review.
 */
export const updateMachineReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId, reviewId } = req.params;
        const { newRating, newReview } = req.body;
        const machine = await Machine.findById(machineId);
        const user = await User.findById(res.locals.jwtData.id);
        const review = machine?.reviews.find((r) => r._id.toString() === reviewId);
        if (!user) {
            res.status(404).json({ msg: 'User not found.' });
            return;
        }
        if (!machine) {
            res.status(404).json({ msg: 'Machine not found.' });
            return;
        }
        if (!review) {
            res.status(404).json({ msg: 'Review not found.' });
            return;
        }
        if (newReview) review.content = newReview;
        if (newRating) review.rating = newRating; 
        await machine.save();
        res.json({ msg: 'Review updated successfully.' });
    } catch (error) {
        console.error('Error updating machine review:', error);
        res.status(500).send('Failed to update machine review.');
    }
};

/**
 * Get machine rating.
 */
export const getMachineRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const machine = await Machine.findById(machineId);
        res.json({ rating: machine?.rating });
    } catch (error) {
        console.error('Error fetching machine rating:', error);
        res.status(500).send('Failed to fetch machine rating.');
    }
};

/**
 * Delete machine review forcefully(Admin only).
 */
export const deleteMachineReviewForce = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const { reviewId } = req.body;
        const machine = await Machine.findById(machineId);
        const review = machine?.reviews.find((r) => r._id.toString() === reviewId);
        if (!machine || !review) {
            res.status(404).json({ msg: 'Machine or review not found.' });
            return;
        }
        await Machine.findByIdAndUpdate(machineId, {
            $pull: { reviews: { _id: reviewId } }
        });
        res.json({ msg: 'Review deleted forcefully.' });
    } catch (error) {
        console.error('Error deleting machine review forcefully:', error);
        res.status(500).send('Failed to delete machine review forcefully.');
    }
};