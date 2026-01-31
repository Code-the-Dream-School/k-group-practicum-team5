const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.userId === id) {
            return res.status(400).json({ msg: "Admins cannot delete their own account" });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete user" });
    }
};
const makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { role: "admin" }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (user.is_admin) {
            return res.status(400).json({ msg: "User is already an admin" });
        }
        user.is_admin = true;
        await user.save();
        res.status(200).json({
            msg: "User role updated to admin",
            user: {
                id: user._id,
                email: user.email,
                is_admin: user.is_admin
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update user role" });
    }
};
module.exports = {
    getAllUsers,
    deleteUser,
    makeAdmin
};
