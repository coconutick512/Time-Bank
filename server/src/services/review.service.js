const { Review, User, Task } = require('../../db/models');

class ReviewService {
  static async createReview({ rating, comment, taskId, authorId, targetUserId }) {
    try {
      // Check if review already exists for this task
      const existingReview = await Review.findOne({
        where: { taskId, authorId },
      });

      if (existingReview) {
        throw new Error('Review already exists for this task');
      }

      const review = await Review.create({
        rating,
        comment,
        taskId,
        authorId,
        targetUserId,
      });

      const reviewWithAssociations = await Review.findByPk(review.id, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: User,
            as: 'targetUser',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: Task,
            attributes: ['id', 'title'],
          },
        ],
      });

      return reviewWithAssociations;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  static async getReviewsByUserId(userId) {
    try {
      const reviews = await Review.findAll({
        where: { targetUserId: userId },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: User,
            as: 'targetUser',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: Task,
            attributes: ['id', 'title'],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return reviews;
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
  }

  static async getReviewsByTaskId(taskId) {
    try {
      const reviews = await Review.findAll({
        where: { taskId },
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: User,
            as: 'targetUser',
            attributes: ['id', 'name', 'avatar'],
          },
        ],
        order: [['created_at', 'DESC']],
      });

      return reviews;
    } catch (error) {
      console.error('Error fetching task reviews:', error);
      throw error;
    }
  }

  static async updateReview(reviewId, { rating, comment }, authorId) {
    try {
      const review = await Review.findOne({
        where: { id: reviewId, authorId },
      });

      if (!review) {
        throw new Error('Review not found or unauthorized');
      }

      await review.update({ rating, comment });

      const updatedReview = await Review.findByPk(reviewId, {
        include: [
          {
            model: User,
            as: 'author',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: User,
            as: 'targetUser',
            attributes: ['id', 'name', 'avatar'],
          },
          {
            model: Task,
            attributes: ['id', 'title'],
          },
        ],
      });

      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  }

  static async deleteReview(reviewId, authorId) {
    try {
      const review = await Review.findOne({
        where: { id: reviewId, authorId },
      });

      if (!review) {
        throw new Error('Review not found or unauthorized');
      }

      await review.destroy();
      return { message: 'Review deleted successfully' };
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }

  static async getAverageRating(userId) {
    try {
      const reviews = await Review.findAll({
        where: { targetUserId: userId },
        attributes: ['rating'],
      });

      if (reviews.length === 0) {
        return { averageRating: 0, totalReviews: 0 };
      }

      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      return {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews.length,
      };
    } catch (error) {
      console.error('Error calculating average rating:', error);
      throw error;
    }
  }
}

module.exports = ReviewService;
