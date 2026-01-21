const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const user = await User.create({
            first_name,
            last_name,
            email,
            password
        });

        const fullName = user.getName();
        const token = user.createJWT();

        res.status(201).json({
            user: {
                fullName,
                first_name: user.first_name,
                last_name: user.last_name
            },
            token
        });

    } catch (error) {
        console.error("Error during user registration:", error);
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: "Registration failed: Missing or invalid required fields."
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                error: "Registration failed: Email already exists."
            });
        }

        res.status(500).json({
            error: "Unexpected server error during registration."
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password" });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = user.createJWT();
        res.status(200).json({
            user: {
                id: user._id,
                fullName: user.getName(),
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                is_admin: user.is_admin
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: "Unexpected server error during login." });
    }

}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Please provide email" });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(200).json({ message: "If email is correct, you will receive a reset link to your email" });
        }
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const html = `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>This link expires in 10 minutes.</p>
    `;

        await sendEmail({
            to: user.email,
            subject: "Reset Your Password",
            html: `<a href="${resetURL}">Reset Password</a>`
        });
        console.log(`Password reset link (send this via email): ${resetURL}`);
        res.status(200).json({ message: "If email is correct, you will receive a reset link to your email" });

    } catch (error) {
        res.status(500).json({ error: "Unexpected server error during login. Please try again." });
    }

}



module.exports = { register, login, forgotPassword };