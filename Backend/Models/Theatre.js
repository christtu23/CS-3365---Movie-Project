/* Theathre's Represent information on specific theatres */
const db = require("mongoose")

//Define Movie Schema
const TheatreSchema = new db.Schema({
    name:{ //-> Theathre Name
        type:String,
        required:true,
    },
    location:{ //-> GeoJson Format
        type: {
            type:String,
            enum:['Point'],
        },
        coordinates: { // [Longitude, Latitude]
            type:[Number],
        }
    },
    contactInfo:{ //-> Regix Verified
        phone: {
            type: String, 
            validate: {
                validator: function (v) {
                    return /^\+?[1-9]\d{1,14}$/.test(v); // Regex that Validates E.164 format (e.g., +15551234567)
                },
                message: props => `${props.value} is not a valid phone number!`,
            },
            required: true,
        },
        email: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^\S+@\S+\.\S+$/.test(v); // Regex that Validates basic email format
                },
                message: props => `${props.value} is not a valid email address!`,
            },
            required: false,
        },
    },
    /**
     * Example
     * {
     * "dayOfWeek": "Monday",
     * "openHours": "2024-11-25T09:00:00Z",  // 9:00 AM (UTC) Monday
     * "closeHours": "2024-11-25T21:00:00Z"  // 9:00 PM (UTC) Monday
     * }
     */
    hours:[
        {
            dayOfWeek:{type:String, required: true},
            openHours:{type:Date, required: true},
            closeHours:{type:Date, required:true}
        }
    ],
    /**
     * Example
     * 1-20, This is a simple number value
     */
    screens:{
        type:Number,
        required:true,
    },
});

module.exports = db.model('Theatre',TheatreSchema)