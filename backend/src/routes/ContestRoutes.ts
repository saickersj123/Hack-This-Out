import express from 'express';
import { verifyToken } from '../middlewares/Token.js';
import {
    createContest,
    participateInContest,
    submitFlagForContest,
    useHintInContest,
    updateContest,
    deleteContest
} from '../controllers/ContestController.js';
import { verifyAdmin } from '../middlewares/Admin.js';
import { createContestValidation, updateContestValidation, handleValidation } from '../middlewares/validateContest.js';

const ContestRoutes = express.Router();

// Route to create a new contest (admin access)
ContestRoutes.post(
    '/',
    verifyToken,
    verifyAdmin,
    createContestValidation,
    handleValidation,
    createContest
);

// Route to participate in a contest
ContestRoutes.post('/participate', verifyToken, participateInContest);

// Route to submit a flag for a contest
ContestRoutes.post('/submit-flag', verifyToken, submitFlagForContest);

// Route to use a hint in a contest
ContestRoutes.post('/use-hint', verifyToken, useHintInContest);

// Route to update an existing contest (admin access)
ContestRoutes.put(
    '/:contestId',
    verifyToken,
    verifyAdmin,
    updateContestValidation,
    handleValidation,
    updateContest
);

// Route to delete a contest (admin access)
ContestRoutes.delete('/:contestId', verifyToken, verifyAdmin, deleteContest);

export default ContestRoutes;
