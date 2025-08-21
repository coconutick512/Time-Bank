const ReviewService = require('../services/review.service');

class ReviewController {
  static async createReview(req, res) {
    try {
      const { rating, comment, taskId, targetUserId } = req.body;
      const authorId = res.locals.user.id;

      if (!rating || !taskId || !targetUserId) {
        return res.status(400).json({
          message: 'Rating, taskId, and targetUserId are required',
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          message: 'Rating must be between 1 and 5',
        });
      }

      const review = await ReviewService.createReview({
        rating,
        comment,
        taskId,
        authorId,
        targetUserId,
      });

      res.status(201).json({
        message: 'Review created successfully',
        review,
      });
    } catch (error) {
      console.error('Error in createReview controller:', error);
      res.status(400).json({
        message: error.message || 'Error creating review',
      });
    }
  }

  static async getReviewsByUserId(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          message: 'User ID is required',
        });
      }

      const reviews = await ReviewService.getReviewsByUserId(userId);
      const averageRating = await ReviewService.getAverageRating(userId);

      res.status(200).json({
        reviews,
        averageRating,
      });
    } catch (error) {
      console.error('Error in getReviewsByUserId controller:', error);
      res.status(400).json({
        message: error.message || 'Error fetching reviews',
      });
    }
  }

  static async getReviewsByTaskId(req, res) {
    try {
      const { taskId } = req.params;

      if (!taskId) {
        return res.status(400).json({
          message: 'Task ID is required',
        });
      }

      const reviews = await ReviewService.getReviewsByTaskId(taskId);

      res.status(200).json({
        reviews,
      });
    } catch (error) {
      console.error('Error in getReviewsByTaskId controller:', error);
      res.status(400).json({
        message: error.message || 'Error fetching task reviews',
      });
    }
  }

  static async updateReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      const authorId = req.user.id;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          message: 'Rating must be between 1 and 5',
        });
      }

      const review = await ReviewService.updateReview(
        reviewId,
        { rating, comment },
        authorId,
      );

      res.status(200).json({
        message: 'Review updated successfully',
        review,
      });
    } catch (error) {
      console.error('Error in updateReview controller:', error);
      res.status(400).json({
        message: error.message || 'Error updating review',
      });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;
      const authorId = req.user.id;

      const result = await ReviewService.deleteReview(reviewId, authorId);

      res.status(200).json({
        message: result.message,
      });
    } catch (error) {
      console.error('Error in deleteReview controller:', error);
      res.status(400).json({
        message: error.message || 'Error deleting review',
      });
    }
  }

  static async getAverageRating(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          message: 'User ID is required',
        });
      }

      const averageRating = await ReviewService.getAverageRating(userId);

      res.status(200).json(averageRating);
    } catch (error) {
      console.error('Error in getAverageRating controller:', error);
      res.status(400).json({
        message: error.message || 'Error fetching average rating',
      });
    }
  }
}

module.exports = ReviewController;
