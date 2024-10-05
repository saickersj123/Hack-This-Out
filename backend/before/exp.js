const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const config = require('config');

// MongoDB 연결 정보
const url = config.get('mongoURI');  // config 폴더에 있는 mongoURI를 가져옴
const dbName = 'yourDatabaseName';   // 사용할 데이터베이스 이름
const collectionName = 'users';      // 사용할 컬렉션 이름

// MongoDB 클라이언트 생성
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// '/api/user' 경로로 유저 데이터를 가져오는 API
router.get('/', async (req, res) => {
    try {
        // MongoDB 연결
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 모든 유저 데이터를 가져옴
        const users = await collection.find({}).toArray();

        // 유저 데이터를 JSON으로 응답
        res.json(users);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error' });
    } finally {
        // MongoDB 연결 해제
        await client.close();
    }
});

module.exports = router;
