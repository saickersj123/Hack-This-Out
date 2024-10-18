import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

const jwtSecret: string = config.jwtSecret;

// GET all user information
export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// POST user signup
export const postSignUp = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array()
        });
        return;
    }

    const { name, user_id, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
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

        // Return JSON Web Token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload,
            jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token
                });
            });
    } catch(err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// GET logged-in user
export const getLoginUser = async (req: Request, res: Response): Promise<void> => {
    const reqUser = (req as any).user;
    if (!reqUser || !reqUser.id) {
        res.status(401).json({ msg: 'Unauthorized' });
        return;
    }

    const user = await User.findById(reqUser.id).select('-password');

    if (!user) {
        res.status(404).json({ msg: 'User not found' });
        return;
    }

    res.json({
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        date: user.date,
        exp: user.exp
    });
};

// POST user login
export const postLoginUser = async (req: Request, res: Response): Promise<void> => {
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
        // Return JSON Web Token
        const payload = {
            user: {
                id: user.id
            }
        };
        // Create token and save to cookie
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 7200 });

        if (!jwtSecret) {
            res.status(500).json({ msg: 'JWT secret is missing' });
            return;
        }
        
        user.token = token;
        await user.save();

        res.cookie("token", token, { httpOnly: true });
        res.json({ token });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
