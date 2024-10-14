import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

import {
    getAllUser,
    postSignUp,
    getLoginUser,
    postLoginUser,
} from '../controller/UserController.js';

const UserRoutes = express.Router();

UserRoutes.get("/", getAllUser);

UserRoutes.post("/sign-up", [
    check('name', 'Name is required').not().isEmpty(),
    check('user_id', 'ID is required').not().isEmpty(),
    check('password', 'please enter a password with 8 or more').isLength({
        min: 8,
    }),
    check('email', 'Please enter your email').isEmail()
],
    postSignUp);

UserRoutes.get("/check-login", auth, getLoginUser);

UserRoutes.post("/login", [
    check('user_id', 'please enter your ID').not().isEmpty(),
    check('password', 'please enter a password with 8 or more').exists()
],
    postLoginUser);

export default UserRoutes;