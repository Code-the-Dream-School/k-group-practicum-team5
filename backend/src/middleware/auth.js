const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Unauthorized' })
    }

    try {
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // const user = await User.findById(payload.userId).select('-password')
        req.user = {
            userId: payload.userId,
            email: payload.email,
            is_admin: payload.is_admin
        }
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized' })
    }
}
module.exports = auth