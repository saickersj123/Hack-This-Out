const User = require('../model/User.js');
const config = require('config');
const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {
    //인증 처리를 하는 곳

    //1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    console.log(token)

    if (!token){
        return res.status(401).json({
            msg: "No token, authorization is denied"
        });
    }
    try {
        const decoded = jwt.verify(token, config.get('jswtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }

//     //2. 토큰을 복호화한다 > 유저를 찾는다.
//     User.findByToken(token, (err, user) => {
//     if (err) throw err;
//     if (!user) return res.json({ isAuth: false, error: true });

//     req.token = token;
//     req.user = user;
//     next();
//     });
//     //3. 2조건 만족시 Okay

//     //4. 2조건 불만족시 NO
};

module.exports = { auth };