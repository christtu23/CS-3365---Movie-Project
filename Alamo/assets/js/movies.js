// Movie data array
const movies = [
	{ title: "Wicked", rating: "⭐⭐⭐⭐⭐", link: "https://movie.com/wicked", imgSrc: "images/wicked.jpg" },
	{ title: "Moana 2", rating: "⭐⭐⭐⭐", link: "https://movie.com/moana2", imgSrc: "images/moana2.jpg" },
	{ title: "Gladiator II", rating: "⭐⭐⭐⭐", link: "https://movie.com/gladiatorII", imgSrc: "images/gladiator2.jpg" },
	{ title: "Red One", rating: "⭐⭐⭐⭐", link: "https://movie.com/redone", imgSrc: "images/redone.jpg" },
	{ title: "Best Christmas Pageant Ever", rating: "⭐⭐⭐⭐", link: "https://movie.com/bestchristmas", imgSrc: "images/bestchristmas.jpg" },
	{ title: "Heretic", rating: "⭐⭐⭐", link: "https://movie.com/heretic", imgSrc: "images/heretic.jpg" },
	{ title: "Venom: The Last Dance", rating: "⭐⭐⭐⭐", link: "https://movie.com/venomlastdance", imgSrc: "images/venomlastdance.jpg" },
	{ title: "A Real Pain", rating: "⭐⭐⭐⭐", link: "https://movie.com/arealpain", imgSrc: "images/arealpain.jpg" },
	{ title: "Conclave", rating: "⭐⭐⭐", link: "https://movie.com/conclave", imgSrc: "images/conclave.jpg" }
];

// Function to create movie cards
function loadMovies() {
	const moviesContainer = document.getElementById('movies');
	movies.forEach(movie => {
		const movieElement = document.createElement('div');
		movieElement.classList.add('movie');
		movieElement.innerHTML = `
			<a href="${movie.link}" target="_blank">
				<img src="${movie.imgSrc}" alt="${movie.title}" />
			</a>
			<h3>${movie.title}</h3>
			<div class="rating">${movie.rating}</div>
		`;
		moviesContainer.appendChild(movieElement);
	});
}
// Load movies when the page loads
window.onload = loadMovies;