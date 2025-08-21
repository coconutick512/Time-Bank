import React, { useState } from 'react';
import { useAppSelector } from '@/shared/hooks/hooks';
import { ReviewList } from '@/features/reviewList/ui/ReviewList';
import { ReviewModal } from '@/features/reviewModal/ui/ReviewModal';
import { Box, Button, Typography, Container, Paper, TextField, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';

export const ReviewsPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [selectedUserId, setSelectedUserId] = useState<number>(user?.id ?? 1);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskId, setTaskId] = useState<number>(1);
  const [targetUserId, setTargetUserId] = useState<number>(2);
  const [targetUserName, setTargetUserName] = useState<string>('John Doe');

  const handleCreateReview = (): void => {
    setModalOpen(true);
  };

  const handleReviewSuccess = (): void => {
    // The ReviewList component will automatically refresh
    console.log('Review created successfully!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reviews System
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Controls
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <TextField
            label="User ID to view reviews for"
            type="number"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            size="small"
            sx={{ minWidth: 200 }}
          />

          <TextField
            label="Task ID"
            type="number"
            value={taskId}
            onChange={(e) => setTaskId(Number(e.target.value))}
            size="small"
            sx={{ minWidth: 120 }}
          />

          <TextField
            label="Target User ID"
            type="number"
            value={targetUserId}
            onChange={(e) => setTargetUserId(Number(e.target.value))}
            size="small"
            sx={{ minWidth: 150 }}
          />

          <TextField
            label="Target User Name"
            value={targetUserName}
            onChange={(e) => setTargetUserName(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          />

          <Button variant="contained" startIcon={<Add />} onClick={handleCreateReview}>
            Create Review
          </Button>
        </Box>
      </Paper>

      <Alert severity="info" sx={{ mb: 3 }}>
        This page demonstrates the complete review system. You can view reviews for any user and
        create new reviews. The system includes rating validation, comment requirements, and
        automatic refresh of review lists.
      </Alert>

      <ReviewList userId={selectedUserId} showAverage={true} />

      <ReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        taskId={taskId}
        targetUserId={targetUserId}
        targetUserName={targetUserName}
        onSuccess={handleReviewSuccess}
      />
    </Container>
  );
};
