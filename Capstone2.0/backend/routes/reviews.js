const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Review'); 
// const auth = require('../middleware/auth'); 

// Create a new review
router.post('/', async (req, res) => {
    const { activityId, rating, comment, date } = req.body;

    // Validate input
    if (!activityId || !rating || !comment || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newReview = new Review({
            activityId: activityId,
            userId: req.body.userId, // Get userId from the authenticated user
            rating,
            comment,
            date,
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all reviews or filter by activityId
router.get('/', async (req, res) => {
    const { activityId } = req.query;

    try {
        let reviews;
        if (activityId) {
            reviews = await Review.find({ activityId: mongoose.Types.ObjectId(activityId) });
        } else {
            reviews = await Review.find();
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific review by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a review by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Validate input
    if (!rating || !comment) {
        return res.status(400).json({ message: 'Rating and comment are required' });
    }

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is the owner of the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this review' });
        }

        review.rating = rating;
        review.comment = comment;
        review.date = new Date();

        await review.save();
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is the owner of the review
        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this review' });
        }

        await Review.findByIdAndDelete(id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
