import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Contest from '../models/Contest';
import ContestParticipation from '../models/ContestParticipation';
import Machine from '../models/Machine';
import User from '../models/User';

/**
 * Create a new contest.
 */
export const createContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, startTime, endTime, machines, contestExp } = req.body;

        // Validate machines
        const machineDocs = await Machine.find({ _id: { $in: machines } });
        if (machineDocs.length !== machines.length) {
            res.status(400).json({ msg: 'One or more machines are invalid.' });
            return;
        }

        const newContest = new Contest({
            name,
            description,
            startTime,
            endTime,
            machines,
            contestExp,
            isActive: false
        });

        await newContest.save();
        res.status(201).json({ msg: 'Contest created successfully.', contest: newContest });
    } catch (error: any) {
        console.error('Error creating contest:', error);
        res.status(500).send('Failed to create contest.');
    }
};

/**
 * Activate contest(Admin only).
 */
export const activateContest = async (req: Request, res: Response): Promise<void> => {
    try {
        //Get Contest ID and Active Status from Request Body
        const { contestId } = req.params;

        //Find Contest by ID
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ msg: 'Contest not found.' });
            return;
        }

        const currentTime = new Date();
        if(contest.startTime < currentTime && contest.endTime > currentTime) {
            contest.isActive = true;
            await contest.save();
            res.status(200).json({ msg: 'Contest active status updated successfully.', contest });
        } else {
            res.status(400).json({ msg: 'Contest is not active.' });
        }
    } catch (error: any) {
        console.error('Error updating contest active status:', error);
        res.status(500).send('Failed to activate contest.');
    }
};

/**
 * Deactivate contest(Admin only).
 */
export const deactivateContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ msg: 'Contest not found.' });
            return;
        }
    } catch (error: any) {
        console.error('Error deactivating contest:', error);
        res.status(500).send('Failed to deactivate contest.');
    }
};

/**
 * Get active contests.
 */
export const getActiveContests = async (req: Request, res: Response): Promise<void> => {
    try {
        const contests = await Contest.find({ isActive: true });
        res.status(200).json({ msg: 'Active contests fetched successfully.', contests });
    } catch (error: any) {
        console.error('Error fetching active contests:', error);
        res.status(500).send('Failed to fetch active contests.');
    }
};

/**
 * Get inactive contests(Admin only).
 */
export const getInactiveContests = async (req: Request, res: Response): Promise<void> => {
    try {
        const contests = await Contest.find({ isActive: false });
        res.status(200).json({ msg: 'Inactive contests fetched successfully.', contests });
    } catch (error: any) {
        console.error('Error fetching inactive contests:', error);
        res.status(500).send('Failed to fetch inactive contests.');
    }
};


/**
 * Get contest status(Admin only).
 */
export const getContestStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId);
        res.status(200).json({ msg: 'Contest status fetched successfully.', isActive: contest?.isActive });
    } catch (error: any) {
        console.error('Error getting contest status:', error);
        res.status(500).send('Failed to get contest status.');
    }
};

/**
 * Participate in a contest.
 */
export const participateInContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const { machineId } = req.body;
        const userId = res.locals.jwtData.id;

        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ msg: 'Contest not found.' });
            return;
        }

        const currentTime = new Date();
        if (currentTime < contest.startTime || currentTime > contest.endTime) {
            res.status(400).json({ msg: 'Contest is not active.' });
            return;
        }

        // Check if machine is part of the contest
        if (!contest.machines.includes(machineId)) {
            res.status(400).json({ msg: 'Machine not part of the contest.' });
            return;
        }

        // Check if already participated
        const existingParticipation = await ContestParticipation.findOne({ user: userId, contest: contestId, machine: machineId });
        if (existingParticipation) {
            res.status(400).json({ msg: 'Already participated in this contest for this machine.' });
            return;
        }

        // Create a new participation record without setting participationStartTime
        const newParticipation = new ContestParticipation({
            user: userId,
            contest: contestId,
            machine: machineId
        });

        await newParticipation.save();
        res.status(201).json({ msg: 'Participation successful.', participation: newParticipation });
    } catch (error: any) {
        console.error('Error participating in contest:', error);
        res.status(500).send('Failed to participate in contest.');
    }
};

/**
 * Get user is participated in contest.
 */
export const getUserContestParticipation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const userId = res.locals.jwtData.id;
        const participation = await ContestParticipation.findOne({ user: userId, contest: contestId });
        res.status(200).json({ msg: 'User contest participation fetched successfully.', participation });
    } catch (error: any) {
        console.error('Error getting user contest participation:', error);
        res.status(500).send('Failed to get user contest participation.');
    }
};

/**
 * Submit a flag for a contest.
 */
export const submitFlagForContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const { machineId, flag } = req.body;
        const userId = res.locals.jwtData.id;

        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ msg: 'Contest not found.' });
            return;
        }

        const currentTime = new Date();
        if (currentTime < contest.startTime || currentTime > contest.endTime) {
            res.status(400).json({ msg: 'Contest is not active.' });
            return;
        }

        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ msg: 'Machine not found.' });
            return;
        }

        // Verify if the machine is part of the contest
        if (!contest.machines.includes(machineId)) {
            res.status(400).json({ msg: 'Machine not part of the contest.' });
            return;
        }

        const participation = await ContestParticipation.findOne({ user: userId, contest: contestId, machine: contest.machines[0]._id });
        if (!participation) {
            res.status(400).json({ msg: 'Participation not found. Please participate first.' });
            return;
        }

        // Ensure that the contest has started for this participation
        if (!participation.participationStartTime) {
            res.status(400).json({ msg: 'Contest has not started yet. Please wait until the instance is running.' });
            return;
        }

        // Verify the flag

        const isMatch = await bcrypt.compare(flag, machine.flag);
        if (!isMatch) {
            res.status(400).json({ msg: 'Incorrect flag.' });
            return;
        }

        // Calculate EXP based on time taken and hints used
        const timeTaken = (currentTime.getTime() - participation.participationStartTime.getTime()) / 1000; // in seconds
        const hintsUsed = participation.hintsUsed;

        // EXP calculation
        // EXP calculation with better scaling
        let expEarned = contest.contestExp;
        const timePercentage = timeTaken / (contest.endTime.getTime() - contest.startTime.getTime());
        const timeMultiplier = Math.max(0.3, 1 - timePercentage); // Minimum 30% of base EXP
        expEarned = Math.floor(expEarned * timeMultiplier);
        expEarned -= hintsUsed * 5; // Hint penalty
        expEarned = Math.max(Math.floor(contest.contestExp * 0.1), expEarned); // Minimum 10% of base EXP

        if (expEarned < 0) expEarned = 0;

        participation.participationEndTime = currentTime;
        participation.expEarned = expEarned;

        await participation.save();

        // Update user's EXP and level
        const user = await User.findById(userId);
        if (user) {
            user.exp += expEarned;
            await (user as any).updateLevel(); // Assuming updateLevel is properly typed
            await user.save();
        }

        res.status(200).json({ msg: 'Flag accepted.', expEarned, totalExp: user?.exp });
    } catch (error: any) {
        console.error('Error submitting flag for contest:', error);
        res.status(500).send('Failed to submit flag for contest.');
    }
};

/**
 * Use a hint in a contest.
 */
export const getHintInContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const { machineId } = req.body;
        const userId = res.locals.jwtData.id;

        const participation = await ContestParticipation.findOne({ user: userId, contest: contestId, machine: machineId });
        if (!participation) {
            res.status(400).json({ msg: 'Participation not found.' });
            return;
        }

        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ msg: 'Machine not found.' });
            return;
        }
        
        if (participation.hintsUsed >= machine.hints.length) {
            res.status(400).json({ msg: 'No more hints available.' });
            return;
        }

        participation.hintsUsed += 1;
        await participation.save();

        res.status(200).json({ msg: 'Hint used.', hintsUsed: participation.hintsUsed, hints: machine.hints });
    } catch (error: any) {
        console.error('Error using hint in contest:', error);
        res.status(500).send('Failed to use hint in contest.');
    }
};

/**
 * Update an existing contest details(Admin only).
 */
export const updateContestDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const { name, description, startTime, endTime, machines, contestExp } = req.body;

        // Find the contest
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ msg: 'Contest not found.' });
            return;
        }

        // Set existing startTime for validation if not provided
        if (!startTime && endTime) {
            req.body.startTime = contest.startTime;
        }

        // If machines are being updated, validate them
        if (machines) {
            const machineDocs = await Machine.find({ _id: { $in: machines } });
            if (machineDocs.length !== machines.length) {
                res.status(400).json({ msg: 'One or more machines are invalid.' });
                return;
            }
            contest.machines = machines;
        }

        // Update other fields if provided
        if (name) contest.name = name;
        if (description) contest.description = description;
        if (startTime) contest.startTime = startTime;
        if (endTime) contest.endTime = endTime;
        if (contestExp !== undefined) contest.contestExp = contestExp;

        await contest.save();
        res.status(200).json({ msg: 'Contest updated successfully.', contest });
    } catch (error: any) {
        console.error('Error updating contest:', error);
        res.status(500).send('Failed to update contest.');
    }
};

/**
 * Delete a contest(Admin only).
 */
export const deleteContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;

        // Find the contest
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ msg: 'Contest not found.' });
            return;
        }

        // Delete all participations related to this contest
        await ContestParticipation.deleteMany({ contest: contestId });

        // Delete the contest
        await Contest.findByIdAndDelete(contestId);

        res.status(200).json({ msg: 'Contest and related participations deleted successfully.' });
    } catch (error: any) {
        console.error('Error deleting contest:', error);
        res.status(500).send('Failed to delete contest.');
    }
};

/**
 * Get all contests(Admin only).
 */
export const getContests = async (req: Request, res: Response): Promise<void> => {
    try {
        const contests = await Contest.find();
        res.json(contests);
    } catch (error: any) {
        console.error('Error fetching contests:', error);
        res.status(500).send('Failed to fetch contests.');
    }
};

/**
 * Get active contest details.
 */
export const getActiveContestDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId, { isActive: true });
        res.status(200).json({ msg: 'Contest details fetched successfully.', contest });
    } catch (error: any) {
        console.error('Error fetching contest details:', error);
        res.status(500).send('Failed to fetch contest details.');
    }
};

/**
 * Get inactive contest details(Admin only).
 */
export const getInactiveContestDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId, { isActive: false });
        res.status(200).json({ msg: 'Contest details fetched successfully.', contest });
    } catch (error: any) {
        console.error('Error fetching contest details:', error);
        res.status(500).send('Failed to fetch contest details.');
    }
};

/**
 * Get contest details(Admin only).
 */
export const getContestDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const contest = await Contest.findById(contestId);
        res.status(200).json({ msg: 'Contest details fetched successfully.', contest });
    } catch (error: any) {
        console.error('Error fetching contest details:', error);
        res.status(500).send('Failed to fetch contest details.');
    }
};

/**
 * Get leaderboard by contest.
 */
export const getLeaderboardByContest = async (req: Request, res: Response) => {
    try {
        const { contestId } = req.params;
        const participations = await ContestParticipation.find({ contest: contestId }).sort({ expEarned: -1 });
        return res.status(200).json({ message: "OK", users: participations.map((participation) => participation.user) });
    } catch (error: any) {
        console.error('Error getting leaderboard:', error);
        res.status(500).send('Failed to get leaderboard.');
    }
}

