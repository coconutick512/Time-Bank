const ReviewController = require('../controllers/review.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const reviewRouter = require('express').Router();

// Create a new review
reviewRouter.post('/', verifyAccessToken, ReviewController.createReview);

// Get reviews by user ID
reviewRouter.get('/user/:userId', ReviewController.getReviewsByUserId);

// Get reviews by task ID
reviewRouter.get('/task/:taskId', ReviewController.getReviewsByTaskId);

// Get average rating for a user
reviewRouter.get('/rating/:userId', ReviewController.getAverageRating);

// Update a review (only by author)
reviewRouter.put('/:reviewId', verifyAccessToken, ReviewController.updateReview);

// Delete a review (only by author)
reviewRouter.delete('/:reviewId', verifyAccessToken, ReviewController.deleteReview);

module.exports = reviewRouter;
