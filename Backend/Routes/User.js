const express = require('express');
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/authMiddleware'); // Middleware to verify JWT
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.post('/book', authMiddleware, userController.addBooking);

module.exports = router;