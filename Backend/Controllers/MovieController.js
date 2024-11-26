/* Movies Controller -> Contains API Function Logic */

const Movie = require("../Models/Movie");

//--> Get All Movies
const getMovies = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.status(200).json(movies)
    }catch(error){
        res.status(500).json({ message: '[X][MBS]: Error Fetching Movies', error: error.message });
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

//--> Add New Movie
const addMovie = async (req, res) => {
    const { title, description, releaseDate, genre, ticketprice} = req.body;
    console.log(req.body)
    try{
        const newMovie = new Movie({title, description, releaseDate, genre, ticketprice});
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

module.exports = { getMovies, addMovie, getMovieById, deleteMovie };