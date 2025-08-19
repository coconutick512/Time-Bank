/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-nested-ternary */
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React, { useState, useMemo } from 'react';
import { fetchAllTasks } from '@/entities/tasks/model/tasksThunk';
import type { TasksState } from '@/entities/tasks/types/schema';
import {
  Box,
  Typography,
  Chip,
  Skeleton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Pagination,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Schedule,
  Person,
  Category,
  Search,
  FilterList,
  Add,
  Refresh,
  Assignment,
  CheckCircle,
  Pending,
  Work,
} from '@mui/icons-material';
import { fetchUser } from '@/entities/user/model/userThunk';
import { useNavigate } from 'react-router-dom';

type RootState = {
  tasks: TasksState;
};

// Типы для фильтров
type TaskStatus = 'all' | 'open' | 'assigned' | 'completed';
type SortOption = 'newest' | 'oldest' | 'deadline' | 'title';

export default function OrdersPage(): React.JSX.Element {
  const { status, tasks, error } = useAppSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Состояния для фильтрации и поиска
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  React.useEffect(() => {
    void dispatch(fetchAllTasks());
    void dispatch(fetchUser());
  }, [dispatch]);

  // Фильтрация и сортировка задач
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, searchTerm, statusFilter, sortBy]);

  // Пагинация
  const paginatedTasks = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredAndSortedTasks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTasks, page]);

  const totalPages = Math.ceil(filteredAndSortedTasks.length / itemsPerPage);

  const handleRefresh = (): void => {
    void dispatch(fetchAllTasks());
  };

  const getStatusIcon = (statuss: string): React.ReactElement => {
    switch (statuss) {
      case 'completed':
        return <CheckCircle fontSize="small" />;
      case 'assigned':
        return <Assignment fontSize="small" />;
      default:
        return <Pending fontSize="small" />;
    }
  };

  const getStatusColor = (statuss: string): string => {
    switch (statuss) {
      case 'completed':
        return 'success';
      case 'assigned':
        return 'warning';
      case 'default':
        return 'default';
      default:
        return 'primary';
    }
  };
  if (status === 'loading' && tasks.length === 0) {
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
      {/* Заголовок и действия */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#000000' }}>
          Доступные задания
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title="Обновить список">
            <IconButton onClick={handleRefresh} color="primary">
              <Refresh />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/create-task')}
            sx={{
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
            }}
          >
            Создать задание
          </Button>
        </Box>
      </Box>

      {/* Фильтры и поиск */}
      <Box sx={{ mb: 3, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Поиск заданий..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              },
            }}
            sx={{ minWidth: 200, flexGrow: 1 }}
            size="small"
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={statusFilter}
              label="Статус"
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus)}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="open">Открытые</MenuItem>
              <MenuItem value="assigned">Назначенные</MenuItem>
              <MenuItem value="completed">Завершенные</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Сортировка</InputLabel>
            <Select
              value={sortBy}
              label="Сортировка"
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <MenuItem value="newest">Сначала новые</MenuItem>
              <MenuItem value="oldest">Сначала старые</MenuItem>
              <MenuItem value="deadline">По сроку</MenuItem>
              <MenuItem value="title">По названию</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Информация о результатах */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Найдено заданий: {filteredAndSortedTasks.length}
        </Typography>
        {searchTerm || statusFilter !== 'all' ? (
          <Button
            size="small"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Сбросить фильтры
          </Button>
        ) : null}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Ошибка при загрузке заданий: {error}
        </Alert>
      )}

      {/* Список заданий */}
      {paginatedTasks.length > 0 ? (
        <>
          <Box sx={{ display: 'grid', gap: 3, mb: 3 }}>
            {paginatedTasks.map((task) => (
              <Box
                key={task.id}
                onClick={() => navigate(`/orders/${task.id.toString()}`)}
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    borderColor: 'primary.main',
                  },
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/orders/${task.id.toString()}`);
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 600, color: '#000000' }}
                  >
                    {task.title}
                  </Typography>
                  <Chip
                    icon={getStatusIcon(task.status)}
                    label={
                      task.status === 'open'
                        ? 'Открыто'
                        : task.status === 'assigned'
                        ? 'Назначено'
                        : 'Завершено'
                    }
                    color={getStatusColor(
                      typeof task.status === 'string' ? task.status : 'default',
                    )}
                    size="small"
                  />
                </Box>

                <Typography sx={{ mb: 3, color: '#000000', lineHeight: 1.6 }}>
                  {task.description.length > 150
                    ? `${task.description.substring(0, 150)}...`
                    : task.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Срок: {new Date(task.deadline).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Автор: {task.creator.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Work fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                      {task.hours} TD
                    </Typography>
                  </Box>
                </Box>

                {task.categories.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.secondary',
                      }}
                    >
                      <Category fontSize="small" /> Категории:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {task.categories.map((category) => (
                        <Chip
                          key={category.id}
                          label={category.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: '#bbf7d0',
                            color: '#166534',
                            '&:hover': {
                              backgroundColor: '#f0fdf4',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.default',
          }}
        >
          <FilterList sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Задания не найдены
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm || statusFilter !== 'all'
              ? 'Попробуйте изменить параметры поиска'
              : 'Создайте первое задание'}
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/create-task')}>
            Создать задание
          </Button>
        </Box>
      )}
    </Box>
  );
}
