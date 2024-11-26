/* Variables & References */
const express = require('express');
const router = express.Router();

const { getMovies, addMovie, getMovieById, deleteMovie, updateMovie } = require('../Controllers/MovieController');

//TODO: Search Parameters add to controller headers

/* Movies API */
router.get('/', getMovies); //--> GetAll
router.get('/:id', getMovieById); //--> GetId
router.post('/', addMovie); //--> AddMovie
router.delete("/:id",deleteMovie); //--> DeleteMovie
router.put('/:id',updateMovie) //--> UpdateMovie


module.exports = router;