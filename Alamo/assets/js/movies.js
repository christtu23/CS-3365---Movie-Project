// Movie data array
const movies = [
    { title: "Wicked", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/wicked.jpeg" },
    { title: "Moana 2", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/moana2.jpeg" },
    { title: "Mufasa: The Lion King (Coming Soon)", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/mufasa.jpeg" },
    { title: "Elf", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/elf.jpeg" },
    { title: "The Polar Express", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/polarexpress.jpeg" },
    { title: "Home Alone", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/homealone.jpeg" },
    { title: "The Grinch", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/thegrinch.jpeg" },
    { title: "Christmas Vacation", rating: "⭐⭐⭐⭐⭐", imgSrc: "assets/css/images/christmasvacation.jpg" }
];

// Function to create movie cards
function loadMovies() {
    const moviesContainer = document.getElementById('movies');
<<<<<<< Updated upstream
    movies.forEach((movie, index) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <a href="movie.html?id=${index}">
                <img src="${movie.imgSrc}" alt="${movie.title}" />
=======
    try{
        const movies = await getMovies(); //-> Fetch movies from backend
        console.log("[O][MBS-Front]: Fetching movies from API...")
        console.log(movies)
        console.log(movies.movies)
        movies.movies.forEach((movie,index) => {
            console.log(movie)
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie')
            const movieImage = `assets/css/images/${movie.title}.jpeg` || `assets/css/images/${movie.title}.png` ; // Placeholder image
            const movieRating = movie.rating || "⭐⭐⭐⭐⭐"; // Default rating

            movieCard.innerHTML = `
            <a href="movie.html?id=${movie._id}">
                <img src="${movieImage}" alt="${movie.title}" />
>>>>>>> Stashed changes
            </a>
            <h3>${movie.title}</h3>
            <div class="rating">${movie.rating}</div>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

// Load movies when the page loads
window.onload = loadMovies;
