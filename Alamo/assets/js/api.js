/*
    This is script will hold all our logic to communicate with our backend 
    api, it handles requesting information and the accompanied response. We don't use this directly
    in most cases. The app.js will hold most of our logic/listeners and otherwise
/*


/*----------------[UTILITY FUNCTIONS]----------------*/
import { CONFIG } from "./config.js"

async function handleResponse(response) {
    if (response.ok) {
        return await response.json();
    } else {
        const errorInfo = await response.json();
        throw new Error('[X][MBS-FrontEnd]: An Error Occurred ' + errorInfo.message);
    }
}

//We make all requests from here as a easy way to consolidate logic, like passing the auth token
async function makeRequest(endpoint, method = "GET", data = null, token = null) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };
    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${CONFIG.BACKEND_URL}${endpoint}`, options);
    return handleResponse(response);
}

/*----------------[USER AUTHENTICATION]----------------*/
async function registerUser(userInfo) {
    return await makeRequest("/user/register", "POST", userInfo);
}

async function loginUser(credentials) {
    return await makeRequest("/user/login", "POST", credentials);
}

async function getUserProfile(token) {
    return await makeRequest("/user/profile", "GET", null, token);
}

async function updateUserProfile(userData, token) {
    return await makeRequest("/user/profile", "PUT", userData, token);
}

/*----------------[MOVIE BOOKINGS]----------------*/
async function getMovies() {
    return await makeRequest("/movies", "GET");
}

async function bookMovieTicket(bookingDetails, token) {
    return await makeRequest("/showtimes/book", "POST", bookingDetails, token);
}

export const getBookingsForUser = async (token) => {
    return await makeRequest("/user/bookings", "GET", null, token);
};

/*----------------[SHOWTIMES]----------------*/
async function getShowtimesByMovieAndDate(movieId, date) {
    return await makeRequest(`/showtimes/movie/${movieId}/date/${date}`, "GET");
}

/*----------------[REVIEWS]----------------*/
async function getReviews(movieId){
    return await makeRequest(`/reviews/${movieId}`,"GET")
}
async function postReview(review){
    return await makeRequest(`/reviews`,"POST",review);
}


/* Export API Methods */
export { 
    makeRequest,
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile, 
    getMovies, 
    bookMovieTicket, 
    getShowtimesByMovieAndDate,
    getReviews, 
    postReview
};