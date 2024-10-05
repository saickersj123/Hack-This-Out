import { validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import config from '../config/config.js';

const jwtSecret = config.jwtSecret;

// 전체 회원 정보 GET
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// 회원가입 POST
export const postSignUp = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name, user_id, email, password } = req.body;

    try {
        // 유저가 존재하는지 체크
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User is already exits'
                }]
            });
        }
        // 유저가 아바타(프로필 사진)
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        user = new User({
            name,
            user_id,
            email,
            avatar,
            password
        })
        // 비밀번호를 encrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // jsonwebtoken return
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,
            jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token
                })
            });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// 로그인 유저 GET
export const getLoginUser = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');

    res.json({
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        date: user.date,
        exp: user.exp
    })
};

// 로그인 POST
export const postLoginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { user_id, password } = req.body;
    try {
        let user = await User.findOne({ user_id });
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'User is not exits'
                }]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Passwords do not match'
                }]
            });
        }
        // jsonwebtoken return
        const payload = {
            user: {
                id: user.id
            }
        }
        //토큰을 생성하여 쿠키에 저장
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 7200 });

        if (!jwtSecret) {
            return res.status(500).json({ msg: 'JWT secret is missing' });
        }
        
        user.token = token;
        user.save();

        res.cookie("token", token);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error1');
    }
};

