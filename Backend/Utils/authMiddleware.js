const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "[X][MBS]: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if(!user){return res.status(401).json({ message: "[X][MBS]: User not found" });}

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "[X][MBS]: Invalid token" });
    }
};

module.exports = authMiddleware;