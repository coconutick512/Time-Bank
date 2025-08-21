import { createSlice } from '@reduxjs/toolkit';
import type { ReviewState } from '../types/schema';
import {
  createReview,
  fetchReviewsByUserId,
  fetchReviewsByTaskId,
  updateReview,
  deleteReview,
  fetchAverageRating,
} from './reviewThunk';

const initialState: ReviewState = {
  reviews: [],
  averageRating: null,
  status: 'idle',
  error: null,
  currentReview: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.averageRating = null;
      state.error = null;
    },
    setCurrentReview: (state, action) => {
      state.currentReview = action.payload;
    },
    clearCurrentReview: (state) => {
      state.currentReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews.unshift(action.payload.review);
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error creating review';
      })

      // Fetch Reviews by User ID
      .addCase(fetchReviewsByUserId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReviewsByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload.reviews;
        state.averageRating = action.payload.averageRating;
        state.error = null;
      })
      .addCase(fetchReviewsByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching reviews';
      })

      // Fetch Reviews by Task ID
      .addCase(fetchReviewsByTaskId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReviewsByTaskId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload.reviews;
        state.error = null;
      })
      .addCase(fetchReviewsByTaskId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching task reviews';
      })

      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.reviews.findIndex(review => review.id === action.payload.review.id);
        if (index !== -1) {
          state.reviews[index] = action.payload.review;
        }
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error updating review';
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error deleting review';
      })

      // Fetch Average Rating
      .addCase(fetchAverageRating.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAverageRating.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.averageRating = action.payload;
        state.error = null;
      })
      .addCase(fetchAverageRating.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching average rating';
      });
  },
});

export const { clearReviews, setCurrentReview, clearCurrentReview } = reviewSlice.actions;
export default reviewSlice.reducer; 