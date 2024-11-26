const db = require("mongoose")
const bycrpt = require('bcryptjs')

const UserSchema = new db.Schema({
    name:{
        type: String,
        required: true, // Name is required
    },
    email:{
        type: String,
        required: true,
        unique: true, // Ensure unique email
        lowercase: true, // Normalize the email to lowercase
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password:{
        type: String,
        required: true,
    },
    bookings:[{
        showtime:{
            type:db.Schema.Types.ObjectId,
            ref:'Showtime',
        },
        seatNumber:{
            type:String,
            required:true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

// Hash Passwords
UserSchema.pre('save', async function(next)
{
    if(!this.isModified('password')){return next();}

    //-> Password was changed, Encrypt
    const salt = await bycrpt.genSalt(10)
    this.password = await bycrpt.hash(this.password, salt);
    next();
})

//Compare Passwords
UserSchema.methods.comparePasswords = async function (possiblePassword){
    return bycrpt.compare(possiblePassword, this.password);
}

UserSchema.index({ email: 1 });
module.exports = db.model('User',UserSchema)


