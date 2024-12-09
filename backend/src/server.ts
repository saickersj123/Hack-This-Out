import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import userRoutes from "./routes/UserRoutes";
import InstRoutes from "./routes/InstRoutes";
import MachineRoutes from './routes/MachineRoutes';
import ContestRoutes from './routes/ContestRoutes';

// **Import the Instance Cleanup Scheduler**
import './middlewares/instanceCleanup';

const app = express();

// DB Connection
connectDB();

// CORS Configuration
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

// Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Logger
app.use(morgan("dev"));

// Root Endpoint
app.get('/', (req, res) => res.send('API is running'));

// Middleware
app.use(express.json());
app.use(mongoSanitize());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/inst', InstRoutes);
app.use('/api/machines', MachineRoutes);
app.use('/api/contest', ContestRoutes);

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));