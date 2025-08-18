/* eslint-disable no-nested-ternary */
import { fetchTask } from '@/entities/tasks/model/tasksThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React, { useEffect } from 'react';
import { Box, Typography, Chip, Skeleton } from '@mui/material';
import { Schedule, Person, Category } from '@mui/icons-material';
import type { TasksState } from '@/entities/tasks/types/schema';
import { useParams } from 'react-router-dom';

type RootState = {
  tasks: TasksState;
};

export default function PersonalOrder(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { status, personalTask } = useAppSelector((state: RootState) => state.tasks);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      void dispatch(fetchTask(id));
    }
  }, [dispatch, id]);

  if (status === 'loading' || !personalTask) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Skeleton variant="text" height={40} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.2s',
        color: '#000000',
        backgroundColor: '#fff',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: '#000000' }}>
          {personalTask.title}
        </Typography>
        <Chip
          label={personalTask.status}
          color={
            personalTask.status === 'completed'
              ? 'success'
              : personalTask.status === 'assigned'
              ? 'warning'
              : 'primary'
          }
          size="small"
        />
      </Box>

      <Typography sx={{ mb: 3, color: '#000000' }}>{personalTask.description}</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3, color: '#000000' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule fontSize="small" sx={{ color: '#000000' }} />
          <Typography variant="body2" sx={{ color: '#000000' }}>
            {new Date(personalTask.deadline).toLocaleDateString()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Person fontSize="small" sx={{ color: '#000000' }} />
          <Typography variant="body2" sx={{ color: '#000000' }}>
            {personalTask.creator.name}
          </Typography>
        </Box>
      </Box>

      {personalTask.categories.length > 0 && (
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#000000' }}
          >
            <Category fontSize="small" sx={{ color: '#000000' }} />
            Категории:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {personalTask.categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                size="small"
                sx={{
                  backgroundColor: '#f0fdf4',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
