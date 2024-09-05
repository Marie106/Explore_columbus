// backend/models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityId:{ type: String, required: true },
    userId:{ type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    price: { type: String},
    rating: { type: Number, default: 0 },
    reviews: [{ user: String, comment: String, rating: Number }],
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
