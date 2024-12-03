/*
    This is script will hold all our logic to communicate with our backend 
    api, it handles requesting information and the accompanied response. We don't use this directly
    in most cases. The app.js will hold most of our logic/listeners and otherwise
/*


/*----------------[UTILITY FUNCTIONS]----------------*/
const apiUrl = "http://localhost:5000/";

async function handleResponse(response) {
    if (response.ok) {
        return await response.json();
    } else {
        const errorInfo = await response.json();
        throw new Error('[X][MBS-FrontEnd]: An Error Occurred ' + errorInfo.message);
    }
}

/*----------------[USER AUTHENTICATION]----------------*/
async function registerUser(userInfo) {
    const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    });

    return handleResponse(response);
}

async function loginUser(credentials) {
    const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    return handleResponse(response);
}

async function getUserProfile(userId) {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return handleResponse(response);
}

async function updateUserProfile(userId, userData) {
    const response = await fetch(`${apiUrl}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return handleResponse(response);
}

/*----------------[MOVIE BOOKINGS]----------------*/
async function getMovies() {
    const response = await fetch(`${apiUrl}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return handleResponse(response);
}

async function bookMovieTicket(userId, movieId, ticketData) {
    const response = await fetch(`${apiUrl}/booking/${userId}/${movieId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
    });

    return handleResponse(response);
}

/* Export: */
export { registerUser, loginUser, getUserProfile, updateUserProfile, getMovies, bookMovieTicket };
