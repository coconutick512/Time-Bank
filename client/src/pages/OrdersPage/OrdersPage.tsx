/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-nested-ternary */
import {
  deleteTask,
  editTask,
  fetchTask,
  fetchAllTasks,
  fetchCategories,
  createTask,
} from '@/entities/tasks/model/tasksThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React, { useEffect, useState, useMemo } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
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
import {
  OrdersRoot,
  OrdersHeader,
  OrdersTitle,
  OrdersActions,
  OrdersButtonPrimary,
  OrdersIconButton,
  OrdersFilterPanel,
  OrdersFilterRow,
  OrdersSearchInput,
  OrdersSelect,
  OrdersInfoRow,
  OrdersResetButton,
  OrdersErrorAlert,
  OrdersTaskList,
  OrdersTaskItem,
  OrdersEmptyState,
  OrdersEmptyIcon,
  OrdersSkeletonRect,
} from './OrdersPage.styles';
import type { TasksState } from '@/entities/tasks/types/schema';

type RootState = {
  tasks: TasksState;
};

type TaskStatus = 'all' | 'open' | 'assigned' | 'completed';
type SortOption = 'newest' | 'oldest' | 'deadline' | 'title';

export default function OrdersPage(): React.JSX.Element {
  const { status, tasks, error, categories } = useAppSelector((state: RootState) => state.tasks);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  

  const handleOpenCreateModal = (): void => {
    setCreateModalOpen(true);
    void dispatch(fetchCategories());
  };
  const handleCloseCreateModal = (): void => setCreateModalOpen(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    document.title = 'Заказы'
    void dispatch(fetchAllTasks());
    void dispatch(fetchUser());
  }, [dispatch]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    hours: '',
    status: 'open' as TaskStatus,
    deadline: '',
    categories: [] as number[],
  });

  const handleNewTaskChange = (field: string, value: unknown): void => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = async (): Promise<void> => {
    if (!user?.id) {
      console.error('User ID is not available');
      return;
    }

    const taskWithCreator = {
      ...newTask,
      creatorId: user.id,
    };
    await dispatch(createTask(taskWithCreator));
    await dispatch(fetchUser());
    setCreateModalOpen(false);

    setNewTask({
      title: '',
      description: '',
      hours: '',
      status: 'open',
      deadline: '',
      categories: [],
    });
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

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

  if (status === 'loading') {
    return (
      <OrdersRoot role="progressbar">
        {[...Array(5)].map((_, index) => (
          <OrdersSkeletonRect key={index} variant="rectangular" width="100%" height={180} />
        ))}
      </OrdersRoot>
    );
  }

  return (
    <OrdersRoot>
      {/* Заголовок и действия */}
      <OrdersHeader>
        <OrdersTitle variant="h4" component="h1">
          Доступные задания
        </OrdersTitle>

        <OrdersActions>
          <Tooltip title="Обновить список">
            <OrdersIconButton aria-label="refresh list" onClick={handleRefresh}>
              <Refresh />
            </OrdersIconButton>
          </Tooltip>

          <OrdersButtonPrimary
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenCreateModal}
          >
            Создать задание
          </OrdersButtonPrimary>
        </OrdersActions>
      </OrdersHeader>

      {/* Фильтры и поиск */}
      <OrdersFilterPanel>
        <OrdersFilterRow>
          <OrdersSearchInput
            placeholder="Поиск заданий..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
          />

          <OrdersSelect size="small">
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
          </OrdersSelect>

          <OrdersSelect size="small">
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
          </OrdersSelect>
        </OrdersFilterRow>
      </OrdersFilterPanel>

      <OrdersInfoRow>
        <Typography variant="body2" color="text.secondary">
          Найдено заданий: {filteredAndSortedTasks.length}
        </Typography>
        {(searchTerm || statusFilter !== 'all') && (
          <OrdersResetButton
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
            }}
          >
            Сбросить фильтры
          </OrdersResetButton>
        )}
      </OrdersInfoRow>

      {error && (
        <OrdersErrorAlert severity="error" role="alert">
          Ошибка при загрузке заданий: {error}
        </OrdersErrorAlert>
      )}

      {paginatedTasks.length > 0 ? (
        <OrdersTaskList role="list">
          {paginatedTasks.map((task) => (
            <OrdersTaskItem
              key={task.id}
              role="listitem"
              tabIndex={0}
              onClick={() => navigate(`/orders/${task.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/orders/${task.id}`);
                }
              }}
              aria-label={`Задание ${task.title}`}
              sx={{
                position: 'relative',
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
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: '#000000' }}>
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
                  color={getStatusColor(typeof task.status === 'string' ? task.status : 'default')}
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
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {task.hours} TD
                  </Typography>
                </Box>
              </Box>

              {task?.categories.length > 0 && (
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
                          '&:hover': { backgroundColor: '#f0fdf4' },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </OrdersTaskItem>
          ))}
        </OrdersTaskList>
      ) : (
        <OrdersEmptyState role="alert">
          <OrdersEmptyIcon>
            <FilterList />
          </OrdersEmptyIcon>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Задания не найдены
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            {searchTerm || statusFilter !== 'all'
              ? 'Попробуйте изменить параметры поиска'
              : 'Создайте первое задание'}
          </Typography>
          <OrdersButtonPrimary
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenCreateModal}
          >
            Создать задание
          </OrdersButtonPrimary>
        </OrdersEmptyState>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5.5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Модальное окно создания задания */}
      <Dialog open={createModalOpen} onClose={handleCloseCreateModal} maxWidth="sm" fullWidth>
        <DialogTitle>Создать новое задание</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Название"
            value={newTask.title}
            onChange={(e) => handleNewTaskChange('title', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Описание"
            value={newTask.description}
            onChange={(e) => handleNewTaskChange('description', e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Часы (TD)"
            type="number"
            value={newTask.hours}
            onChange={(e) => handleNewTaskChange('hours', e.target.value)}
            fullWidth
            margin="normal"
            inputProps={{ min: 0 }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Статус</InputLabel>
            <Select
              label="Статус"
              value={newTask.status}
              onChange={(e) => handleNewTaskChange('status', e.target.value)}
              size="small"
            >
              <MenuItem value="open">Открытые</MenuItem>
              <MenuItem value="assigned">Назначенные</MenuItem>
              <MenuItem value="completed">Завершенные</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Категории</InputLabel>
            <Select
              multiple
              value={newTask.categories}
              label="Категории"
              onChange={(e) => handleNewTaskChange('categories', e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((id) => {
                    const category = categories.find((cat) => cat.id === id);
                    return (
                      <Chip
                        key={id}
                        label={category?.name ?? id}
                        size="small"
                        sx={{ bgcolor: '#f0fdf4', color: '#166534' }}
                      />
                    );
                  })}
                </Box>
              )}
              size="small"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <Checkbox checked={newTask.categories.includes(category.id)} />
                  <Typography>{category.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Срок"
            type="date"
            value={newTask.deadline}
            onChange={(e) => handleNewTaskChange('deadline', e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal}>Отмена</Button>
          <Button
            onClick={handleCreateTask}
            variant="contained"
            color="primary"
            disabled={!newTask.title || !newTask.deadline}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </OrdersRoot>
  );
}
