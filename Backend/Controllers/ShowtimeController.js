/* Movies Controller -> Contains API Function Logic */

const Showtime = require("../Models/Showtime");

// Create a new showtime
const CreateShowtime = async (req, res) => {
    try {
        const {
            movie,
            theatre,
            Pricing,
            Language,
            showDates,
            seats,
            status
        } = req.body;

        const newShowtime = new Showtime({
            movie,
            theatre,
            Pricing,
            Language,
            showDates,
            seats,
            status
        });

        await newShowtime.save();
        res.status(201).json({ message: "Showtime created successfully!", showtime: newShowtime });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating showtime", error: err.message });
    }
};

// Get all showtimes
const GetAllShowtimes = async (req, res) => {
    try {
        const showtimes = await Showtime.find()
            .populate('movie', 'title') // Populate movie with its title
            .populate('theatre', 'name'); // Populate theatre with its name

        res.status(200).json(showtimes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching showtimes", error: err.message });
    }
};

// Get a single showtime by ID
const GetShowtimeById = async (req, res) => {
    try {
        const showtimeId = req.params.id;
        const showtime = await Showtime.findById(showtimeId)
            .populate('movie', 'title')
            .populate('theatre', 'name');

        if (!showtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        res.status(200).json(showtime);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching showtime", error: err.message });
    }
};

// Update a showtime
const UpdateShowtime = async (req, res) => {
    try {
        const showtimeId = req.params.id;
        const updatedData = req.body;

        const updatedShowtime = await Showtime.findByIdAndUpdate(
            showtimeId,
            updatedData,
            { new: true }
        )
            .populate('movie', 'title')
            .populate('theatre', 'name');

        if (!updatedShowtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        res.status(200).json({ message: "Showtime updated successfully!", showtime: updatedShowtime });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating showtime", error: err.message });
    }
};

// Delete a showtime
const DeleteShowtime = async (req, res) => {
    try {
        const showtimeId = req.params.id;

        const deletedShowtime = await Showtime.findByIdAndDelete(showtimeId);

        if (!deletedShowtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        res.status(200).json({ message: "Showtime deleted successfully!", showtime: deletedShowtime });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting showtime", error: err.message });
    }
};

// Get showtimes by a specific movie and date
const GetShowtimesByMovieAndDate = async (req, res) => {
    try {
        const { movieId, date } = req.params;

        const showtimes = await Showtime.find({
            movie: movieId,
            'showDates.date': new Date(date),
        })
            .populate('movie', 'title')
            .populate('theatre', 'name');

        res.status(200).json(showtimes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching showtimes", error: err.message });
    }
};

// Book a seat
const BookSeat = async (req, res) => {
    try {
        const { showtimeId, seatNumber } = req.body;
        const userId = req.user._id; // Assuming authenticated user ID is in req.user

        const showtime = await Showtime.findById(showtimeId);

        if (!showtime) {
            return res.status(404).json({ message: "Showtime not found" });
        }

        const seat = showtime.seats.find(seat => seat.seatNumber === seatNumber);

        if (!seat) {
            return res.status(404).json({ message: "Seat not found" });
        }

        if (!seat.isAvailable) {
            return res.status(400).json({ message: "Seat is already booked" });
        }

        // Update seat status and assign user
        seat.isAvailable = false;
        seat.user = userId;

        await showtime.save();

        res.status(200).json({ message: "Seat booked successfully!", showtime });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error booking seat", error: err.message });
    }
};

module.exports = {CreateShowtime, GetAllShowtimes, GetShowtimeById, UpdateShowtime, DeleteShowtime, GetShowtimesByMovieAndDate, BookSeat };