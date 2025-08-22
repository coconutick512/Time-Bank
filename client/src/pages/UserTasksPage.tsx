import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  fetchUserTasks,
  fetchUserExecutedTasks,
  editTask,
} from '@/entities/tasks/model/tasksThunk';
import { fetchChat } from '@/entities/chat/model/chatThunk';
import { createReview } from '@/entities/reviews/model/reviewThunk';
import { ChatWindow } from '@/widgets/chat/taskChat';
import { ReviewModal } from '@/features/reviewModal/ui/ReviewModal';
import type { Task } from '@/entities/tasks/types/schema';
import type { RootState } from '@/app/store';
import { clearAutoSelectTaskId } from '@/entities/tasks/model/tasksSlice';

const UserTasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { tasks, executedTasks, status, error, autoSelectTaskId } = useAppSelector(
    (state: RootState) => state.tasks,
  );

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [completedTaskForReview, setCompletedTaskForReview] = useState<Task | null>(null);

  useEffect(() => {
    if (user?.id) {
      void dispatch(fetchUserTasks(user.id));
      void dispatch(fetchUserExecutedTasks(user.id));
    }
  }, [dispatch, user?.id]);

  // Auto-select task when autoSelectTaskId is set
  useEffect(() => {
    if (autoSelectTaskId && tasks.length > 0) {
      const taskToSelect = tasks.find((task) => task.id === autoSelectTaskId);
      if (taskToSelect) {
        void handleTaskSelect(taskToSelect);
        dispatch(clearAutoSelectTaskId()); // Clear the auto-select state
      }
    }
  }, [autoSelectTaskId, tasks, dispatch]);

  const handleTaskSelect = async (task: Task): Promise<void> => {
    setSelectedTask(task);
    try {
      const chatData = await dispatch(fetchChat(task.id)).unwrap();
      setSelectedChatId(chatData.id);
    } catch (error) {
      console.error('Failed to fetch chat:', error);
      setSelectedChatId(null);
    }
  };

  const handleStartTask = async (task: Task): Promise<void> => {
    try {
      await dispatch(
        editTask({
          id: task.id,
          title: task.title,
          description: task.description,
          status: 'running',
          executorId: task.executorId,
        }),
      ).unwrap();

      if (user?.id) {
        void dispatch(fetchUserTasks(user.id));
        void dispatch(fetchUserExecutedTasks(user.id));
      }

      setSelectedTask({ ...task, status: 'running' });
    } catch (error) {
      console.error('Failed to start task:', error);
    }
  };

  const handleCompleteTask = async (task: Task): Promise<void> => {
    try {
      await dispatch(
        editTask({
          id: task.id,
          title: task.title,
          description: task.description,
          status: 'completed',
          executorId: task.executorId,
        }),
      ).unwrap();

      if (user?.id) {
        void dispatch(fetchUserTasks(user.id));
        void dispatch(fetchUserExecutedTasks(user.id));
      }

      setSelectedTask({ ...task, status: 'completed' });

      // Show review modal for the executor
      if (task.executorId && task.executorId !== user?.id) {
        setCompletedTaskForReview(task);
        setShowReviewModal(true);
      }
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  const handleCancelTask = async (task: Task): Promise<void> => {
    try {
      await dispatch(
        editTask({
          id: task.id,
          title: task.title,
          description: task.description,
          status: 'open',
          executorId: task.executorId,
        }),
      ).unwrap();

      if (user?.id) {
        void dispatch(fetchUserTasks(user.id));
        void dispatch(fetchUserExecutedTasks(user.id));
      }

      setSelectedTask({ ...task, status: 'open' });
    } catch (error) {
      console.error('Failed to cancel task:', error);
    }
  };

  const handleReviewSuccess = (): void => {
    setShowReviewModal(false);
    setCompletedTaskForReview(null);
    console.log('Review submitted successfully!');
  };

  const getStatusColor = (
    taskStatus: string,
  ): 'primary' | 'warning' | 'success' | 'error' | 'default' => {
    switch (taskStatus) {
      case 'open':
        return 'primary';
      case 'assigned':
        return 'warning';
      case 'running':
        return 'info';
      case 'completed':
        return 'success';
      case 'canceled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (taskStatus: string): string => {
    switch (taskStatus) {
      case 'open':
        return 'Открыта';
      case 'assigned':
        return 'Назначена';
      case 'running':
        return 'В процессе';
      case 'completed':
        return 'Завершена';
      case 'canceled':
        return 'Отменена';
      default:
        return taskStatus;
    }
  };

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const allUserTasks = [
    ...tasks,
    ...executedTasks.filter((executedTask) => !tasks.some((task) => task.id === executedTask.id)),
  ];

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Мои задачи
      </Typography>

      <Grid container spacing={3} sx={{ flex: 1, minHeight: 0 }}>
        {/* Left Column - Task List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">Список задач ({allUserTasks.length})</Typography>
            </Box>

            {allUserTasks.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="textSecondary">У вас пока нет задач</Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {allUserTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem
                      onClick={() => handleTaskSelect(task)}
                      selected={selectedTask?.id === task.id}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'primary.light',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                          },
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box>
                            <Typography variant="subtitle1" noWrap>
                              {task.title}
                            </Typography>
                            <Chip
                              label={getStatusText(task.status)}
                              color={getStatusColor(task.status)}
                              size="small"
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {task.creator.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {formatDate(task.created_at)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < allUserTasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Right Column - Task Details and Chat */}
        <Grid item xs={12} md={8}>
          {selectedTask ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Task Details */}
              <Paper sx={{ mb: 2, p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {selectedTask.title}
                    </Typography>
                    <Chip
                      label={getStatusText(selectedTask.status)}
                      color={getStatusColor(selectedTask.status)}
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {selectedTask.creator.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Описание
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {selectedTask.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Часы
                      </Typography>
                      <Typography variant="body1">{selectedTask.hours}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Дедлайн
                      </Typography>
                      <Typography variant="body1">{formatDate(selectedTask.deadline)}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Создатель
                      </Typography>
                      <Typography variant="body1">{selectedTask.creator.name}</Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Категории
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {selectedTask.categories?.map((category) => (
                          <Chip
                            key={category.id}
                            label={category.name}
                            size="small"
                            variant="outlined"
                          />
                        )) ?? <Typography variant="body2">Нет категорий</Typography>}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Task Management Buttons */}
                {user && (
                  <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    {/* Start Task Button - Only for assigned tasks where user is creator */}
                    {selectedTask.status === 'assigned' && selectedTask.creatorId === user.id && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartTask(selectedTask)}
                      >
                        Начать работу
                      </Button>
                    )}

                    {/* Complete Task Button - Only for running tasks where user is creator */}
                    {selectedTask.status === 'running' && selectedTask.creatorId === user.id && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteTask(selectedTask)}
                      >
                        Завершить
                      </Button>
                    )}

                    {/* Cancel Task Button - Only for assigned/running tasks where user is creator */}
                    {(selectedTask.status === 'assigned' || selectedTask.status === 'running') &&
                      selectedTask.creatorId === user.id && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelTask(selectedTask)}
                        >
                          Отменить
                        </Button>
                      )}

                    {/* Review Button - Only for completed tasks where user is creator and there's an executor */}
                    {selectedTask.status === 'completed' &&
                      selectedTask.creatorId === user.id &&
                      selectedTask.executorId &&
                      selectedTask.executorId !== user.id && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setCompletedTaskForReview(selectedTask);
                            setShowReviewModal(true);
                          }}
                        >
                          Оставить отзыв
                        </Button>
                      )}
                  </Box>
                )}
              </Paper>

              {/* Chat Section */}
              {selectedChatId && user && (
                <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <ChatWindow chatId={selectedChatId} userId={user.id} />
                </Paper>
              )}
            </Box>
          ) : (
            <Paper
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}
            >
              <Box textAlign="center">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Выберите задачу для просмотра
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Нажмите на задачу в левой колонке, чтобы увидеть детали и чат
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Review Modal */}
      {completedTaskForReview && user && (
        <ReviewModal
          open={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setCompletedTaskForReview(null);
          }}
          taskId={completedTaskForReview.id}
          targetUserId={completedTaskForReview.executorId!}
          targetUserName={`Исполнитель задачи "${completedTaskForReview.title}"`}
          onSuccess={handleReviewSuccess}
        />
      )}
    </Box>
  );
};

export default UserTasksPage;
