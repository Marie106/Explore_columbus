const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user')
const activityRoutes = require('./routes/activity')
const reviewsRoutes = require('./routes/reviews')
const yelpRoute = require('./routes/yelp')

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors()); // This will allow all origins by default

// Middleware to parse JSON requests
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/reviews', reviewsRoutes);
// app.use('/api/yelp', yelpRoute);

// Middleware and other routes here...

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
