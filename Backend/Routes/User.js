const express = require('express');
const userController = require('../Controllers/UserController');
const authMiddleware = require('../Utils/authMiddleware');
const router = express.Router();

//Register User Account
router.post('/register', userController.register);
//Login To User Account
router.post('/login', userController.login);
//Returns Profile (Requires Authenticaiton Token)
router.get('/profile', authMiddleware, userController.getProfile);
//Returns all the users bookings (Requires Authenticaiton Token)
router.get('/bookings', authMiddleware, userController.getBookingsForUser);
//Updates Profile (Requires Authenticaiton Token)
router.put('/profile', authMiddleware, userController.updateProfile);
//Book A Seat (Requires Authenticaiton Token)
router.post('/book', authMiddleware, userController.addBooking);


module.exports = router;