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
        
        // Validate required fields
        if (!name || !startTime || !endTime || !machines || !contestExp) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Missing required fields.' 
            });
            return;
        }

        // Parse ISO strings to Date objects
        const parsedStartTime = new Date(startTime);
        const parsedEndTime = new Date(endTime);
        const currentTime = new Date();

        if (isNaN(parsedStartTime.getTime()) || isNaN(parsedEndTime.getTime())) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Invalid startTime or endTime format.' 
            });
            return;
        }

        // Validate start time is in the future
        if (parsedStartTime <= currentTime) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Start time must be in the future.' 
            });
            return;
        }

        // Validate time sequence
        if (parsedStartTime >= parsedEndTime) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Start time must be before end time.' 
            });
            return;
        }

        // Validate contest duration (optional)
        const durationInHours = (parsedEndTime.getTime() - parsedStartTime.getTime()) / (1000 * 60 * 60);
        if (durationInHours < 1) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Contest duration must be at least 1 hour.' 
            });
            return;
        }

        // Validate machines array
        if (!Array.isArray(machines) || machines.length === 0) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'At least one machine must be specified.' 
            });
            return;
        }

        // Validate machines exist in database
        const machineDocs = await Machine.find({ _id: { $in: machines } });
        if (machineDocs.length !== machines.length) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'One or more machines are invalid.' 
            });
            return;
        }

        // Check for duplicate contest
        const contestExists = await Contest.findOne({ 
            $and: [
                { name },
                { 
                    startTime: { $lte: parsedEndTime },
                    endTime: { $gte: parsedStartTime }
                }
            ]
        });

        if (contestExists) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Contest with this name and time already exists.' 
            });
            return;
        }

        const newContest = new Contest({
            name,
            description: description || '',
            startTime: parsedStartTime,
            endTime: parsedEndTime,
            machines,
            contestExp,
            isActive: false
        });

        await newContest.save();
        
        res.status(201).json({ 
            message: "OK", 
            msg: 'Contest created successfully.', 
            contest: newContest 
        });
    } catch (error: any) {
        console.error('Error creating contest:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to create contest.',
            error: error.message
        });
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
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }

        contest.isActive = true;
        await contest.save();
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest activated successfully.', 
            contest 
        });
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
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }
        contest.isActive = false;
        await contest.save();
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest deactivated successfully.', 
            contest 
        });
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
        const contests = await Contest.find({ isActive: true }).sort({ startTime: -1 }).select('-__v -createdAt -updatedAt -description');
        if (contests.length === 0) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'No active contests found.' 
            });
            return;
        }
        const currentTime = new Date();
        const notStartedContests = contests.filter(contest => currentTime < contest.startTime);
        const ongoingContests = contests.filter(contest => currentTime >= contest.startTime && currentTime <= contest.endTime);
        const endedContests = contests.filter(contest => currentTime > contest.endTime);
        res.status(200).json({ 
            message: "OK", 
            msg: 'Active contests fetched successfully.', 
            notStartedContests: notStartedContests,
            ongoingContests: ongoingContests,
            endedContests: endedContests,
        });
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
        res.status(200).json({ 
            message: "OK", 
            msg: 'Inactive contests fetched successfully.', 
            contests: contests 
        });
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
        if (!contest) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }
        const currentTime = new Date();
        const isStarted: boolean = currentTime >= contest.startTime;
        const isEnded: boolean = currentTime >= contest.endTime;
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest status fetched successfully.', 
            contestName: contest?.name, 
            isActive: contest?.isActive, 
            isStarted: isStarted,
            isEnded: isEnded,
            startTime: contest?.startTime, 
            endTime: contest?.endTime 
        });
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
        const userId = res.locals.jwtData.id;

        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }

        const currentTime = new Date();
        if (currentTime < contest.startTime) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Contest is not started yet.' 
            });
            return;
        }
        if (currentTime > contest.endTime) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Contest has ended.' 
            });
            return;
        }
        // Check if already completed
        const alreadyCompleted = await ContestParticipation.findOne(
            { user: userId, contest: contestId, contestCompleted: true }
        );
        if (alreadyCompleted) {
            res.status(400).json({ 
                message: "COMPLETED", 
                msg: 'You have already completed this contest.', 
                participation: alreadyCompleted
            });
            return;
        }
        // Check if already participated
        const existingParticipation = await ContestParticipation.findOne(
            { user: userId, contest: contestId }
        );
        if (existingParticipation) {
            res.status(302).json({ 
                message: "FOUND", 
                msg: 'You are already participating in this contest.', 
                participation: existingParticipation
            });
            return;
        }
        // Create a new participation record without setting participationStartTime
        if (!existingParticipation) {
            const newParticipation = new ContestParticipation({
                user: userId,
                contest: contestId,
                participationStartTime: currentTime,
            });
            await newParticipation.save();
        }
        res.status(201).json({ 
            message: "OK", 
            msg: 'Participation successful.', 
        });
    } catch (error: any) {
        console.error('Error participating in contest:', error);
        res.status(500).send('Failed to participate in contest.');
    }
};

/**
 * Submit a flag for a contest.
 */
export const submitFlagForContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId, machineId } = req.params;
        const { flag } = req.body;
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'User not found.' 
            });
            return;
        }

        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }

        const currentTime = new Date();
        if (currentTime < contest.startTime || currentTime > contest.endTime) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Contest is not active.' 
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

        // Verify if the machine is part of the contest
        if(contest.machines.indexOf(machineId as any) === -1) {    
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Machine not part of the contest.' 
            });
            return;
        }

        const participation = await ContestParticipation.findOne(
            { user: userId, contest: contestId, contestCompleted: false }
        );
        if (!participation) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Participation not found. Please participate first.' 
            });
            return;
        }

        // Ensure that the contest has started for this participation
        if (!participation.participationStartTime) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Contest has not started yet. Please wait until the instance is running.' 
            });
            return;
        }

        // Verify the flag
        const isMatch = await bcrypt.compare(flag, machine.flag);
        if (!isMatch) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Incorrect flag.' 
            });
            return;
        }

        // Calculate Expenses based on time taken and hints used
        const timeTaken = (currentTime.getTime() - participation.participationStartTime.getTime()) / 1000; // in seconds
        const timeSinceContestStart = (currentTime.getTime() - contest.startTime.getTime()) / 1000; // in seconds
        const contestDuration = (contest.endTime.getTime() - contest.startTime.getTime()) / 1000; // in seconds

        // Ensure timeSinceContestStart does not exceed contestDuration
        const effectiveTimeSinceStart = Math.min(timeSinceContestStart, contestDuration);

        // EXP calculation with combined time penalties
        let expEarned = contest.contestExp;

        // Calculate the percentage of time taken relative to contest duration
        const timeTakenPercentage = timeTaken / contestDuration;
        // Calculate the percentage of time elapsed since contest start relative to contest duration
        const timeSinceStartPercentage = effectiveTimeSinceStart / contestDuration;

        // Calculate a combined multiplier based on both time taken and time since start
        const combinedMultiplier = Math.max(0.1, 1 - timeTakenPercentage - timeSinceStartPercentage);

        expEarned = Math.floor(contest.contestExp * combinedMultiplier);
        expEarned -= participation.hintsUsed * 20; // 20 EXP penalty per hint
        expEarned = Math.max(Math.floor(contest.contestExp * 0.05), expEarned); // minimum 5% of base EXP

        if (expEarned < 1) expEarned = 1; // Minimum 1 EXP

        participation.expEarned = expEarned;
        participation.machineCompleted.push({ machine: machineId, completed: true });
        await participation.save();
        
        if(participation.machineCompleted.length === contest.machines.length) {
            participation.contestCompleted = true;
            participation.participationEndTime = currentTime;
            // Update user's EXP and level
            user.exp += expEarned;
            await (user as any).updateLevel(); // Assuming updateLevel is properly typed
            await user.save();
            await participation.save();
        }

        res.status(200).json({ 
            message: "OK", 
            msg: 'Flag accepted.', 
            expEarned: expEarned, 
            totalExp: user?.exp
        });
    } catch (error: any) {
        console.error('Error submitting flag for contest:', error);
        res.status(500).send('Failed to submit flag for contest.');
    }
};

/**
 * Give up a contest.
 */
export const giveUpContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const userId = res.locals.jwtData.id;
        if (!userId) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'User not found.' 
            });
            return;
        }

        const participation = await ContestParticipation.findOne(
            { user: userId, contest: contestId, contestCompleted: false }
        );
        if (!participation) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Participation not found.' 
            });
            return;
        }

        participation.participationEndTime = new Date();
        participation.expEarned = 0;
        participation.contestCompleted = true;
        await participation.save();

        res.status(200).json({ 
            message: "OK", 
            msg: 'You have given up.', 
            participation: participation 
        });
    } catch (error: any) {
        console.error('Error giving up contest:', error);
        res.status(500).send('Failed to give up contest.');
    }
};


/**
 * Use a hint in a contest.
 */
export const getHintInContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId, machineId } = req.params;
        const userId = res.locals.jwtData.id;

        // Validate user authentication
        if (!userId) {
            res.status(401).json({ 
                message: "ERROR", 
                msg: 'Unauthorized. Please log in.' 
            });
            return;
        }

        // Verify contest existence
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }
            // Start of Selection
            // Verify machine is part of the contest
            if (!contest.machines.map(id => id.toString()).includes(machineId)) {
                res.status(400).json({ 
                    message: "ERROR", 
                    msg: 'Machine is not part of the contest.' 
                });
            return;
        }

        // Fetch the machine details
        const machine = await Machine.findById(machineId);
        if (!machine || !machine.hints || machine.hints.length === 0) {
            res.status(404).json({ msg: 'No hints available for this machine.' });
            return;
        }

        // Fetch or create contest participation
        let participation = await ContestParticipation.findOne({ 
            user: userId, 
            contest: contestId, 
            contestCompleted: false 
        });

        if (!participation) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Participation not found. Please participate first.' 
            });
            return;
        }

        // Ensure the machine is part of the participation
        const machineCompletion = participation.machineCompleted.find(mc => mc.machine.toString() === machineId);
        if (machineCompletion && machineCompletion.completed) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Machine already completed.' 
            });
            return;
        }

        // Fetch used hints for the specific machine
        const machineParticipation = participation.usedHints.find(uh => uh.machine.toString() === machineId);
        const hintsUsed = machineParticipation ? machineParticipation.hints.length : 0;

        if (hintsUsed >= machine.hints.length) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'No more hints available for this machine.' 
            });
            return;
        }

        // Get the next hint
        const hintIndex = hintsUsed;
        const hint = machine.hints[hintIndex];

        // Update participation with the used hint
        if (machineParticipation) {
            machineParticipation.hints.push(hint.content);
        } else {
            participation.usedHints.push({ machine: machineId, hints: [hint.content] });
        }
        participation.hintsUsed += 1;
        participation.remainingHints = Math.max(0, machine.hints.length - participation.hintsUsed);

        await participation.save();

        res.status(200).json({
            message: "OK",
            msg: 'Hint revealed.',
            hint: hint.content,
            hintsUsed: participation.hintsUsed,
            remainingHints: participation.remainingHints,
            usedHints: machineParticipation ? machineParticipation.hints : [hint.content],
        });
    } catch (error: any) {
        console.error('Error using hint in contest:', error);
        res.status(500).send('Failed to get hint for contest.');
    }
};


/**
 * Get used hints for a specific machine in a contest.
 */
export const getUsedHintsInContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId, machineId } = req.params;
        const userId = res.locals.jwtData.id;

        if (!userId) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'User not found.' 
            });
            return;
        }

        // Verify contest existence
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }

        // Verify machine is part of the contest
        if (!contest.machines.some(id => id.toString() === machineId)) {
            res.status(400).json({ 
                message: "ERROR", 
                msg: 'Machine is not part of the contest.' 
            });
            return;
        }

        // Fetch the machine details
        const machine = await Machine.findById(machineId);
        if (!machine) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Machine not found.' 
            });
            return;
        }

        // Fetch participation specific to the user and contest
        const participation = await ContestParticipation.findOne({
            user: userId,
            contest: contestId,
            contestCompleted: false,
        });

        if (!participation) {
            // Optionally, create participation here if it should exist
            res.status(200).json({ 
                message: "OK", 
                msg: 'No hints used yet for this machine.', 
                usedHints: [],
                hintsUsed: 0,
                remainingHints: machine.hints.length,
            });
            return;
        }

        // Extract used hints for the specific machine
        const machineParticipation = participation.usedHints.find(uh => uh.machine.toString() === machineId);
        const usedHints = machineParticipation ? machineParticipation.hints : [];
        const hintsUsed = usedHints.length;
        const totalHints = machine.hints.length;
        const remainingHints = totalHints - hintsUsed;

        res.status(200).json({ 
            message: "OK", 
            msg: 'Used hints fetched successfully for this machine.', 
            usedHints: usedHints,
            hintsUsed: hintsUsed,
            remainingHints: Math.max(0, remainingHints),
        });
    } catch (error: any) {
        console.error('Error getting used hints in contest:', error);
        res.status(500).send('Failed to get used hints for the contest.');
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
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
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
                res.status(400).json({ 
                    message: "ERROR", 
                    msg: 'One or more machines are invalid.' 
                });
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
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest updated successfully.', 
            contest: contest 
        });
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
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }

        // Delete all participations related to this contest
        await ContestParticipation.deleteMany({ contest: contestId });

        // Delete the contest
        await Contest.findByIdAndDelete(contestId);

        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest and related participations deleted successfully.' 
        });
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
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contests fetched successfully.', 
            contests: contests 
        });
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
        const contest = await Contest.findById(contestId, { isActive: true }).populate('machines', 'name').select('-__v');
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest details fetched successfully.', 
            contest: contest 
        });
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
        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest details fetched successfully.', 
            contest: contest 
        });
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
        const contest = await Contest.findById(contestId).populate('machines', 'name').select('-__v');
        if (!contest) {
            res.status(404).json({ 
                message: "ERROR", 
                msg: 'Contest not found.' 
            });
            return;
        }

        res.status(200).json({ 
            message: "OK", 
            msg: 'Contest details fetched successfully.', 
            contest: contest 
        });
    } catch (error: any) {
        console.error('Error fetching contest details:', error);
        res.status(500).send('Failed to fetch contest details.');
    }
};

/**
 * Get leaderboard by contest.
 */
export const getLeaderboardByContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;

        // Fetch participations with user details
        const participations = await ContestParticipation.find({ contest: contestId, contestCompleted: true })
            .populate({
                path: 'user',
                select: 'username level avatar',
                model: User  // Explicitly specify the User model
            })
            .sort({ expEarned: -1 });

        // Map participations to include username and expEarned
        const leaderboard = participations.map(participation => ({
            username: participation.user ? (participation.user as any).username : 'Unknown User',
            level: participation.user ? (participation.user as any).level : 0,
            avatar: participation.user ? (participation.user as any).avatar : null,
            exp: participation.expEarned || 0
        }));

        res.status(200).json({ 
            message: "OK", 
            msg: 'Leaderboard fetched successfully.', 
            users: leaderboard 
        });
    } catch (error: any) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to get leaderboard.',
            error: error.message
        });
    }
};

/**
 * Get my rank in contest.
 */
export const getMyRankInContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestId } = req.params;
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId).select('level username avatar');
        if (!userId || !user) {
            res.status(400).json({
                message: "ERROR",
                msg: 'User not found.'
            });
            return;
        }

        const participation = await ContestParticipation.findOne({
            user: userId,
            contest: contestId,
            contestCompleted: true
        });
        if (!participation) {
            res.status(200).json({
                message: "OK",
                msg: 'You are not participating in this contest.',
                myRank: null,
                user: user
            });
            return;
        }

        const higherExpCount = await ContestParticipation.countDocuments({
            contest: contestId,
            expEarned: { $gt: participation.expEarned }
        });
        const myRank = higherExpCount + 1;
        
        res.status(200).json({
            message: "OK",
            msg: 'My rank fetched successfully.',
            myRank: myRank,
            user: user,
            expEarned: participation.expEarned
        }); 
    } catch (error: any) {
        console.error('Error getting my rank in contest:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to get my rank in contest.',
            error: error.message
        });
    }
}

/**
 * Get started contests.
 */
export const getStartedContest = async (req: Request, res: Response): Promise<void> => {
    try {
        const contest = await Contest.findOne({ isActive: true, startTime: { $lte: new Date() }, endTime: { $gte: new Date() } });
        if (!contest) {
            res.status(200).json({
                message: "OK",
                msg: 'No started contests found.',
                contest: null
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            msg: 'Started contests fetched successfully.',
            contest: contest
        });
    } catch (error: any) {
        console.error('Error fetching started contests:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to fetch started contests.',
            error: error.message
        });
    }

};

/**
 * Get latest contest.
 */
export const getLatestContest = async (req: Request, res: Response) => {
    try {
        const contest = await Contest.findOne({ isActive: true }).sort({ startTime: -1 });
        res.status(200).json({
            message: "OK",
            msg: 'Latest contest fetched successfully.',
            contest: contest
        });
    } catch (error: any) {
        console.error('Error fetching latest contest:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to fetch latest contest.',
            error: error.message
        });
    }
};

/**
 * Get contest participations.
 */
export const getContestParticipations = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.jwtData.id;
        if (!userId) {
            res.status(404).json({
                message: "ERROR",
                msg: 'User not found.'
            });
            return;
        }
        const participations = await ContestParticipation.find({ user: userId })
            .populate('contest', 'name')
            .populate('machineCompleted.machine', 'name')
            .select('-__v -updatedAt -createdAt -usedHints -remainingHints')
            .sort({ createdAt: -1 });
        if (!participations) {
            res.status(200).json({
                message: "OK",
                msg: 'You are not participating in any contest.',
                participation: []
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            msg: 'Contest participations fetched successfully.',
            participations: participations
        });
    } catch (error: any) {
        console.error('Error getting contest participation:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to get contest participation.',
            error: error.message
        });
    }
};

/**
 * Get contest participation details.
 */
export const getContestParticipationDetails = async (req: Request, res: Response) => {
    try {
        const { contestId } = req.params;
        const userId = res.locals.jwtData.id;
        if (!userId) {
            res.status(404).json({
                message: "ERROR",
                msg: 'User not found.'
            });
            return;
        }
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({
                message: "ERROR",
                msg: 'Contest not found.'
            });
            return;
        }
        const participation = await ContestParticipation.findOne({ contest: contestId, user: userId, contestCompleted: false })
            .populate('machineCompleted', 'name _id')
            .select('-__v -updatedAt -createdAt -usedHints -remainingHints');
        if (!participation) {
            res.status(200).json({
                message: "OK",
                msg: 'You are not participating in this contest yet.',
                participation: null
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            msg: 'Contest participation details fetched successfully.',
            participation: participation,
        });
    } catch (error: any) {
        console.error('Error getting contest participation details:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to get contest participation details.',
            error: error.message
        });
    }
};

/**
 * Get contest result.
 */
export const getContestResult = async (req: Request, res: Response) => {
    try {
        const { contestId } = req.params;
        const userId = res.locals.jwtData.id;
        if (!userId) {
            res.status(404).json({
                message: "ERROR",
                msg: 'User not found.'
            });
            return; 
        }
        const contest = await Contest.findById(contestId);
        if (!contest) {
            res.status(404).json({
                message: "ERROR",
                msg: 'Contest not found.'
            });
            return;
        }
        const participation = await ContestParticipation.findOne({ contest: contestId, user: userId });
        if (!participation) {
            res.status(400).json({
                message: "ERROR",
                msg: 'Participation not found.',
                machinesLeft: contest.machines.length,
                expEarned: null
            });
            return;
        }
        const machinesLeft = contest.machines.length - participation.machineCompleted.length;
        if (machinesLeft === 0) {
            res.status(200).json({
                message: "COMPLETE",
                msg: 'You have completed all the machines in this contest.',
                expEarned: participation.expEarned,
                machinesLeft: machinesLeft
            });
            return;
        }
        res.status(200).json({
            message: "OK",
            msg: 'Contest is not completed yet.',
            machinesLeft: machinesLeft,
            expEarned: participation.expEarned
        });
    } catch (error: any) {
        console.error('Error getting contest result:', error);
        res.status(500).json({
            message: "ERROR",
            msg: 'Failed to get contest result.',
            error: error.message
        });
    }
};
