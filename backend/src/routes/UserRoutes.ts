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
    updateUserAvatar,
    updateUsertoAdmin,
    updateUserLevel,
    addUserExp,
    resetUserProgress,
    getUserProgressByUserId,
    resetUserProgressByUserId,
    resetPassword,
    getLeaderboard,
    deleteUserByUserId,
    deleteUser,
    getUserDetail,
    getUserDetailByUserId,
    makeUserAdmin,
    checkAdminPassword,
    makeAdminToUser,
} from '../controllers/UserController.js';

const UserRoutes = express.Router();

// Get All Users(Admin Only)
UserRoutes.get("/", verifyToken, verifyAdmin, getAllUser);

// Get User Detail(User Only)
UserRoutes.get("/detail", verifyToken, getUserDetail);

// Get User Detail by user_id(Admin Only)
UserRoutes.get("/detail/:user_id", verifyToken, verifyAdmin, getUserDetailByUserId);

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

// Delete User
UserRoutes.delete("/:user_id", verifyToken, deleteUser);

// Update User Avatar
UserRoutes.post("/update/avatar", verifyToken, updateUserAvatar);

// Update User to Admin
UserRoutes.post("/update/to-admin", verifyToken, updateUsertoAdmin);

// Update User Level(Admin Only)
UserRoutes.post("/update/:user_id/level", 
    verifyToken, 
    verifyAdmin,
    updateUserLevel 
);

// Add User EXP(Admin Only)
UserRoutes.post("/update/:user_id/exp", 
    verifyToken, 
    verifyAdmin,
    addUserExp
);

// Reset User Progress
UserRoutes.post("/reset", verifyToken, resetUserProgress);

// Get User Progress by User ID(Admin Only)
UserRoutes.get("/progress/:user_id", 
    verifyToken, 
    verifyAdmin,
    getUserProgressByUserId
);

// Reset User Progress by User ID(Admin Only)
UserRoutes.post("/reset/:user_id", 
    verifyToken, 
    verifyAdmin,
    resetUserProgressByUserId
);

// Delete User by User ID(Admin Only)
UserRoutes.delete("/:user_id", 
    verifyToken, 
    verifyAdmin, 
    deleteUserByUserId
);

// Get Leaderboard
UserRoutes.get("/leaderboard", verifyToken, getLeaderboard);

// Check Admin Password(Admin Only)
UserRoutes.post("/verify-admin", verifyToken, verifyAdmin, checkAdminPassword);

// Make User Admin by User ID(Admin Only)
UserRoutes.post("/:user_id/to-admin", verifyToken, verifyAdmin, makeUserAdmin);

// Make Admin to User by User ID(Admin Only)
UserRoutes.post("/:user_id/to-user", verifyToken, verifyAdmin, makeAdminToUser);

export default UserRoutes;