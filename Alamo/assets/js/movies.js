import { getMovies, getReviews, postReview } from "./api.js";
// Movie data array
// const movies = [
//     { title: "Wicked", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/wicked.jpeg" },
//     { title: "Moana 2", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/moana2.jpeg" },
//     { title: "Mufasa: The Lion King (Coming Soon)", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/mufasa.jpeg" },
//     { title: "Elf", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/elf.jpeg" },
//     { title: "The Polar Express", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/polarexpress.jpeg" },
//     { title: "Home Alone", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/homealone.jpeg" },
//     { title: "The Grinch", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/thegrinch.jpeg" },
//     { title: "Christmas Vacation", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/christmasvacation.jpg" }
// ];



// Function to create movie cards
async function loadMovies() {
    const moviesContainer = document.getElementById('movies');
    try{
        const movies = await getMovies(); //-> Fetch movies from backend
        console.log("[O][MBS-Front]: Fetching movies from API...")
        console.log(movies)
        console.log(movies.movies)
        for(const movie of movies.movies) {
            console.log(movie)
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie')
            const movieImage = `assets/css/images/${movie.title}.jpeg` || `assets/css/images/${movie.title}.png`;

            //Calculate Reviews
            const reviews = await getReviews(movie._id);
            let averageRating = "No reviews yet.";
            if (reviews.reviews && Object.keys(reviews.reviews).length > 0) {
                const ratings = Object.values(reviews.reviews).map((review) => review.rating);
                const total = ratings.reduce((sum, rating) => sum + rating, 0);
                const avg = total / ratings.length;
                averageRating = `⭐`.repeat(Math.round(avg));
            }

            //Movie Card Element
            movieCard.innerHTML = `
            <a href="#" data-movie-id="${movie._id}">
                <img src="${movieImage}" alt="${movie.title}" />
            </a>
            <h3>${movie.title}</h3>
            <div class="rating">${averageRating}</div>`
            ;
            //Add review listener
            movieCard.querySelector('a').addEventListener('click', (event) => {
                event.preventDefault();
                handleReviewSection(movie._id)
            });
            moviesContainer.appendChild(movieCard);
            console.log("[+][MBS-Front]: Movie Fetched: : ",movie.title)
        };
    }catch(err)
    {
        console.log("[X][MBS-Front]: Failed to Fetch Movies")
        console.log("[X][MBS-Front]: %s",err.message)
    }
    
}

async function handleReviewSection(movieId) {
    const reviewSection = document.getElementById('review-section');
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');

    reviewSection.style.display = 'block'; // Show the review section
    reviewsList.innerHTML = '<li>Loading reviews...</li>'; // loading message

    try {
        // Fetch reviews for the movie
        const reviews = await getReviews(movieId);
        reviewsList.innerHTML = ''; // Clear existing reviews, so we don't get overlaps

        let reviewsArray = Object.values(reviews.reviews)

        if (reviewsArray.length === 0) {
            reviewsList.innerHTML = '<li>No reviews yet.</li>';
        } else {
            reviewsArray.forEach((review) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${review.user.name}:</strong> 
                    <span>${'⭐'.repeat(review.rating)}</span>
                    <p>${review.content}</p>
                `;
                reviewsList.appendChild(listItem);
            });
        }
    } catch (err) {
        console.error("Failed to load reviews:", err.message);
        reviewsList.innerHTML = '<li>Error loading reviews.</li>';
    }

    // Handle review submission
    reviewForm.onsubmit = async (event) => {
        event.preventDefault();

        const content = document.getElementById('review-content').value;
        const rating = document.getElementById('review-rating').value;
        const userId = localStorage.getItem('userId'); // Assuming the user is logged in and their ID is stored

        try {
            await postReview({ movieId, userId, content, rating });
            alert('Review submitted!');
            handleReviewSection(movieId); // Refresh reviews
        } catch (err) {
            console.error("Failed to submit review:", err.message);
            alert('Error submitting review.');
        }
    };
}
// Load movies when the page loads
window.onload = loadMovies;
