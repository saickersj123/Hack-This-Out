import { Request, Response, NextFunction } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		for (let validation of validations) {
			const result = await validation.run(req);
			if (!result.isEmpty()) {
				break;
			}
		}
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		res.status(422).json({ errors: errors.array() });
	};
};

export const loginValidator = [
	body("email").trim().notEmpty().withMessage("Email is required"),
	body("password")
		.trim()
		.isLength({ min: 8, max: 15 })
		.withMessage("Password should contain minimum 8 and maximum 15 characters")
];

export const signUpValidator = [
	body("username")
		.trim()
		.isLength({ min: 3, max: 10 })
		.withMessage("Username should contain minimum 3 and maximum 10 characters")
		.notEmpty()
		.withMessage("Username is required"),
	body("email")
		.trim()
		.isEmail()
		.withMessage("Email is not valid"),
	body("password")
		.trim()
		.isLength({ min: 8, max: 15 })
		.withMessage("Password should contain minimum 8 and maximum 15 characters")
];

export const machineReviewValidator = [
	body("content")
		.trim()
		.notEmpty()
		.withMessage("Content is required"),
	body("rating")
		.trim()
		.notEmpty()
		.withMessage("Rating is required")
];
