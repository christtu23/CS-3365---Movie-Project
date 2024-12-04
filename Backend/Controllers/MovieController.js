/* Movies Controller -> Contains API Function Logic */

const Movie = require("../Models/Movie");

//--> Get All Movies
const getMovies = async (req, res) => {
    const { genre, director, releaseDate, releaseDateRange, search, limit = 10, page = 1 } = req.query;
    
    try {
        // Construct the query object for filtering
        const query = {};

        // Filter by genre if specified
        if (genre) query.genre = genre;

        // Filter by director if specified
        if (director) query.director = { $regex: director, $options: 'i' }; // Case-insensitive match

        // Filter by exact release date if specified (e.g., '2024-11-01')
        if (releaseDate) query.releaseDate = new Date(releaseDate);

        // Filter by a range of release dates if specified (e.g., '2024-01-01,2024-12-31')
        if (releaseDateRange) {
            const [startDate, endDate] = releaseDateRange.split(',');
            query.releaseDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Search for movies where the title or description matches the search term
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Pagination setup: Limit and Skip (for pagination)
        const movies = await Movie.find(query)
            .limit(parseInt(limit)) // Limit results per page
            .skip((parseInt(page) - 1) * parseInt(limit)) // Skip results based on page number
            .sort({ releaseDate: -1 }); // Sort by most recent release date

        // Count total movies matching the filter criteria (for pagination)
        const totalMovies = await Movie.countDocuments(query);

        // Return movies with pagination details
        res.json({
            totalMovies,
            totalPages: Math.ceil(totalMovies / limit),
            currentPage: parseInt(page),
            movies
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

//--> Get Specific Movie
const getMovieById = async (req, res) => {
    try{
        const targetMovie = await Movie.findById(req.params.id);
        if(!targetMovie){return res.status(404).json({message:"[X][MBS]: Movie Not Found"})}
        res.status(200).json(targetMovie)
    }catch(error){
        res.status(500).json({ message: '[X][MBS]: Error Fetching Movies', error: error.message });
    }
};

//--> Update A Movie
const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedData = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, { new: true }); // Update and return updated movie

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie updated successfully!", movie: updatedMovie });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating movie", error: err.message });
    }
};

//--> Add New Movie
const addMovie = async (req, res) => {
    const { title, description, releaseDate, genre, director, cast} = req.body;
    console.log(req.body)
    try{
        const newMovie = new Movie({title, description, releaseDate, genre, director, cast});
        await newMovie.save();
        res.status(201).json(newMovie);
    }catch(error){
        res.status(400).json({ message: '[X][MBS]: Error Adding Movie', error: error.message });
    }

};

//--> Delete A Movie
const deleteMovie = async(req, res) => {
    try{
        const targetMovie = await Movie.findByIdAndDelete(req.params.id);
        if(!targetMovie){return res.status(404).json({message:"[X][MBS]: Movie Not Found"})}
        res.status(200).json({message:"[X][MBS]: Movie Deleted Succesfully"})
    }catch(error)
    {
        res.status(400).json({ message: '[X][MBS]: Error Removing Movie', error: error.message });
    }
}

module.exports = { getMovies, addMovie, getMovieById, deleteMovie, updateMovie };