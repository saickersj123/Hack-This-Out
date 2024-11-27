import express from 'express';
import { verifyToken } from '../middlewares/Token.js';
import {
    createContest,
    participateInContest,
    submitFlagForContest,
    deleteContest,
    getHintInContest,
    getContests,
    getLeaderboardByContest,
    updateContestDetails,
    getContestStatus,
    getContestDetails,
    getContestParticipations,
    activateContest,
    deactivateContest,
    getActiveContests,
    getInactiveContests,
    getActiveContestDetails,
    getInactiveContestDetails,
    giveUpContest,
    getUsedHintsInContest,
    getMyRankInContest,
    getStartedContest,
    getLatestContest,
    getContestParticipationDetails,
    getContestResult
} from '../controllers/ContestController.js';
import { verifyAdmin } from '../middlewares/Admin.js';
import { createContestValidation, updateContestValidation, handleValidation } from '../middlewares/validateContest.js';
import { flagSubmissionLimiter } from '../middlewares/rateLimiter';

const ContestRoutes = express.Router();

// Public Routes
// Route to create a new contest
ContestRoutes.post(
    '/',
    verifyToken,
    createContestValidation,
    handleValidation,
    createContest
);

// Route to get active contest details
ContestRoutes.get('/active/:contestId', verifyToken, getActiveContestDetails);

// Route to get all active contests
ContestRoutes.get('/active', verifyToken, getActiveContests);

// Route to get user contest participations
ContestRoutes.get('/participations', verifyToken, getContestParticipations);

// Route to get contest participation details
ContestRoutes.get('/:contestId/participation', verifyToken, getContestParticipationDetails);

// Route to participate in a contest
ContestRoutes.post('/:contestId/participate', verifyToken, participateInContest);

// Route to submit a flag for a contest
ContestRoutes.post('/:contestId/:machineId/submit-flag',
    verifyToken,
    flagSubmissionLimiter,
    submitFlagForContest
);

// Route to get contest hints
ContestRoutes.get('/:contestId/:machineId/hints', verifyToken, getHintInContest);

// Route to get used hints
ContestRoutes.get('/:contestId/:machineId/used-hints', verifyToken, getUsedHintsInContest);

// Route to get leaderboard by contest
ContestRoutes.get('/:contestId/leaderboard', verifyToken, getLeaderboardByContest);

// Route to get my rank in contest
ContestRoutes.get('/:contestId/my-rank', verifyToken, getMyRankInContest);

// Route to give up a contest
ContestRoutes.post('/:contestId/give-up', verifyToken, giveUpContest);

// Route to get started contests
ContestRoutes.get('/started', verifyToken, getStartedContest);

// Route to get latest contest
ContestRoutes.get('/latest', verifyToken, getLatestContest);

// Route to get contest result
ContestRoutes.get('/:contestId/result', verifyToken, getContestResult);

// Admin Routes
// Route to get all contests(Admin only)
ContestRoutes.get('/',
    verifyToken,
    verifyAdmin,
    getContests
);

// Route to get contest details(Admin only)
ContestRoutes.get('/:contestId',
    verifyToken,
    //verifyAdmin,
    getContestDetails
);

// Route to get inactive contest details(Admin only)
ContestRoutes.get('/inactive/:contestId',
    verifyToken,
    verifyAdmin,
    getInactiveContestDetails
);

// Route to get all inactive contests(Admin only)
ContestRoutes.get('/inactive',
    verifyToken,
    verifyAdmin,
    getInactiveContests
);

// Route to update an existing contest details(Admin only)
ContestRoutes.put(
    '/:contestId',
    verifyToken,
    verifyAdmin,
    updateContestValidation,
    handleValidation,
    updateContestDetails
);

// Route to delete a contest(Admin only)
ContestRoutes.delete('/:contestId',
    verifyToken,
    verifyAdmin,
    deleteContest
);

// Route to activate a contest(Admin only)
ContestRoutes.post('/:contestId/active',
    verifyToken,
    verifyAdmin,
    activateContest
);

// Route to deactivate a contest(Admin only)
ContestRoutes.post('/:contestId/deactive',
    verifyToken,
    verifyAdmin,
    deactivateContest
);

// Route to get contest status(Admin only)
ContestRoutes.get('/:contestId/status',
    verifyToken,
    //verifyAdmin,
    getContestStatus
);

export default ContestRoutes;
