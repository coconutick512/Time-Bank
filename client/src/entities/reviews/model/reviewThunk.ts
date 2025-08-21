import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReviewService } from '../api/reviewService';
import type {
  CreateReview,
  UpdateReview,
  ReviewResponse,
  ReviewsResponse,
  AverageRatingResponse,
} from '../types/schema';

export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData: CreateReview): Promise<ReviewResponse> => {
    const response = await ReviewService.createReview(reviewData);
    return response;
  },
);

export const fetchReviewsByUserId = createAsyncThunk(
  'review/fetchReviewsByUserId',
  async (userId: number): Promise<ReviewsResponse> => {
    const response = await ReviewService.getReviewsByUserId(userId);
    return response;
  },
);

export const fetchReviewsByTaskId = createAsyncThunk(
  'review/fetchReviewsByTaskId',
  async (taskId: number): Promise<{ reviews: any[] }> => {
    const response = await ReviewService.getReviewsByTaskId(taskId);
    return response;
  },
);

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async ({
    reviewId,
    reviewData,
  }: {
    reviewId: number;
    reviewData: UpdateReview;
  }): Promise<ReviewResponse> => {
    const response = await ReviewService.updateReview(reviewId, reviewData);
    return response;
  },
);

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId: number): Promise<number> => {
    await ReviewService.deleteReview(reviewId);
    return reviewId;
  },
);

export const fetchAverageRating = createAsyncThunk(
  'review/fetchAverageRating',
  async (userId: number): Promise<AverageRatingResponse> => {
    const response = await ReviewService.getAverageRating(userId);
    return response;
  },
);
