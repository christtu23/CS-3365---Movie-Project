/* Variables & References */
const express = require('express');
const router = express.Router();

const { getMovies, addMovie, getMovieById, deleteMovie } = require('../Controllers/MovieController');

//TODO: Search Parameters add to controller headers

/* Movies API */
router.get('/', getMovies); //--> Returns a list of movies
router.get('/:id', getMovieById); //--> Returns a specific movie by id
router.post('/', addMovie); //--> takes In a Json and adds a movie to the database
router.delete("/:id",deleteMovie); //--> Deletes a specific movie given id


module.exports = router;