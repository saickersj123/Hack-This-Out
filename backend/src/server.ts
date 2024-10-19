import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/UserRoutes.js";
import InstRoutes from "./routes/InstRoutes.js";
import MachineRoutes from './routes/MachineRoutes.js';

const app = express();

connectDB();

app.use(cors({
    //origin: "http://localhost:3000", //for local test
    origin: "https://app.hackthisout.o-r.kr", //for production
    credentials: true
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
// 루트 경로에 대한 응답
app.get('/', (req, res) => res.send('API is running'));

// JSON 파싱 미들웨어 추가
app.use(express.json());

// '/api/user' 등의 경로에 대한 요청을 각각의 라우터로 라우팅
app.use('/api/user', userRoutes);
app.use('/api/inst', InstRoutes);
app.use('/api/machines', MachineRoutes);


const PORT = process.env.PORT || 5000;

// 서버 시작
app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));