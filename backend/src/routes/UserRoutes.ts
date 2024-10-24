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
    changeName,
    getUserProgress,
    updateUserAvatar,
    updateUsertoAdmin,
    updateUserLevel,
    addUserExp,
    resetUserProgress,
} from '../controllers/UserController.js';

const UserRoutes = express.Router();

// Get All Users
UserRoutes.get("/", getAllUser);

// Sign Up
UserRoutes.post("/sign-up", validate(signUpValidator), postSignUp);

// Verify User Status
UserRoutes.get("/auth-status", verifyToken, verifyUserStatus);

// Login
UserRoutes.post("/login", validate(loginValidator), postLoginUser);

// Logout
UserRoutes.post("/logout", verifyToken, logoutUser);

// Check Password
UserRoutes.post("/my-page", verifyToken, checkPassword);

// Change Password
UserRoutes.post("/change-password", verifyToken, changePassword);

// Change Name
UserRoutes.post("/change-name", verifyToken, changeName);

// Get User Progress
UserRoutes.get("/user-progress", verifyToken, getUserProgress);

// Update User Avatar
UserRoutes.post("/update/user-avatar", verifyToken, updateUserAvatar);

// Update User to Admin
UserRoutes.post("/update/user-to-admin", verifyToken, updateUsertoAdmin);

// Update User Level
UserRoutes.post("/update/user-level", verifyToken, updateUserLevel);

// Add User EXP
UserRoutes.post("/update/user-exp", verifyToken, addUserExp);

// Reset User Progress
UserRoutes.post("/reset", verifyToken, resetUserProgress);

export default UserRoutes;