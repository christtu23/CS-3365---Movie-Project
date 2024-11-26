/* Variables & References */
const express = require('express');
const router = express.Router();
const { CreateTheatre, GetAllTheatres, GetTheatreById,UpdateTheatre,DeleteTheatre } = require('./Controllers/TheatreController');

//Create Theatre
router.post('/', CreateTheatre);

//Get All Theatres
router.get('/', GetAllTheatres);

//Get Theatre By Id
router.get('/', GetTheatreById);

//Update Theatre
router.put('/:id', UpdateTheatre)

//Delete Theatre
router.delete('/:id', DeleteTheatre)

