import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js"; 
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

const createUser = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || !password) {
        throw new Error("Please fill all the inputs!");
    }

    const userExists = await User.findOne({email});
    if(userExists) {
        return res.status(400).send("User already exists!");
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username, 
            email: newUser.email, 
            isAdmin: newUser.isAdmin, 
        });
    } catch (error) {
        return res.status(400).message({ message: "Invalid user data!" });
        //throw new Error("Invalid user data!"); 
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username, 
                email: existingUser.email, 
                isAdmin: existingUser.isAdmin, 
            });
            return ;// Exit the function after sending the response
        }
    }

});

const logoutCurrentUser = asyncHandler(async (req,res) => {
    res.cookie("jwt","",{
        httyOnly: true,
        expires: new Date(0),
    });

    return res.status(200).json({ message: "Logged Out Succesfully!"});
});

const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error("User not found :( ");
    }
});

const updateCurrentUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found :( ");
    }
});

const deleteUserById = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            return res.status(400).message({ message: "Cannot Delete Admin User "});
        }

        await User.deleteOne({_id: user._id});
        res.json({ message: "User Removed "});
    } else {
        res.status(404);
        throw new Error("User not found :( ");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if(user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found :( ");
    }
});

const updateUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found :( ");
    }
});

// Forgot Password Controller
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    await user.save();

    // Create reset URL
    const resetUrl = `${req.protocol}://localhost:5173/reset-password/${resetToken}`;
    
    // Send email
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message: `You are receiving this email because you (or someone else) has requested a password reset. Please click the link to reset your password: ${resetUrl}`
        });

        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(500);
        throw new Error('Email could not be sent');
    }
});

// Reset Password Controller
const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export {
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
};