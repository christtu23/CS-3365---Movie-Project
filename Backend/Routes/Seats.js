/* Variables & References */
const express = require('express');
const Showtime = require('../Models/Showtime');
const router = express.Router();


// Backend route to fetch available seats
router.get('/', async (req, res) => {
    const { movieId, showtimeDate, startTime } = req.query;

    // Fetch showtime and seats from the database
    const showtime = await Showtime.findOne({ 
        movie: movieId, 
        'showDates.date': showtimeDate, 
        'showDates.times.startTime': startTime
    }).populate('seats');

    if (!showtime) {
        return res.status(404).json({ message: 'Showtime not found' });
    }

    // Extract available seats
    const availableSeats = showtime.seats.filter(seat => seat.isAvailable);
    res.json({ seats: availableSeats });
});

module.exports = router;