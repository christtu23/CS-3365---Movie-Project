const { default: mongoose } = require("mongoose");
const db = require("mongoose")

//Define Movie Schema
const MovieSchema = new db.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    releaseDate:{
        type:Date,
    },
    genre:{
        type:String,
    },
    director:{
        type:String,
        required: true,
    },
    cast:{
        type:[String],
        default:[],
    },
});

module.exports = mongoose.model('Movie',MovieSchema)