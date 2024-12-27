import express from "express";
import {
    createUser,
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    deleteUserById,
    getUserById,
    updateUserById,
    forgotPassword,
    resetPassword,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);

http://localhost:5000/api/users/auth
router
    .post("/auth", loginUser);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router
    .post("/logout", logoutCurrentUser);

router
    .route("/profile")
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile);

// Admin Routes
router
    .route("/:id")
    .delete( authenticate, authorizeAdmin, deleteUserById)
    .get( authenticate, authorizeAdmin, getUserById)
    .put( authenticate, authorizeAdmin, updateUserById);

export default router;