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
    validate: {
      validator: function(v) {
        return /^(\d{1,3}\.){3}\d{1,3}$/.test(v);
      },
      message: props => `${props.value} is not a valid IP address!`,
    },
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
  runningTime: {
    type: Date,
    default: null,
  },
  activeContests: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Contest',
    default: [],
  },
});

const Instance = mongoose.model('Instance', InstanceSchema);

export default Instance;