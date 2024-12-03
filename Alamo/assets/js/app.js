/*
This is our central point of communication for our app, it houses everything
logic wise, such as session handling
*/
import { CONFIG } from "./config"



/*----------------[APP]----------------*/
function initApp() {
    loadSessionToken();
    if (Session_Info.token) {
      console.log("[X][MBS-Front]: User session active. Token loaded.");
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

/*----------------[AUTHENTICATION FUNCTIONS]----------------*/
async function loginUser(email, password) { //-> User Login
    try {
        const response = await fetch(`${CONFIG.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }
        //Login Succesfull, Save Session Token
        const data = await response.json();
        saveSessionToken(data.token);
        AppState.user = data.user;
        console.log("[X][MBS-Front]: User logged in successfully:", AppState.user);

        //Token Saved | User Logged In | Now Redirect
        const redirectPath = localStorage.getItem("redirectPath") || "/home.html";
        localStorage.removeItem("redirectPath"); // Clear stored path
        window.location.href = redirectPath;
    } catch (err) {
        console.error("[X][MBS-Front]: Error logging in:", err.message);
    }
}
async function registerUser(userDetails) { //-> User Register
try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
    });
    //Registration Failed Check
    if (!response.ok) throw new Error("[X][MBS-Front]: Registration failed");

    //Registration Successfull Succesfull | Redirect to login
    const data = await response.json();
    console.log("[X][MBS-Front]: User registered successfully:", data);
    window.location.href = "/login.html";
} catch (err) {
    console.error("[X][MBS-Front]: Error registering user:", err.message);
}
}
function logoutUser() {//-> User Logout | Nothing fancy needs to be done here without the correct token, they can't manipulate user data
    Session_Info.user = null;
    Session_Info.token = null;
    localStorage.removeItem("authToken");
    console.log("[X][MBS-Front]: User logged out successfully.");
    redirectIfNotAuthenticated(); // Redirect to login page
}

/*----------------[AUTHENTICATION LISTENERS]----------------*/

document.addEventListener("DOMContentLoaded", () => { //-> Authentication Form Listeners
    //Login Form
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        await loginUser(email, password);
      });
    }

    //Registration Form
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirm_password.value;

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const userDetails = { username, email, password };
            await registerUser(userDetails);
        });
    }
  
    // Call app initialization
    initApp();
});

function redirectIfNotAuthenticated() { //-> Authentication Redirect (if not logged in)
    if (!AppState.token) {
        console.log("[X][MBS-Front]: Redirecting to login page.");
        localStorage.setItem("redirectPath", currentPath); // Store the current page
        console.log("[X][MBS-Front]: Redirecting to login page.");
        window.location.href = "/login.html";
    }
}




