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
    const { name, category, description, exp, amiId, hints, hintCosts, flag } = req.body;

    // Validate required fields
    if (!name || !category || !amiId || !flag) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!category) missingFields.push('category');
      if (!amiId) missingFields.push('amiId');
      if (!flag) missingFields.push('flag');
      if (!exp) missingFields.push('exp');
      if (!hints) missingFields.push('hints');
      if (!hintCosts) missingFields.push('hintCosts');
      
      console.error('Missing fields:', missingFields);
      res.status(400).json({ message: "ERROR", msg: `Missing fields: ${missingFields.join(', ')}` });
      return;
    }

    // Check if machine with the same name already exists
    const existingMachine = await Machine.findOne({ name });
    if (existingMachine) {
      res.status(400).json({ message: "ERROR", msg: 'Machine with this name already exists.' });
      return;
    }

    const existingAmiId = await Machine.findOne({ amiId });
    if (existingAmiId) {
      res.status(400).json({ message: "ERROR", msg: 'AMI ID already exists.' });
      return;
    }

    // Hash the flag before saving
    const saltRounds = 10;
    const hashedFlag = await bcrypt.hash(flag, saltRounds);
    const hintsArray = hints && Array.isArray(hints) ? hints.filter((hint: string) => hint.trim() !== '') : [];
    const hintCostsArray = hintCosts && Array.isArray(hintCosts) ? hintCosts : [];

    // Ensure hints and hintCosts arrays are of the same length
    if (hintsArray.length !== hintCostsArray.length) {
      res.status(400).json({ message: "ERROR", msg: 'Number of hints and hint costs must match.' });
      return;
    }

    const newMachine = new Machine({
      name,
      category,
      description,
      exp: exp || 50,
      amiId,
      hints: hintsArray.map((hint: string, index: number) => ({ content: hint, cost: hintCostsArray[index] })),
      flag: hashedFlag, // Assign the hashed flag
      isActive: false
    });

    await newMachine.save();
    res.status(201).json({ 
      message: "OK", 
      msg: 'Machine created successfully.', 
      machine: newMachine 
    });
  } catch (error: any) {
    console.error('Error creating machine:', error);
    res.status(500).send('Failed to create machine.');
  }
};

/**
 * Get all machines.(Admin only)
 */
export const getAllMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find();
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machines fetched successfully.', 
      machines: machines 
    });
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
      res.status(404).json({ message: "ERROR", msg: 'Machine not found.' });
      return;
    }
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine fetched successfully.', 
      machine: machine 
    });
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
    const machine = await Machine.findOne({ _id: machineId, isActive: true }).select('-hints -flag -__v -reviews');
    res.status(200).json({ 
      message: "OK", 
      msg: 'Active machine fetched successfully.', 
      machine: machine 
    });
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
    res.status(200).json({ 
      message: "OK", 
      msg: 'Inactive machine fetched successfully.', 
      machine: machine 
    });
  } catch (error: any) {
    console.error('Error fetching inactive machines:', error);
    res.status(500).send('Failed to fetch inactive machines.');
  }
};

/**
 * Get machine details by ID(Admin only).
 */
export const getMachineDetailsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.body;
    const machine = await Machine.findById(machineId);
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine fetched successfully.', 
      machine: machine 
    });
  } catch (error: any) {
    console.error('Error fetching machine:', error);
    res.status(500).send('Failed to fetch machine.');
  }
};

/**
 * Get active machine details by ID.
 */
export const getActiveMachineDetailsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.body;
    const machine = await Machine.find({ _id: machineId, isActive: true }).select('-hints -flag -__v -reviews');
    res.status(200).json({ 
      message: "OK", 
      msg: 'Active machine fetched successfully.', 
      machine: machine 
    });
  } catch (error: any) {
    console.error('Error fetching machine:', error);
    res.status(500).send('Failed to fetch machine.');
  }
};

/**
 * Get active machines.
 */
export const getActiveMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({ isActive: true }).sort({ playerCount: -1 })
    .select('-hints -flag -__v -reviews -createdAt -updatedAt -isActive -description -exp -amiId');
    if (machines.length === 0) {
      res.status(404).json({ 
        message: "ERROR", 
        msg: 'No active machines found.' 
      });
      return;
    };
    // Update average rating for each machine
    const machineReviews = await Machine.find({ isActive: true }).select('reviews');
    await machineReviews.forEach(async (machine) => {
      await (machine as any).updateRating();
    });
    res.status(200).json({ 
      message: "OK", 
      msg: 'Active machines fetched successfully.', 
      machines: machines 
    });
  } catch (error: any) {
    console.error('Error fetching active machines:', error);
    res.status(500).send('Failed to fetch active machines.');
  }
};

/**
 * Get inactive machine details by ID(Admin only).
 */
export const getInactiveMachineDetailsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.body;
    const machine = await Machine.find({ _id: machineId, isActive: false });
    res.status(200).json({ 
      message: "OK", 
      msg: 'Inactive machine fetched successfully.', 
      machine: machine 
    });
  } catch (error: any) {
    console.error('Error fetching inactive machines:', error);
    res.status(500).send('Failed to fetch inactive machines.');
  }
};

/**
 * Get inactive machines(Admin only).
 */
export const getInactiveMachines = async (req: Request, res: Response): Promise<void> => {
  try {
    const machines = await Machine.find({ isActive: false });
    res.status(200).json({ 
      message: "OK", 
      msg: 'Inactive machines fetched successfully.', 
      machines: machines 
    });
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
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine status updated successfully.' 
    });
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
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine status updated successfully.' 
    });
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
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine status fetched successfully.', 
      isActive: machine?.isActive 
    });
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
    const { name, category, description, exp, amiId, flag, hints, hintCosts } = req.body;

    // Find the machine
    const machine = await Machine.findById(machineId);
    if (!machine) {
      res.status(404).json({ 
        message: "ERROR", 
        msg: 'Machine not found.' 
      });
      return;
    }

    // Update fields if provided
    if (name) machine.name = name;
    if (category) machine.category = category;
    if (description) machine.description = description;
    if (exp !== undefined) machine.exp = exp;
    if (amiId) machine.amiId = amiId;
    if (flag) {
      // Hash the new flag before updating
      const saltRounds = 10;
      const hashedFlag = await bcrypt.hash(flag, saltRounds);
      machine.flag = hashedFlag;
    } // Update flag if provided
    if (hints) machine.hints = hints.map((hint: string, index: number) => ({ content: hint, cost: hintCosts[index] }));

    await machine.save();
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine updated successfully.', 
      machine: machine 
    });
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
    res.status(200).json({ 
      message: "OK", 
      msg: 'Machine deleted successfully.' 
    });
  } catch (error: any) {
    console.error('Error deleting machine:', error);
    res.status(500).send('Failed to delete machine.');
  }
};

// Get user progress
export const getUserProgress = async (req: Request, res: Response): Promise<void> => {
	try {
		const { machineId } = req.params;
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ message: "ERROR", cause: "User not found." });
			return;
		}
		const machine = await Machine.findById(machineId);
		if (!machine) {
			res.status(404).json({ message: "ERROR", cause: "Machine not found." });
			return;
		}
		let userProgress = await UserProgress.findOne({ user: user._id, machine: machineId, completed: false });
		if (!userProgress) {
			userProgress = new UserProgress({
				user: user._id,
				machine: machineId,
				remainingHints: machine.hints.length,
			});
			await userProgress.save();
		}
		res.json({ message: "OK", userProgress: userProgress });
	} catch (error: any) {
		console.error('Error getting user progress:', error);
		res.status(500).send('Server error');
	}
};

/**
 * Start playing a machine.
 */
export const startPlayingMachine = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const userId = res.locals.jwtData.id;
    if (!userId) {
      res.status(400).json({ message: "ERROR", cause: "User not found." });
      return;
    }
    const machine = await Machine.findById(machineId);
    if (!machine) {
      res.status(404).json({ message: "ERROR", cause: "Machine not found." });
      return;
    }
    const existingProgress = await UserProgress.findOne({ user: userId, machine: machineId, completed: false });
    if (!existingProgress) {
      const newProgress = new UserProgress({
        user: userId,
        machine: machineId,
        remainingHints: machine.hints.length,
      });
      await newProgress.save();
    }

    res.status(200).json({ 
      message: "OK", 
      msg: 'Started playing machine.', 
    });
  } catch (error: any) {
    console.error('Error starting playing machine:', error);
    res.status(500).send('Failed to start playing machine.');
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
    const progress = await UserProgress.findOne({ 
      user: userId, 
      machine: machineId,
      completed: false
    });

    const hintsUsed = progress ? progress.hintsUsed : 0;

    const machine = await Machine.findById(machineId);
    if (!machine || !machine.hints || machine.hints.length === 0) {
      res.status(404).json({ msg: 'No hints available for this machine.' });
      return;
    }

    if (hintsUsed >= machine.hints.length) {
      res.status(400).json({ msg: 'No more hints available.' });
      return;
    }

    // Get the next hint
    const hintIndex = hintsUsed;
    const hint = machine.hints[hintIndex];

    // Update user progress
    if (progress) {
      progress.hintsUsed += 1;
      progress.usedHints.push(hint.content); // Store the used hint
      await progress.save();
    } else {
      res.status(404).json({ msg: 'User progress not found.' });
      return;
    }

    res.status(200).json({
      message: "OK",
      msg: 'Hint revealed.',
      hint: hint.content,
      hintsUsed: hintsUsed + 1,
      remainingHints: Math.max(0, machine.hints.length - (hintsUsed + 1)),
      usedHints: progress ? progress.usedHints : [hint.content], // Include used hints in response
    });
  } catch (error: any) {
    console.error('Error using hint:', error);
    res.status(500).send('Failed to get hint.');
  }
};

/**
 * Fetch all used hints for a machine and user.
 */
export const getUsedHints = async (req: Request, res: Response): Promise<void> => {
  try {
    const { machineId } = req.params;
    const userId = res.locals.jwtData.id;
    if (!userId) {
      res.status(400).json({ 
        message: "ERROR", 
        msg: 'User not found.' 
      });
      return;
    }

    const progress = await UserProgress.findOne(
      { user: userId, machine: machineId, completed: false, hintsUsed: { $gt: 0 } }
    );
    if (!progress) {
      res.status(200).json({
        message: "OK",
        msg: 'No hints used yet.',
        usedHints: [],
        hintsUsed: 0,
        remainingHints: (await Machine.findById(machineId))?.hints.length || 0,
      });
      return;
    }

    const machine = await Machine.findById(machineId);
    const totalHints = machine?.hints.length || 0;

    res.status(200).json({
      message: "OK",
      msg: 'Used hints fetched successfully.',
      usedHints: progress.usedHints,
      hintsUsed: progress.hintsUsed,
      remainingHints: Math.max(0, totalHints - progress.hintsUsed),
    });
  } catch (error: any) {
    console.error('Error fetching used hints:', error);
    res.status(500).send('Failed to fetch used hints.');
  }
};


/**
 * Submit a flag for a machine.
 */
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
  
        // Retrieve user progress
        const progress = await UserProgress.findOne({ user: userId, machine: machineId, completed: false });
        if (!progress) {
            res.status(400).json({ msg: 'Progress not found for this machine.' });
            return;
        }

        const hintsUsed = progress.hintsUsed || 0;
        // Ensure hintsUsed does not exceed the number of available hints
        const validHintsUsed = Math.min(hintsUsed, machine.hints.length);

        // Calculate total hint cost by summing the costs of the first `validHintsUsed` hints
        const totalHintCost = machine.hints
            .slice(0, validHintsUsed)
            .reduce((sum, hint) => sum + hint.cost, 0);

        let expEarned = machine.exp - (totalHintCost*10);

        expEarned = Math.max(expEarned, 0); // Ensure EXP is not negative

        // Calculate time spent in milliseconds using UTC
        const endTime = new Date(); // Current time in UTC
        const startTime = new Date(progress.createdAt); // Ensure startTime is a Date object

        // Validate startTime
        if (isNaN(startTime.getTime())) {
            res.status(500).json({ msg: 'Invalid start time.' });
            return;
        }

        const durationMillis = endTime.getTime() - startTime.getTime();
        const timeSpentDate = new Date(durationMillis);

        // Update user progress
        progress.completed = true;
        progress.completedAt = endTime;
        progress.expEarned = expEarned;
        progress.timeSpent = timeSpentDate;
        await progress.save();

        // Update user EXP and level
        const user = await User.findById(userId);
        if (user) {
            user.exp += expEarned;
            await (user as any).updateLevel();
            await user.save();
        }

        // Increment machine's player count
        machine.playerCount += 1;
        await machine.save();
  
        res.status(200).json({ 
            message: "OK",
            msg: 'Flag accepted.',
            expEarned: expEarned,
            totalExp: user?.exp || 0
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
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Rating and review are required.' 
            });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'User not found.' 
            });
            return;
        }

        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine not found.' 
            });
            return;
        }

        // Only one review per user
        if (machine.reviews.some((r) => r.reviewerId.toString() === userId)) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'You have already reviewed this machine.' 
            });
            return;
        }

        machine.reviews.push({
            reviewerId: userId,
            reviewerName: user.username,
            content: review,
            rating,
        });

        await machine.save();

        // Recalculate and update the machine's average rating
        await (machine as any).updateRating();

        res.status(200).json({ 
            message: "OK", 
            msg: 'Review posted successfully.' 
        });
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
        res.status(200).json({ 
            message: "OK", 
            msg: 'Machine reviews fetched successfully.', 
            reviews: machine?.reviews 
        });
    } catch (error) {
        console.error('Error fetching machine reviews:', error);
        res.status(500).send('Failed to fetch machine reviews.');
    }
};

/**
 * Get machine review count.
 */
export const getMachineReviewCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const machine = await Machine.findById(machineId);
        res.status(200).json({ 
            message: "OK", 
            msg: 'Machine review count fetched successfully.', 
            reviewCount: machine?.reviews.length 
        });
    } catch (error) {
        console.error('Error fetching machine review count:', error);
        res.status(500).send('Failed to fetch machine review count.');
    }
};

/**
 * Get machine reviews by user.
 */
export const getMachineReviewsbyUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const machineReviews = await Machine.find({ reviews: { $elemMatch: { reviewerId: userId } } });
        res.status(200).json({ 
            message: "OK", 
            msg: 'Machine reviews fetched successfully.', 
            reviews: machineReviews 
        });
    } catch (error) {
        console.error('Error fetching machine reviews by user:', error);
        res.status(500).send('Failed to fetch machine reviews by user.');
    }
};

/**
 * Get machine review.
 */
export const getMachineReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId, reviewId } = req.params;
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'User not found.' 
            });
            return;
        }
        const machine = await Machine.findById(machineId);
        const review = machine?.reviews.find((r) => r._id.toString() === reviewId);
        res.status(200).json({ 
            message: "OK", 
            msg: 'Machine review fetched successfully.', 
            review: review,
        });
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
        const userId = res.locals.jwtData.id;

        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine not found.' 
            });
            return;
        }

        const review = machine.reviews.id(reviewId);
        if (!review) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Review not found.' 
            });
            return;
        }

        // Ensure the user deleting the review is the original reviewer or an admin
        if (review.reviewerId.toString() !== userId && !res.locals.isAdmin) {
            res.status(403).json({ 
                message: "ERROR", 
                msg: 'You are not authorized to delete this review.' 
            });
            return;
        }

        (review as any).remove();
        await machine.save();

        // Recalculate and update the machine's average rating
        await (machine as any).updateRating();

        res.status(200).json({ 
            message: "OK", 
            msg: 'Review deleted successfully.' 
        });
    } catch (error) {
        console.error('Error deleting machine review:', error);
        res.status(500).send('Failed to delete machine review.');
    }
};

/**
 * Delete a machine review.
 */
export const deleteMyMachineReview = async (req: Request, res: Response): Promise<void> => {
  try {
      const { machineId } = req.params;
      const userId = res.locals.jwtData.id;

      const machine = await Machine.findById(machineId);
      if (!machine) {
          res.status(404).json({ 
              message: "ERROR", 
              msg: 'Machine not found.' 
          });
          return;
      }

      const review = machine.reviews.find((r) => r.reviewerId.toString() === userId);
      if (!review) {
          res.status(404).json({ 
              message: "ERROR", 
              msg: 'Review not found.' 
          });
          return;
      }

      // Ensure the user deleting the review is the original reviewer or an admin
      if (review.reviewerId.toString() !== userId && !res.locals.isAdmin) {
          res.status(403).json({ 
              message: "ERROR", 
              msg: 'You are not authorized to delete this review.' 
          });
          return;
      }

      (review as any).remove();
      await machine.save();

      // Recalculate and update the machine's average rating
      await (machine as any).updateRating();

      res.status(200).json({ 
          message: "OK", 
          msg: 'Review deleted successfully.' 
      });
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
        const userId = res.locals.jwtData.id;

        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine not found.' 
            });
            return;
        }

        const review = machine.reviews.id(reviewId);
        if (!review) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Review not found.' 
            });
            return;
        }

        // Ensure the user updating the review is the original reviewer
        if (review.reviewerId.toString() !== userId) {
            res.status(403).json({ 
                message: "ERROR", 
                msg: 'You are not authorized to update this review.' 
            });
            return;
        }

        if (newReview) review.content = newReview;
        if (newRating) review.rating = newRating; 

        await machine.save();

        // Recalculate and update the machine's average rating
        await (machine as any).updateRating();

        res.status(200).json({ 
            message: "OK", 
            msg: 'Review updated successfully.' 
        });
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
        res.status(200).json({ 
            message: "OK", 
            msg: 'Machine rating fetched successfully.', 
            rating: machine?.rating 
        });
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
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine or review not found.' 
            });
            return;
        }
        await Machine.findByIdAndUpdate(machineId, {
            $pull: { reviews: { _id: reviewId } }
        });
        res.status(200).json({ 
            message: "OK", 
            msg: 'Review deleted forcefully.' 
        });
    } catch (error) {
        console.error('Error deleting machine review forcefully:', error);
        res.status(500).send('Failed to delete machine review forcefully.');
    }
};

/**
 * Update machine rating.
 * Admin only.
 */
export const updateMachineRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine not found.' 
            });
            return;
        }
        await (machine as any).updateRating();
        res.status(200).json({ 
            message: "OK", 
            msg: 'Machine rating updated successfully.' 
        });
    } catch (error) {
        console.error('Error updating machine rating:', error);
        res.status(500).send('Failed to update machine rating.');
    }
};

/**
 * Get all machine ratings.
 * Admin only.
 */
export const getAllMachineRatings = async (req: Request, res: Response): Promise<void> => {
    try {
        const machines = await Machine.find();
        for (const machine of machines) {
            await (machine as any).updateRating();
        }

        res.status(200).json({ 
            message: "OK", 
            msg: 'All machine ratings updated successfully.' 
        });
    } catch (error) {
        console.error('Error updating all machine ratings:', error);
        res.status(500).send('Failed to update all machine ratings.');
    }
};

/**
 * Give up a machine.
 */
export const giveUpMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const { machineId } = req.params;
        const userId = res.locals.jwtData.id;
        if (!userId) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'User not found.' 
            });
            return;
        }
        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine not found.' 
            });
            return;
        }
        const userProgress = await UserProgress.findOne({ user: userId, machine: machineId, completed: false });
        if (!userProgress) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'User progress not found.' 
            });
            return;
        }
        userProgress.completed = true;
        userProgress.completedAt = new Date();
        await userProgress.save();
        res.status(200).json({ 
            message: "OK", 
            msg: 'You have given up.' 
        });
    } catch (error) {
        console.error('Error giving up:', error);
        res.status(500).send('Failed to give up.');
    }
};

/**
 * Get latest machine.
 */
export const getLatestMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const latestMachine = await Machine.findOne({ isActive: true })
        .sort({ createdAt: -1 })
        .select('-__v -updatedAt -description -reviews -hints -amiId -flag');
        res.status(200).json({ 
            message: "OK", 
            msg: 'Latest machine fetched successfully.', 
            machine: latestMachine 
        });
    } catch (error) {
        console.error('Error fetching latest machine:', error);
        res.status(500).send('Failed to fetch latest machine.');
    }
};

/**
 * Get most played machine.
 */
export const getMostPlayedMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const mostPlayedMachine = await Machine.findOne({ isActive: true })
        .sort({ playerCount: -1 })
        .select('-__v -updatedAt -description -reviews -hints -amiId -flag');
        res.status(200).json({ 
            message: "OK", 
            msg: 'Most played machine fetched successfully.', 
            machine: mostPlayedMachine 
        });
    } catch (error) {
        console.error('Error fetching most played machine:', error);
        res.status(500).send('Failed to fetch most played machine.');
    }
};
