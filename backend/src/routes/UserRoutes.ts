import express from 'express';
import {verifyToken} from '../middlewares/Token.js';
import { verifyAdmin } from '../middlewares/Admin.js';
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
    getUserProgressByUserId,
    resetUserProgressByUserId,
    resetPassword,
    getLeaderboard,
} from '../controllers/UserController.js';

const UserRoutes = express.Router();

// Get All Users(Admin only)
UserRoutes.get("/", verifyToken, verifyAdmin, getAllUser);

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

// Reset Password
UserRoutes.post("/reset-password/:user_id", verifyToken, resetPassword);

// Get User Progress
UserRoutes.get("/progress", verifyToken, getUserProgress);

// Update User Avatar
UserRoutes.post("/update/avatar", verifyToken, updateUserAvatar);

// Update User to Admin
UserRoutes.post("/update/to-admin", verifyToken, updateUsertoAdmin);

// Update User Level(Admin Only)
UserRoutes.post("/update/:user_id/level", 
    verifyToken, 
    verifyAdmin,
    updateUserLevel);

// Add User EXP(Admin Only)
UserRoutes.post("/update/:user_id/exp", 
    verifyToken, 
    verifyAdmin,
    addUserExp);

// Reset User Progress
UserRoutes.post("/reset", verifyToken, resetUserProgress);

// Get User Progress by User ID(Admin Only)
UserRoutes.get("/progress/:user_id", 
    verifyToken, 
    verifyAdmin,
    getUserProgressByUserId);

// Reset User Progress by User ID(Admin Only)
UserRoutes.post("/reset/:user_id", 
    verifyToken, 
    verifyAdmin,
    resetUserProgressByUserId);

// Get Leaderboard
UserRoutes.get("/leaderboard", verifyToken, getLeaderboard);


export default UserRoutes;