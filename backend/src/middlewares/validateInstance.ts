import Instance from '../models/Instance.js';

const validateInstance = async (req, res, next) => {
  const { instanceId } = req.params;
  const userId = req.user.id;

  try {
    const instance = await Instance.findOne({ instanceId, user: userId });
    if (!instance) {
      return res.status(404).json({ msg: 'Instance not found or unauthorized' });
    }

    // Attach instance to request object for further use if needed
    req.instance = instance;
    next();
  } catch (error) {
    console.error('Error validating instance ownership:', error);
    res.status(500).send('Server error');
  }
};

export default validateInstance;