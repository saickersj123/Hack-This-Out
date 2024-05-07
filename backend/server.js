const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
connectDB();

app.use(cors());
app.use(cookieParser());

// 루트 경로에 대한 응답
app.get('/', (req, res) => res.send('API is running'));

// JSON 파싱 미들웨어 추가
app.use(express.json({ extended: false }));

// '/api/user' 등의 경로에 대한 요청을 각각의 라우터로 라우팅
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

// 서버 시작
app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));