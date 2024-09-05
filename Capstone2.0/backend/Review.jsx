const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number },
  rating: { type: Number, default: 0 },
  reviews: [{ user: String, comment: String, rating: Number }],
});
module.exports = mongoose.model('Activity', ActivitySchema);
