const db = require("mongoose")

const reviewSchema = new db.Schema({
    movie: { type: db.Schema.Types.ObjectId, ref: 'Movie', required: true },
    user: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = db.model('Review', reviewSchema);