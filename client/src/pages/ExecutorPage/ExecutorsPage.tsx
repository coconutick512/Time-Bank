import { fetchAllExecutors } from '@/entities/executors/model/executorThunk';
import { fetchUser } from '@/entities/user/model/userThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React from 'react';
import { Box, Typography, Avatar, Chip, Skeleton, Divider, Rating } from '@mui/material';
import { Schedule as TimeIcon, Work as SkillsIcon, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchAverageRating } from '@/entities/reviews/model/reviewThunk';

type Skill = {
  id: number;
  name: string;
};

type Executor = {
  avatar?: string;
  id: number;
  name: string;
  email: string;
  balance: string;
  skills: Skill[];
  about: string;
};

type ExecutorWithRating = Executor & {
  averageRating?: number;
  totalReviews?: number;
};

type ExecutorsState = {
  status: 'loading' | 'done' | 'reject';
  executors: ExecutorWithRating[];
  error: string | null;
};

type RootState = {
  executors: ExecutorsState;
};

export default function ExecutorsPage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, executors, error } = useAppSelector((state: RootState) => state.executors);
  const [executorsWithRatings, setExecutorsWithRatings] = React.useState<ExecutorWithRating[]>([]);

  React.useEffect(() => {
    document.title = 'Исполнители'
    void dispatch(fetchAllExecutors());
    void dispatch(fetchUser());
  }, [dispatch]);

  // Fetch ratings for all executors
  React.useEffect(() => {
    const fetchRatings = async () => {
      if (executors.length > 0) {
        const executorsWithRatingsData = await Promise.all(
          executors.map(async (executor) => {
            try {
              const response = await fetch(`/api/reviews/rating/${executor.id}`);
              const ratingData = await response.json();
              return {
                ...executor,
                averageRating: ratingData.averageRating,
                totalReviews: ratingData.totalReviews,
              };
            } catch (error) {
              return {
                ...executor,
                averageRating: 0,
                totalReviews: 0,
              };
            }
          }),
        );
        setExecutorsWithRatings(executorsWithRatingsData);
      }
    };

    if (status === 'done') {
      void fetchRatings();
    }
  }, [executors, status]);

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
    <Box className="executors-root">
      <Typography className="executors-title" variant="h4" component="h1">
        Наши исполнители
      </Typography>

      {executorsWithRatings.length > 0 ? (
        <Box className="executors-list">
          {executorsWithRatings.map((executor) => (
            <Box
              key={executor.id}
              role="button"
              tabIndex={0}
              className="executor-card"
              onClick={() => navigate(`/profile/${executor.id.toString()}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/profile/${executor.id.toString()}`);
                }
              }}
            >
              <Box className="executor-header">
                <Avatar
                  src={`/api/uploads/avatars/${executor.avatar}`}
                  className="executor-avatar"
                  // alt={executor.name}
                />
                <Box>
                  <Typography className="executor-name" variant="h5" component="h3">
                    {executor.name}
                  </Typography>
                  <Typography className="executor-email" variant="body2">
                    {executor.email}
                  </Typography>

                  {/* Review Rating Display */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Rating
                      value={executor.averageRating ?? 0}
                      readOnly
                      size="small"
                      precision={0.1}
                      emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {executor.averageRating?.toFixed(1) ?? '0.0'} ({executor.totalReviews ?? 0}{' '}
                      отзывов)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              <Box className="executor-balance">
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold', color: 'inherit' }}
                  className="executor-about-text"
                >
                  {executor.about.length > 50 ? `${executor.about.slice(0, 50)}…` : executor.about}
                </Typography>
              </Box>

              {executor.skills.length > 0 && (
                <Box>
                  <Typography
                    className="executor-skills-title"
                    variant="subtitle2"
                    sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: 'black' }}
                  >
                    <SkillsIcon fontSize="small" /> Навыки:
                  </Typography>
                  <Box className="executor-skills">
                    {executor.skills.map((skill) => (
                      <Chip
                        key={skill.id}
                        label={skill.name}
                        size="small"
                        className="executor-skill-chip"
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
