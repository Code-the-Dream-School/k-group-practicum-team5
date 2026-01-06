const User = require('../models/User');
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const register = async (req, res) => {
    if (req.body.password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.status(201).json({ msg: 'user created' });
};

module.exports = { register };