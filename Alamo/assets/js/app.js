/*
This is our central point of communication for our app, it houses everything
logic wise, such as session handling
*/
import { CONFIG } from "./config.js"
import {
    registerUser as apiRegisterUser,
    loginUser as apiLoginUser,
    getUserProfile,
    updateUserProfile,
    getMovies,
    bookMovieTicket
} from "./api.js";


/*----------------[APP]----------------*/
function initApp() {
    loadSessionToken();
    if (Session_Info.token) {
      console.log("[X][MBS-Front]: User session active. Token loaded.",Session_Info.token);
      fetchUserProfile();
    }else{
        console.log("[X][MBS-Front]: No Session token found, login required for advance access");
    }
    console.log("[X][MBS-Front]: App initialized");
}


/*----------------[STATE MANAGEMENT]----------------*/
const Session_Info = {
    user:null,
    token:null,
}

function saveSessionToken(token){ //-> Saves Auth Token to localstorage
    localStorage.setItem('authToken',token);
    Session_Info.token = token;
}

function loadSessionToken(){ //-> Loads current auth token from localstorage
    const token = localStorage.getItem('authToken');
    if(token){
        Session_Info.token = token;
        return token
    }
    return null
}

function clearSession() { //-> Clears the session
    Session_Info.user = null;
    Session_Info.token = null;
    localStorage.removeItem("authToken");
}

/*----------------[AUTHENTICATION FUNCTIONS]----------------*/
async function loginUser(email, password) {
    try {
        const data = await apiLoginUser({ email, password });
        saveSessionToken(data.token);
        Session_Info.user = data.user;
        console.log("[X][MBS-Front]: User logged in successfully:", Session_Info.user);

        const redirectPath = localStorage.getItem("redirectPath") || "/home.html";
        localStorage.removeItem("redirectPath");
        window.location.href = redirectPath;
    } catch (err) {
        console.error("[X][MBS-Front]: Login failed:", err.message);
    }
}

async function registerUser(userDetails) {
    try {
        await apiRegisterUser(userDetails);
        console.log("[X][MBS-Front]: User registered successfully.");
        window.location.href = "/login.html";
    } catch (err) {
        console.error("[X][MBS-Front]: Registration failed:", err.message);
    }
}

async function fetchUserProfile() {
    try {
        const userProfile = await getUserProfile(Session_Info.token);
        Session_Info.user = userProfile;
        console.log("[X][MBS-Front]: User profile fetched:", userProfile);
    } catch (err) {
        console.error("[X][MBS-Front]: Failed to fetch user profile:", err.message);
    }
}

function logoutUser() {
    clearSession();
    redirectIfNotAuthenticated();
}

/*----------------[EVENT LISTENERS]----------------*/
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            await loginUser(email, password);
        });
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirm_password.value;

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const userDetails = { name, email, password };
            await registerUser(userDetails);
        });
    }

    initApp();
});

function redirectIfNotAuthenticated() {
    if (!Session_Info.token) {
        console.log("[X][MBS-Front]: Redirecting to login page.");
        const currentPath = window.location.pathname;
        localStorage.setItem("redirectPath", currentPath);
        window.location.href = "/login.html";
    }
}


