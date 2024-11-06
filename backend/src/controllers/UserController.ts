import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import User from '../models/User';
import UserProgress from '../models/UserProgress';
import { createToken } from '../middlewares/Token';
import { COOKIE_NAME } from '../middlewares/Constants';

const isProduction = process.env.MODE === 'production';

const getCookieOptions = () => {
	const options: any = {
	  path: '/',
	  httpOnly: true,
	  signed: true,
	  sameSite: isProduction ? 'none' : 'lax',
	  secure: isProduction,
	  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
	};
  
	if (isProduction && process.env.DOMAIN) {
	  options.domain = process.env.DOMAIN;
	}
  
	return options;
};

// GET all user information (Admin Only)
export const getAllUser = async (req: Request, res: Response) => {
    try {
		const users = await User.find().select('-password');
		return res.status(200).json({ message: "OK", users: users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
};

// GET user Detail(User Only)
export const getUserDetail = async (req: Request, res: Response) => {
    try {
		const userId = res.locals.jwtData.id;
        const user = await User.findById(userId).select('-password -isAdmin -createdAt -updatedAt -__v -_id');
        return res.status(200).json({ message: "OK", user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

// GET user Detail by user_id(Admin Only)
export const getUserDetailByUserId = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const user = await User.findOne({ user_id });
    return res.status(200).json({ message: "OK", user: user });
};

// POST user signup
export const postSignUp = async (req: Request, res: Response) => {
    const { name, user_id, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email, user_id, name });
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

		// Clear any existing token
        res.clearCookie(COOKIE_NAME, {
			path: '/',
			httpOnly: true,
			signed: true,
			sameSite: isProduction ? 'none' : 'lax',
			secure: isProduction,
			domain: process.env.DOMAIN,
		});

		// create token
		const token = createToken(user._id.toString(), user.email, "7d");

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, getCookieOptions());

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
        // Clear any existing token
        res.clearCookie(COOKIE_NAME, {
			path: '/',
			httpOnly: true,
			signed: true,
			sameSite: isProduction ? 'none' : 'lax',
			secure: isProduction,
			domain: process.env.DOMAIN,
		});

		// create token
		const token = createToken(user._id.toString(), user.email, "7d");

		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, getCookieOptions());

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

        // Clear any existing token
		res.clearCookie(COOKIE_NAME, {
			path: '/',
			httpOnly: true,
			signed: true,
			sameSite: isProduction ? 'none' : 'lax',
			secure: isProduction,
			domain: process.env.DOMAIN,
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
		const user = await User.findById(res.locals.jwtData.id).select('-password -date -updatedAt -__v -level -exp');

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
			.json({ message: "OK", user: user });
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
		const { oldPassword, newPassword } = req.body;
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

		const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
		if (!isPasswordCorrect) {
			return res.status(403).json({ message: "ERROR", cause: "Incorrect Password" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
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
		const isNameExist = await User.findOne({ name });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).json({ message: "ERROR", cause: "Permissions didn't match" });
		}
		if (name === user.name) {
			return res.status(401).json({ message: "ERROR", cause: "Name is the same as before" });
		}
		if (name.length > 10) {
			return res.status(401).json({ message: "ERROR", cause: "Name is too long" });
		}
		if (name.length < 3) {
			return res.status(401).json({ message: "ERROR", cause: "Name is too short" });
		}
		if (name.includes(' ')) {
			return res.status(401).json({ message: "ERROR", cause: "Name cannot contain spaces" });
		}
		if (isNameExist) {
			return res.status(401).json({ message: "ERROR", cause: "Name already taken" });
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

//reset user password
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.params;
		const { password } = req.body;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		await user.save();
		return res.status(200).json({ message: "OK", name: user.name, email: user.email });
	} catch (error: any) {
		console.error('Error resetting password:', error);
		res.status(500).send('Server error');
	}
}

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user_id = res.locals.jwtData.id;
		const { password } = req.body;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ msg: 'User not found.' });
			return;
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "ERROR", cause: "Incorrect Password" });
		}
		await user.deleteOne();
		return res.status(200).json({ message: "OK" });
	} catch (error: any) {
		console.error('Error deleting user:', error);
		res.status(500).send('Server error');
	}
};

// Delete user by user_id(Admin Only)
export const deleteUserByUserId = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.params;
		const user = await User.findById(user_id);
		if (!user) {
			res.status(404).json({ message: "ERROR", msg: 'User not found.' });
			return;
		}
		await user.deleteOne();
		return res.status(200).json({ message: "OK" });
	} catch (error: any) {
		console.error('Error deleting user:', error);
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
		const userProgress = await UserProgress.find({ user: user._id });
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
		if (user.isAdmin) {
			return res.status(401).json({ message: "ERROR", cause: "User already has admin permissions" });
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
		const userProgress = await UserProgress.findByIdAndDelete(user._id);
		if (!userProgress) {
			return res.status(404).json({ message: "ERROR", cause: "User progress not found." });
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
		const userProgress = await UserProgress.findByIdAndDelete(user._id);
		if (!userProgress) {
			return res.status(404).json({ message: "ERROR", cause: "User progress not found." });
		}
		return res.status(200).json({ message: "OK", exp: user.exp, level: user.level, userProgress: userProgress });
	} catch (error: any) {
		console.error('Error resetting user progress:', error);
		res.status(500).send('Server error');
	}
};

//Get Leaderboard
export const getLeaderboard = async (req: Request, res: Response) => {
	try {
		const users = await User.find().sort({ exp: -1 }).select('-password -isAdmin -email -createdAt -updatedAt -__v -_id');
		return res.status(200).json({ message: "OK", users: users });
	} catch (error: any) {
		console.error('Error getting leaderboard:', error);
		res.status(500).send('Server error');
	}
};

// Make User Admin by User ID(Admin Only)
export const makeUserAdmin = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.params;
		const user = await User.findById(user_id);
		if (!user) {
			res.status(404).json({ 
				message: "ERROR", 
				msg: "User not found." 
			});
			return;
		}
		user.isAdmin = true;
		await user.save();
		return res.status(200).json({ 
			message: "OK",
			name: user.name,
			user_id: user.user_id,
			isAdmin: user.isAdmin 
		});
	} catch (error: any) {
		console.error('Error promoting user to admin:', error);
		res.status(500).send('Server error');
	}
};

// Make Admin to User by User ID(Admin Only)
export const makeAdminToUser = async (req: Request, res: Response) => {
	try {
		const { user_id } = req.params;
		const user = await User.findOne({ user_id });
		if (!user) {
			res.status(404).json({ 
				message: "ERROR", 
				msg: "User not found." 
			});
			return;
		}
		user.isAdmin = false;
		await user.save();
		return res.status(200).json({ 
			message: "OK",
			name: user.name,
			user_id: user.user_id,
			isAdmin: user.isAdmin 
		});
	} catch (error: any) {
		console.error('Error demoting user from admin:', error);
		res.status(500).send('Server error');
	}
};

// Check Admin Password(Admin Only)
export const checkAdminPassword = async (req: Request, res: Response) => {
	try {
		const { adminPassword } = req.body;
		const user = await User.findById(res.locals.jwtData.id);
		if (!user) {
			res.status(404).json({ 
				message: "ERROR", 
				msg: "User not found." 
			});
			return;
		}
		if (adminPassword !== process.env.ADMIN_PASSWORD) {
			return res.status(401).json({ 
				message: "ERROR", 
				msg: "Incorrect Admin Password" 
			});
		}
		return res.status(200).json({ 
			message: "OK", 
			isAdmin: user.isAdmin 
		});
	} catch (error: any) {
		console.error('Error verifying user admin:', error);
		res.status(500).send('Server error');
	}
};

