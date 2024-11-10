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

const app = express();

//DB
connectDB();

//CORS
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

//Cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//Logger
app.use(morgan("dev"));

//Root
app.get('/', (req, res) => res.send('API is running'));

//Middleware
app.use(express.json());
app.use(mongoSanitize());

//Routes
app.use('/api/user', userRoutes);
app.use('/api/inst', InstRoutes);
app.use('/api/machines', MachineRoutes);
app.use('/api/contest', ContestRoutes);

const PORT = process.env.PORT || 5000;

//Server
app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));