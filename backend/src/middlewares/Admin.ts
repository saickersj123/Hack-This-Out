import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

/**
 * Middleware to verify if the user is an admin.
 */
export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.jwtData.id;
        const user = await User.findById(userId);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ msg: 'Access denied. Admins only.' });
        }
    } catch (error) {
        console.error('Error verifying admin:', error);
        res.status(500).send('Server error');
    }
};

