import { z } from 'zod';

export const ReviewSchema = z.object({
  id: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional().nullable(),
  taskId: z.number(),
  authorId: z.number(),
  targetUserId: z.number(),
  created_at: z.string(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string().optional().nullable(),
  }),
  targetUser: z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string().optional().nullable(),
  }),
  Task: z.object({
    id: z.number(),
    title: z.string(),
  }),
});

export const CreateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  taskId: z.number(),
  targetUserId: z.number(),
});

export const UpdateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export const ReviewResponseSchema = z.object({
  message: z.string(),
  review: ReviewSchema,
});

export const ReviewsResponseSchema = z.object({
  reviews: z.array(ReviewSchema),
  averageRating: z.object({
    averageRating: z.number(),
    totalReviews: z.number(),
  }),
});

export const AverageRatingResponseSchema = z.object({
  averageRating: z.number(),
  totalReviews: z.number(),
});

export type Review = z.infer<typeof ReviewSchema>;
export type CreateReview = z.infer<typeof CreateReviewSchema>;
export type UpdateReview = z.infer<typeof UpdateReviewSchema>;
export type ReviewResponse = z.infer<typeof ReviewResponseSchema>;
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;
export type AverageRatingResponse = z.infer<typeof AverageRatingResponseSchema>;

export type ReviewState = {
  reviews: Review[];
  averageRating: {
    averageRating: number;
    totalReviews: number;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentReview: Review | null;
};
