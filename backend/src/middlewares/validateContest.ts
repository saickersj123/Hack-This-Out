import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import Machine from '../models/Machine';

/**
 * Validation rules for creating a new contest.
 */
export const createContestValidation: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long.'),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .isString()
        .withMessage('Description must be a string.')
        .isLength({ max: 500 })
        .withMessage('Description can be at most 500 characters long.'),
    body('startTime')
        .notEmpty()
        .withMessage('Start time is required.')
        .isISO8601()
        .withMessage('Start time must be a valid ISO 8601 date.')
        .toDate(),
    body('endTime')
        .notEmpty()
        .withMessage('End time is required.')
        .isISO8601()
        .withMessage('End time must be a valid ISO 8601 date.')
        .toDate()
        .custom((value, { req }) => {
            const startTime = new Date(req.body.startTime);
            const endTime = new Date(value);

            if (endTime <= startTime) {
                throw new Error('End time must be after start time.');
            }

            const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
            if (durationInHours < 24) {
                throw new Error('Contest duration must be at least 24 hours.');
            }

            return true;
        }),
    body('machines')
        .isArray({ min: 1 })
        .withMessage('Machines must be an array with at least one machine ID.')
        .custom(async (machines) => {
            const machineCount = await Machine.countDocuments({ _id: { $in: machines } });
            if (machineCount !== machines.length) {
                throw new Error('One or more machines are invalid.');
            }
            return true;
        }),
    body('contestExp')
        .notEmpty()
        .withMessage('Contest EXP is required.')
        .isInt({ min: 100 })
        .withMessage('Contest EXP must be a non-negative integer.')
];

/**
 * Validation rules for updating an existing contest.
 */
export const updateContestValidation: ValidationChain[] = [
    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long.'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string.')
        .isLength({ max: 500 })
        .withMessage('Description can be at most 500 characters long.'),
    body('startTime')
        .optional()
        .isISO8601()
        .withMessage('Start time must be a valid ISO 8601 date.')
        .toDate(),
    body('endTime')
        .optional()
        .isISO8601()
        .withMessage('End time must be a valid ISO 8601 date.')
        .toDate()
        .custom((value, { req }) => {
            const startTime = req.body.startTime
                ? new Date(req.body.startTime)
                : (req.body.existingStartTime ? new Date(req.body.existingStartTime) : null);

            if (startTime && value) {
                if (new Date(value) <= startTime) {
                    throw new Error('End time must be after start time.');
                }

                const durationInHours = (new Date(value).getTime() - startTime.getTime()) / (1000 * 60 * 60);
                if (durationInHours < 24) {
                    throw new Error('Contest duration must be at least 24 hours.');
                }
            }

            return true;
        }),
    body('machines')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Machines must be an array with at least one machine ID.')
        .custom(async (machines) => {
            const machineCount = await Machine.countDocuments({ _id: { $in: machines } });
            if (machineCount !== machines.length) {
                throw new Error('One or more machines are invalid.');
            }
            return true;
        }),
    body('contestExp')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Contest EXP must be a non-negative integer.')
];

/**
 * Middleware to handle validation results.
 */
export const handleValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
