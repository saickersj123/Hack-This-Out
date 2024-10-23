import express from 'express';
import {verifyToken} from '../middlewares/Token.js';
import { validate, signUpValidator, loginValidator} from '../middlewares/Validators.js';
import {
    getAllUser,
    postSignUp,
    postLoginUser,
    verifyUserStatus,
    checkPassword,
    logoutUser,
    changePassword,
    getUserProgress,
    changeName,
} from '../controllers/UserController.js';

const UserRoutes = express.Router();

UserRoutes.get("/", getAllUser);

UserRoutes.post("/sign-up", validate(signUpValidator), postSignUp);

UserRoutes.get("/auth-status", verifyToken, verifyUserStatus);

UserRoutes.post("/login", validate(loginValidator), postLoginUser);

UserRoutes.post("/logout", verifyToken, logoutUser);

UserRoutes.post("/my-page", verifyToken, checkPassword);

UserRoutes.post("/change-password", verifyToken, changePassword);

UserRoutes.post("/change-name/:userId", verifyToken, changeName);

UserRoutes.get("/progress/:userId", verifyToken, getUserProgress);

export default UserRoutes;