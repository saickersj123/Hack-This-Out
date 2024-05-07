const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {auth} = require('../../middleware/auth');
const User = require('../../model/User');
//const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


router.get('/', auth, async (req, res) => {
    /*try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }*/
    res.json({
        success: "true"
    })
    /*
    res.status(200).json({
        _id: req.user._id,
        // 0> 일반 유저 ^ 나머지 관리자
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
      });*/
});

router.post('/',
    [
        check('user_id', 'please enter your ID').not().isEmpty(),
        check('password', 'please enter a password with 8 or more').exists()
    ],
    async (req, res) => {
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

            /*user.generateToken((err, user) => {

                if (err) return res.status(400).send(err);
                //토큰을 저장한다. where? 쿠키 OR 로컬 스토리지 OR 세션스토리지
                //쿠키 name : value
                res
                  .cookie("x_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: "true", userId: user.user_id });
                
               console.log("aaaaa");

              });*/

            //토큰을 생성하여 쿠키에 저장
            jwt.sign(payload,
                config.get('jswtSecret'),
                // { expiresIn: 60000 },
                (err, token) => {
                    if (err) throw err;
                    
                    user.token = token;
                    user.save();

                    res
                        .cookie("x_auth", token,{
                            path: '/',
                            httpOnly: true
                        })
                        .json({ token });
                        //.json({ loginSuccess: "true", userId: user.user_id });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error1');
        }
    }
);

module.exports = router