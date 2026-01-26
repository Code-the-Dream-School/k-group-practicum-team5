const getProfile = async (req, res) => {
    res.status(200).json({ msg: 'User profile fetched successfully', user: req.user });
}

const updateProfile = async (req, res) => {
    res.status(200).json({ msg: 'User profile updated successfully', user: req.user });
}
module.exports = {
    getProfile,
    updateProfile
};