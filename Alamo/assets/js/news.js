let currentSlide = 0;
const slides = document.querySelectorAll("#intro .carousel-slide");

function changeSlide(n) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

// Optional: Auto Slide Change Every 3 seconds (instead of 5)
setInterval(() => {
    changeSlide(1);
}, 3000);  // Change interval to 3000 milliseconds (3 seconds)