/* Variables & References */
const express = require('express');
const Movie = require('../Models/Movie');
const Review = require('../Models/Review');
const router = express.Router();

//This route is fairly short so i won't create a controller for it


//Create A Review
router.post('/', async (req, res) =>{
    
    try {
        //Get Review Information
        const { movieId, userId, content, rating} = req.body;

        //Ensure we have valid info
        if(!movieId || !userId || !content || !rating){
            return res.status(400).json({message:"Fields are missing or invalid!"});
        }

        //Check For Valid movie
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        //Create Review
        const review = new Review({
            movie: movieId,
            user: userId, 
            content, 
            rating
        });

        //Save To database
        review.save();

        res.status(201).json({message:'Review succesfully uploaded!',review});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
})

//Get A Review
router.get('/:movieId', async (req, res) =>{
    
    try {
        //Get Review Information
        const { movieId} = req.params;

        //Fetch all review with movie id
        const reviews = await Review.find({movie:movieId}).populate('user','name')
        res.status(200).json({reviews});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching review", error: error.message });
    }
})

module.exports = router