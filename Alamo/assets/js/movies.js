import { getMovies } from "./api.js";

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
        movies.movies.forEach((movie,index) => {
            console.log(movie)
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie')
            const movieImage = movie.image || "assets/css/images/homealone.jpeg"; // Placeholder image
            const movieRating = movie.rating || "⭐⭐⭐⭐⭐"; // Default rating

            movieCard.innerHTML = `
            <a href="movie.html?id=${movie._id}">
                <img src="${movieImage}" alt="${movie.title}" />
            </a>
            <h3>${movie.title}</h3>
            <div class="rating">${movieRating}</div>`
            ;
            moviesContainer.appendChild(movieCard);
            console.log("[+][MBS-Front]: Movie Fetched: : ",movie.title)
        });
    }catch(err)
    {
        console.log("[X][MBS-Front]: Failed to Fetch Movies")
        console.log("[X][MBS-Front]: %s",err.message)
    }
    
}

// Load movies when the page loads
window.onload = loadMovies;
