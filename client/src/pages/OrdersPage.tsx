/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-nested-ternary */
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React from 'react';
import { fetchAllTasks } from '@/entities/tasks/model/tasksThunk';
import type { TasksState } from '@/entities/tasks/types/schema';
import {  Box, Typography, Chip, Skeleton } from '@mui/material';
import { Schedule, Person, Category } from '@mui/icons-material';
import { fetchUser } from '@/entities/user/model/userThunk';
import { useNavigate } from 'react-router-dom';  

type RootState = {
  tasks: TasksState;
};

export default function OrdersPage(): React.JSX.Element {
  const { status, tasks } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); 

  React.useEffect(() => {
    void dispatch(fetchAllTasks());
    void dispatch(fetchUser());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ p: 3 }}>
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ mb: 2, borderRadius: 2 }}
          />
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, fontWeight: 600, color: '#000000' }}
      >
        Доступные задания
      </Typography>

      {tasks.length > 0 ? (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {tasks.map((task) => (
            <Box
              key={task.id}
              onClick={() => { navigate(`/orders/one/${(task.id).toString()}`)}} // добавляем onClick
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
                cursor: 'pointer', // курсор pointer
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
              role="button" // для доступности
              tabIndex={0} // чтобы можно было фокусироваться с клавиатуры
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/orders/one/${(task.id).toString()}`);
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 2,
                  color: '#000000',
                }}
              >
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: '#000000' }}>
                  {task.title}
                </Typography>
                <Chip
                  label={task.status}
                  color={
                    task.status === 'completed' ? 'success' :
                      task.status === 'assigned' ? 'warning' : 'primary'
                  }
                  size="small"
                />
              </Box>

              <Typography sx={{ mb: 3, color: '#000000' }}>
                {task.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, color: '#000000' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule fontSize="small" sx={{ color: '#000000' }} />
                  <Typography variant="body2" sx={{ color: '#000000' }}>
                    {new Date(task.deadline).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person fontSize="small" sx={{ color: '#000000' }} />
                  <Typography variant="body2" sx={{ color: '#000000' }}>
                    {task.creator.name}
                  </Typography>
                </Box>
              </Box>

              {task.categories.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#000000' }}
                  >
                    <Category fontSize="small" sx={{ color: '#000000' }} /> Категории:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {task.categories.map((category) => (
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
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            color: '#000000',
          }}
        >
          <Typography variant="h6" color="inherit">
            Задания не найдены
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: '#000000' }}>
            Создайте первое задание или попробуйте изменить параметры поиска
          </Typography>
        </Box>
      )}
    </Box>
  );
}
