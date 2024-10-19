import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateMachine = [
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.'),
  body('category')
    .notEmpty()
    .withMessage('Category is required.')
    .isIn(['Web', 'Network', 'Database', 'Other'])
    .withMessage('Invalid category selected.'),
  body('amiId')
    .notEmpty()
    .withMessage('AMI ID is required.')
    .matches(/^ami-[0-9a-fA-F]{8,17}$/)
    .withMessage('Invalid AMI ID format.'),
  body('exp')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Experience points must be a positive integer.'),
  // Add more validations as needed

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export default validateMachine;
