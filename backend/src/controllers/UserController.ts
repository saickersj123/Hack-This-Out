import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import User from '../models/User';
import UserProgress from '../models/UserProgress';
import { createToken } from '../middlewares/Token';
import { COOKIE_NAME } from '../middlewares/Constants';

// GET all user information
export const getAllUser = async (req: Request, res: Response) => {
    try {
		const users = await User.find();
		return res.status(200).json({ message: "OK", users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
};

// POST user signup
export const postSignUp = async (req: Request, res: Response) => {
    const { name, user_id, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email, user_id });
        if (user) {
            res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            });
            return;
        }
        // Get user avatar (profile picture)
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            user_id,
            email,
            avatar,
            password
        });
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

		// create token
		const token = createToken(user._id.toString(), user.email, "7d");

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, {
			path: "/", //cookie directory in browser
			domain: process.env.DOMAIN, // our website domain
			expires, // same as token expiration time
			httpOnly: true,
			signed: true,
			sameSite: 'lax',
			secure: true,
		});

		return res
			.status(201)
			.json({ message: "OK", name: user.name, email: user.email });
    } catch(err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// POST user login
export const postLoginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
        return;
    }
    const { user_id, password } = req.body;
    try {
        let user = await User.findOne({ user_id });
        if (!user) {
            res.status(400).json({
                errors: [{
                    msg: 'User does not exist'
                }]
            });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                errors: [{
                    msg: 'Passwords do not match'
                }]
            });
            return;
        }
        // if user will login again we have to -> set new cookies -> erase previous cookies
		res.cookie(COOKIE_NAME,'clear_token' ,
			{
				path: "/", //cookie directory in browser
				domain: process.env.DOMAIN, // our website domain
				maxAge: 0,
				httpOnly: true,
				signed: true,
				sameSite: 'lax',
				secure: true,
			});

		// create token
		const token = createToken(user._id.toString(), user.email, "7d");

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, {
			path: "/", //cookie directory in browser
			domain: process.env.DOMAIN, // our website domain
			expires, // same as token expiration time
			httpOnly: true,
			signed: true,
			sameSite: 'lax',
			secure: true,
		});

		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// POST user logout
export const logoutUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware

		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res
				.status(401)
				.json({ message: "ERROR", cause: "Permissions didn't match" });
		}

        res.cookie(COOKIE_NAME,'clear_token' ,
			{
				path: "/", //cookie directory in browser
				domain: process.env.DOMAIN, // our website domain
				maxAge: 0,
				httpOnly: true,
				signed: true,
				sameSite: 'lax',
				secure: true,
			});

		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.log(err);
		return res
			.status(200)
			.json({ message: "ERROR", cause: err.message});
	}
};

// Verify user status
export const verifyUserStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware

		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res
				.status(401)
				.json({ message: "ERROR", cause: "Permissions didn't match" });
		}

		return res
			.status(200)
			.json({ message: "OK", user_id: user.user_id, name: user.name, email: user.email });
	} catch (err) {
		console.log(err);
		return res
			.status(200)
			.json({ message: "ERROR", cause: err.message});
	}
};

// Change user password
export const changePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { password } = req.body;
		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware

		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res
				.status(401)
				.json({ message: "ERROR", cause: "Permissions didn't match" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		await user.save();

		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.log(err);
		return res
			.status(200)
			.json({ message: "ERROR", cause: err.message});
	}
};

// Change user name
export const changeName = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).json({ message: "ERROR", cause: "Permissions didn't match" });
		}
		user.name = name;
		await user.save();
		return res.status(200).json({ message: "OK", name: user.name, email: user.email });
	} catch (error: any) {
		console.error('Error changing name:', error);
		res.status(500).send('Server error');
	}
}

// Check user password
export const checkPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { password } = req.body;
		const user = await User.findById(res.locals.jwtData.id); // get variable stored in previous middleware

		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res
				.status(401)
				.json({ message: "ERROR", cause: "Permissions didn't match" });
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect)
			return res
				.status(403)
				.json({ message: "ERROR", cause: "Incorrect Password" });

		return res
			.status(200)
			.json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.log(err);
		return res
			.status(200)
			.json({ message: "ERROR", cause: err.message});
	}
};

// Get user progress
export const getUserProgress = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		const userProgress = await UserProgress.findOne({ user: user._id });
		if (!userProgress) {
			res.status(404).json({ msg: 'User progress not found.' });
			return;
		}
		res.json({ userProgress, level: user.level, exp: user.exp });
	} catch (error: any) {
		console.error('Error getting user progress:', error);
		res.status(500).send('Server error');
	}
};

// Get user progress by user_id(Admin Only)
export const getUserProgressByUserId = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.params;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		const userProgress = await UserProgress.findOne({ user: user._id });
		if (!userProgress) {
			res.status(404).json({ msg: 'User progress not found.' });
			return;
		}
		res.json({ userProgress, level: user.level, exp: user.exp });
	} catch (error: any) {
		console.error('Error getting user progress:', error);
		res.status(500).send('Server error');
	}
}

// Update user level(Admin Only)
export const updateUserLevel = async (req: Request, res: Response) => {
	try {
		const { level } = req.body;
		const { user_id } = req.params;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		user.level = level;
		await user.save();
		return res.status(200).json({ message: "OK", level: user.level });
	} catch (error: any) {
		console.error('Error updating user level:', error);
		res.status(500).send('Server error');
	}
}

// Add user exp(Admin Only)
export const addUserExp = async (req: Request, res: Response) => {
	try {
		const { exp } = req.body;
		const { user_id } = req.params;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		user.exp += exp;
		await user.save();
		return res.status(200).json({ message: "OK", exp: user.exp });
	} catch (error: any) {
		console.error('Error updating user exp:', error);
		res.status(500).send('Server error');
	}
};

// Update User Avatar
export const updateUserAvatar = async (req: Request, res: Response) => {
	try {
		const { avatar } = req.body;
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		user.avatar = avatar;
		await user.save();
		return res.status(200).json({ message: "OK", avatar: user.avatar });
	} catch (error: any) {
		console.error('Error updating user avatar:', error);
		res.status(500).send('Server error');
	}	
};

// Update User to Admin
export const updateUsertoAdmin = async (req: Request, res: Response) => {
	try {
		const { AdminPassword } = req.body;
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		if (AdminPassword !== process.env.ADMIN_PASSWORD) {
			return res.status(401).json({ message: "ERROR", cause: "Incorrect Admin Password" });
		}
		user.isAdmin = true;
		await user.save();
		return res.status(200).json({ message: "OK", isAdmin: user.isAdmin });
	} catch (error: any) {
		console.error('Error updating user permissions:', error);
		res.status(500).send('Server error');
	}
};

// Reset User Progress
export const resetUserProgress = async (req: Request, res: Response) => {
	try {
		const { password } = req.body;
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "ERROR", cause: "Incorrect Password" });
		}
		user.exp = 0;
		user.level = 1;
		await user.save();
		const userProgress = await UserProgress.findOne({ user: user._id });
		if (userProgress) {
			await userProgress.deleteOne();
		}
		return res.status(200).json({ message: "OK", exp: user.exp, level: user.level, userProgress: userProgress });
	} catch (error: any) {
		console.error('Error resetting user progress:', error);
		res.status(500).send('Server error');
	}
};

// Reset User Progress(Admin Only)
export const resetUserProgressByUserId = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.params;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		user.exp = 0;
		user.level = 1;
		await user.save();
		const userProgress = await UserProgress.findOne({ user: user._id });
		if (userProgress) {
			await userProgress.deleteOne();
		}
		return res.status(200).json({ message: "OK", exp: user.exp, level: user.level, userProgress: userProgress });
	} catch (error: any) {
		console.error('Error resetting user progress:', error);
		res.status(500).send('Server error');
	}
};
