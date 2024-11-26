const User = require('./models/User');
const jwt = require('jsonwebtoken');
const Showtime = require('./models/Showtime');

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login a user (I've passed a jwt token during creation, its important that the frontend keeps this and passes it as a header when sending requests)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user` is populated by middleware

        const user = await User.findById(userId).populate('bookings.showtime', 'movie theatre showDates');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user profile", error: err.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming `req.user` is populated by middleware
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating profile", error: err.message });
    }
};

// Add a booking to user
const addBooking = async (req, res) => {
    try {
        const { showtimeId, seatNumber } = req.body;
        const userId = req.user.id; // Assuming `req.user` is populated by middleware

        const showtime = await Showtime.findById(showtimeId);
        if (!showtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        const seat = showtime.seats.find(seat => seat.seatNumber === seatNumber);
        if (!seat || !seat.isAvailable) {
            return res.status(400).json({ message: "Seat is not available" });
        }

        // Mark the seat as booked and assign user
        seat.isAvailable = false;
        seat.user = userId;
        await showtime.save();

        // Add booking to user
        const user = await User.findById(userId);
        user.bookings.push({ showtime: showtimeId, seatNumber });
        await user.save();

        res.status(200).json({ message: "Booking successful", booking: { showtime, seatNumber } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding booking", error: err.message });
    }
};
module.exports = {register, login, getProfile, updateProfile, addBooking}