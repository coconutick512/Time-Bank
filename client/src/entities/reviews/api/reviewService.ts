import axiosInstance from '@/shared/api/axiosinstance';
import {
  ReviewSchema,
  CreateReviewSchema,
  UpdateReviewSchema,
  ReviewResponseSchema,
  ReviewsResponseSchema,
  AverageRatingResponseSchema,
  type CreateReview,
  type UpdateReview,
  type ReviewResponse,
  type ReviewsResponse,
  type AverageRatingResponse,
} from '../types/schema';

export const ReviewService = {
  createReview: async (reviewData: CreateReview): Promise<ReviewResponse> => {
    try {
      const response = await axiosInstance.post<ReviewResponse>('/reviews', reviewData);
      const validData = ReviewResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  getReviewsByUserId: async (userId: number): Promise<ReviewsResponse> => {
    try {
        const response = await axiosInstance.get<ReviewsResponse>(`/reviews/user/${userId.toString()}`);
        const validData = ReviewsResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  getReviewsByTaskId: async (taskId: number): Promise<{ reviews: any[] }> => {
    try {
      const response = await axiosInstance.get(`/reviews/task/${taskId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  getAverageRating: async (userId: number): Promise<AverageRatingResponse> => {
    try {
      const response = await axiosInstance.get<AverageRatingResponse>(`/reviews/rating/${userId}`);
      const validData = AverageRatingResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  updateReview: async (reviewId: number, reviewData: UpdateReview): Promise<ReviewResponse> => {
    try {
      const response = await axiosInstance.put<ReviewResponse>(`/reviews/${reviewId}`, reviewData);
      const validData = ReviewResponseSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },

  deleteReview: async (reviewId: number): Promise<{ message: string }> => {
    try {
      const response = await axiosInstance.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  },
};
