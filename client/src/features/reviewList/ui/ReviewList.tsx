import React, { useEffect } from 'react';
// eslint-disable-next-line fsd-layers/no-import-from-top
import { useAppDispatch } from '@/app/store';
import { useAppSelector } from '@/shared/hooks/hooks';
import { fetchReviewsByUserId } from '@/entities/reviews/model/reviewThunk';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Star } from '@mui/icons-material';

type ReviewListProps = {
  userId: number;
  showAverage?: boolean;
};

export const ReviewList: React.FC<ReviewListProps> = ({ userId, showAverage = true }) => {
  const dispatch = useAppDispatch();
  const { reviews, averageRating, status, error } = useAppSelector((state) => state.review);

  useEffect(() => {
    void dispatch(fetchReviewsByUserId(userId));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error ?? 'Failed to load reviews'}
      </Alert>
    );
  }

  return (
    <Box>
      {showAverage && averageRating && (
        <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'white' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Rating value={averageRating.averageRating} readOnly precision={0.1} size="large" />
              <Typography variant="h6">{averageRating.averageRating.toFixed(1)} / 5</Typography>
              <Chip
                label={`${averageRating.totalReviews.toString()} reviews`}
                color="secondary"
                size="small"
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {reviews.length === 0 ? (
        <Alert severity="info" sx={{ m: 2 }}>
          No reviews yet
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reviews.map((review) => (
            <Box key={review.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="flex-start" gap={2}>
                    <Avatar src={review.author.avatar ?? undefined} alt={review.author.name}>
                      {review.author.name.charAt(0)}
                    </Avatar>

                    <Box flex={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {review.author.name}
                        </Typography>
                        <Rating
                          value={review.rating}
                          readOnly
                          size="small"
                          emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                      </Box>

                      {review.comment && (
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          {review.comment}
                        </Typography>
                      )}

                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="caption" color="text.secondary">
                          Task: {review.Task.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          • {new Date(review.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
