
const db = require("mongoose")

//Define Showtime Schema
const ShowtimeSchema = new db.Schema({
    movie:{ //-> The movie being shown
        type:db.Schema.Types.ObjectId,
        ref:'Movie',
        required: true
    },
    theatre:{ //-> The theatre the movie is being shown at
        type:db.Schema.Types.ObjectId,
        ref:'Theatre',
        required: true
    },
    Pricing:{
        type:Number,
        required:true,
        min:0
    },
    Language:{
        type:String,
        default:'English'
    },
    showDates: [
        {
            date: {
                type: Date, // Date only (e.g., '2024-12-25')
                required: true,
            },
            times: [
                {
                    startTime: {
                        type: String, // Time in HH:mm format (e.g., '18:00')
                        required: true,
                        validate: {
                            validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
                            message: (props) => `${props.value} is not a valid time!`,
                        },
                    },
                    endTime: {
                        type: String, // Time in HH:mm format (e.g., '20:30')
                        required: true,
                        validate: {
                            validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
                            message: (props) => `${props.value} is not a valid time!`,
                        },
                    },
                },
            ],
        },
    ],
    seats: [
        {
            seatNumber: { type: String, required: true },
            isAvailable: { type: Boolean, default: true },
            user: {
                type: db.Schema.Types.ObjectId,
                ref: 'User',
                default: null,
            },
        },
    ],
    status:{ //-> Movie status, we can use this to quickly check status if needed
        type:String,
        enum:['Upcoming','Showing','Finished Airing','Cancelled'],
        default:'Upcoming',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

ShowtimeSchema.pre('save',function(next){
    this.updatedAt = Date.now();
    next();
});

ShowtimeSchema.index({movie:1, theatre:1, status:1})
module.exports = db.model('Showtime',ShowtimeSchema)