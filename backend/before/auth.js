const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');
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
    const user = await User.findById(req.user.id).select('-password');

    res.json({
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        date: user.date,
        exp: user.exp
    })
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

            //토큰을 생성하여 쿠키에 저장
            token = jwt.sign(payload, config.get('jswtSecret'), { expiresIn: 7200 })
            user.token = token;
            user.save();

            res.cookie("token", token);
            res.json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error1');
        }
    }
);

module.exports = router