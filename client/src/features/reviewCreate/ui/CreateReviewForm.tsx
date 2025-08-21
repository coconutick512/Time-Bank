import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/app/store';
import { createReview } from '@/entities/reviews/model/reviewThunk';
import type { CreateReview } from '@/entities/reviews/types/schema';
import { Box, Button, TextField, Typography, Rating, Paper, Alert } from '@mui/material';
import { Star } from '@mui/icons-material';

type CreateReviewFormProps = {
  taskId: number;
  targetUserId: number;
  targetUserName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const CreateReviewForm: React.FC<CreateReviewFormProps> = ({
  taskId,
  targetUserId,
  targetUserName,
  onSuccess,
  onCancel,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateReview>();

  const onSubmit = async (data: CreateReview) => {
    if (!rating) {
      setError('Please provide a rating');
      return;
    }

    try {
      setError(null);
      await dispatch(
        createReview({
          ...data,
          rating,
          taskId,
          targetUserId,
        }),
      ).unwrap();

      reset();
      setRating(null);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create review');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Review for {targetUserName}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <Typography component="legend" gutterBottom>
            Rating *
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
              setError(null);
            }}
            size="large"
            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </Box>

        <TextField
          {...register('comment', {
            required: 'Comment is required',
            minLength: {
              value: 10,
              message: 'Comment must be at least 10 characters long',
            },
          })}
          label="Comment"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={!!errors.comment}
          helperText={errors.comment?.message}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" disabled={isSubmitting || !rating} fullWidth>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>

          {onCancel && (
            <Button variant="outlined" onClick={onCancel} disabled={isSubmitting} fullWidth>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
