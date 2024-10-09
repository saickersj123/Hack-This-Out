import mongoose from 'mongoose';

const InstanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  instanceId: {
    type: String,
    required: true,
    unique: true,
  },
  vpnIp: {
    type: String,
  },
  machineType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'stopped', 'terminated'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Instance = mongoose.model('Instance', InstanceSchema);

export default Instance;