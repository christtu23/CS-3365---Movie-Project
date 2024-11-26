const express = require('express');
const router = express.Router();
const showtimesController = require('../controllers/showtimes');
const { default: mongoose } = require('mongoose');

// Create a new showtime
router.post('/', showtimesController.CreateShowtime);

// Get all showtimes
router.get('/', showtimesController.GetAllShowtimes);

// Get a single showtime by ID
router.get('/:id', showtimesController.GetShowtimeById);

// Update a showtime
router.put('/:id', showtimesController.UpdateShowtime);

// Delete a showtime
router.delete('/:id', showtimesController.DeleteShowtime);

// Get showtimes by a specific movie and date
router.get('/movie/:movieId/date/:date', async(req, res) =>{
    const {movieId, date} = req.params;
    if(!mongoose.Types.ObjectId.isValid(movieId)){
        return res.status(400).json({ message: '[X][MBS]: Invalid movie ID' });
    }
    
    showtimesController.GetShowtimesByMovieAndDate(req,res);
});

// Book a seat
router.post('/book', showtimesController.BookSeat);

module.exports = router;