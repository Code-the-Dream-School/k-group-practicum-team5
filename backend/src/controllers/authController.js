const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

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

module.exports = { register };