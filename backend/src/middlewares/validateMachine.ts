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
    .isIn(['Web', 'Network', 'Database', 'Crypto', 'Cloud', 'AI', 'OS', 'Other'])
    .withMessage('Invalid category selected.'),
  body('info')
    .notEmpty()
    .withMessage('Info is required.')
    .isLength({ min: 5 })
    .withMessage('Info must be at least 5 characters long.'),
  body('hints')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Hints must be an array.'),
  body('hintCosts')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Hint costs must be an array.'),
  body('amiId')
    .notEmpty()
    .withMessage('AMI ID is required.')
    .matches(/^ami-[0-9a-fA-F]{8,17}$/)
    .withMessage('Invalid AMI ID format.'),
  body('exp')
    .optional()
    .isInt({ min: 50 })
    .withMessage('Experience points must be a positive integer.'),
  body('flag')
    .notEmpty()
    .withMessage('Flag is required.')
    .isString()
    .withMessage('Flag must be a string.')
    .isLength({ min: 5 })
    .withMessage('Flag must be at least 5 characters long.'),

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
