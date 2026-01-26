

const admin = async (req, res, next) => {
    if (!req.user || !req.user.is_admin) {
        return res.status(403).json({ msg: 'Forbidden: Admins only' })
    }
    next()
}
module.exports = admin