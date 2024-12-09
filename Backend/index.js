//Entry Point For Our Backend


/*===================================Variables & References ================================*/
const express = require("express") //Import Express (Handles the web-server)
const swaggerUi = require('swagger-ui-express'); //Swagger Addition for API documentation
const YAML = require('yamljs'); //Loads our swagger yaml file
const swaggerDoc = YAML.load('./Docs/swagger.yaml') //Loads our doumentation yaml
require('dotenv').config(); /* Loads Env variables into process.env pretty much just a process obfuscation layer */
const cors = require("cors") // For cross-origin requests 
const app = express(); //Initializes The App
const defaultPort = 5000
const PORT = process.env.PORT || defaultPort;

/*Import Routes*/
const movieRoutes = require('./Routes/Movies'); // Import movie routes
const showtimeRoutes = require('./Routes/Showtime')
const theatreRoutes = require('./Routes/Theatre'); // Import movie routes
const UserRoutes = require('./Routes/User')
const SeatsRoutes = require('./Routes/Seats')
const ReviewRoutes = require('./Routes/Review')

/*===================================API MOUNTS================================*/
app.use(express.json()); //This will automatically parse incoming request as JSON'S
app.use(cors());

/* Hearbeat Check */
app.get("/",(req,res) => {res.send('Movie Booking API is Active...')})

/* Movies API */
app.use("/api/movies",movieRoutes)
app.use("/api/showtimes",showtimeRoutes)
app.use("/api/theatre",theatreRoutes)
app.use("/api/user",UserRoutes)
app.use("/api/seats",SeatsRoutes)
app.use("/api/reviews",ReviewRoutes)

/* Swagger Documentation */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/* Debug */
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
  });

/*===================================System Setup================================*/
/*PORT*/
app.listen(PORT, () => {
    console.log(`[X][MBS]: Listening On Port ${PORT}`)
}) 
/*DATABASE*/
const db = require('mongoose');
const connectdb = async () => {
    //Attempt Connection
    try{
        await db.connect(process.env.DB_URI);
        console.log("[X][MBS]: Database Online")
    } catch(err)
    {
        console.log("[X][MBS]: Database Connection Failed")
        console.log("[X][MBS]: %s",err.messag)
        process.exit(1); //-> Exit | Code: 1 Failure
    }
}
connectdb();

//-> Export Database Module
module.exports = connectdb;
/*===================================System Setup END================================*/
