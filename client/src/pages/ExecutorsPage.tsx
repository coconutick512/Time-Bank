/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchAllExecutors } from '@/entities/executors/model/executorThunk';
import { fetchUser } from '@/entities/user/model/userThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React from 'react';
import { Box, Typography, Avatar, Chip, Skeleton, Divider, useTheme } from '@mui/material';
import { Schedule as TimeIcon, Work as SkillsIcon } from '@mui/icons-material';

type Skill = {
  id: number;
  name: string;
};

type Executor = {
  id: number;
  name: string;
  email: string;
  balance: string;
  skills: Skill[];
  avatar: string | null;
};

type ExecutorsState = {
  status: 'loading' | 'done' | 'reject';
  executors: Executor[];
  error: string | null;
};

type RootState = {
  executors: ExecutorsState;
};

export default function ExecutorsPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { status, executors, error } = useAppSelector((state: RootState) => state.executors);

  React.useEffect(() => {
    void dispatch(fetchAllExecutors());
    void dispatch(fetchUser());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box sx={{ p: 3 }}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={150} sx={{ borderRadius: 2 }} />
          </Box>
        ))}
      </Box>
    );
  }

  if (status === 'reject') {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'black' }}>
        <Typography variant="h6" sx={{ color: 'black' }}>
          Ошибка загрузки: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, mx: 'auto', color: 'black' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600, color: 'black' }}>
        Наши исполнители
      </Typography>

      {executors.length > 0 ? (
        <Box sx={{ display: 'grid', gap: 3 }}>
          {executors.map((executor) => (
            <Box
              key={executor.id}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.2s',
                color: 'black',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={
                    executor.avatar
                      ? `http://localhost:3000/api/uploads/avatars/${executor.avatar}`
                      : undefined
                  }
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: theme.palette.primary.main,
                    mr: 2,
                    fontSize: 24,
                  }}
                >
                  {!executor.avatar ? executor.name.charAt(0) : undefined}
                </Avatar>
                <Box>
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: 'black' }}>
                    {executor.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {executor.email}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimeIcon color="primary" fontSize="small" />
                  <Typography variant="body1" sx={{ color: 'black' }}>
                    <b>{executor.balance}</b> TD
                  </Typography>
                </Box>
              </Box>

              {executor.skills.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'black',
                    }}
                  >
                    <SkillsIcon fontSize="small" /> Навыки:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {executor.skills.map((skill) => (
                      <Chip
                        key={skill.id}
                        label={skill.name}
                        size="small"
                        sx={{
                          backgroundColor: '#f0fdf4',
                          color: 'black',
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
            color: 'black',
          }}
        >
          <Typography variant="h6" sx={{ color: 'black' }}>
            Исполнители не найдены
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'black' }}>
            Попробуйте изменить параметры поиска
          </Typography>
        </Box>
      )}
    </Box>
  );
}
