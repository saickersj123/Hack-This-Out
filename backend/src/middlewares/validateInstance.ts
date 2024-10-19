import { Request, Response, NextFunction } from 'express';
import Instance from '../models/Instance.js';
import User from '../models/User.js';

const validateInstance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { instanceId } = req.params;

    // Check if jwtData exists
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res.status(401).json({ msg: 'Unauthorized: Missing JWT data' });
    }

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized: User not found' });
    }

    const instance = await Instance.findOne({ instanceId, user: user._id });
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found or unauthorized' });
    }

    // Attach instance to request object for further use if needed
    (req as any).instance = instance;
    next();
  } catch (error) {
    console.error('Error validating instance ownership:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default validateInstance;
