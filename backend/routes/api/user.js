const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


router.get('/', async (req, res) => {
    try {
        // 모든 유저 데이터를 가져옴
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Server error', success: false });
    }
});

// 모든 유저의 exp 필드를 소급 적용하는 라우트
router.put('/update-exp', async (req, res) => {
    try {
        // exp 필드가 없는 유저를 찾아 exp 필드를 0으로 설정
        const result = await User.updateMany(
            { exp: { $exists: false } }, // exp 필드가 없는 유저만 업데이트
            { $set: { exp: 0 } }         // exp 필드를 0으로 설정
        );

        res.json({
            message: `${result.nModified} users updated with default exp value.`,
            success: true
        });
    } catch (err) {
        console.error('Error updating exp for users:', err);
        res.status(500).json({ message: 'Server error', success: false });
    }
});

router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('user_id', 'ID is required').not().isEmpty(),
    check('password', 'please enter a password with 8 or more').isLength({
        min: 8,
    }),
    check('email', 'Please enter your email').isEmail()
],
async (req, res) => {
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
            config.get('jswtSecret'),
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
});

module.exports = router