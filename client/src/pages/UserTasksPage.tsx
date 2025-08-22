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

  useEffect(() => {
    if (autoSelectTaskId && tasks.length > 0) {
      const taskToSelect = tasks.find((task) => task.id === autoSelectTaskId);
      if (taskToSelect) {
        void handleTaskSelect(taskToSelect);
        dispatch(clearAutoSelectTaskId());
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          maxWidth: '800px',
          mx: 'auto',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          mt: 4,
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const allUserTasks = [
    ...tasks,
    ...executedTasks.filter((executedTask) => !tasks.some((task) => task.id === executedTask.id)),
  ];

  return (
    <Box
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        mt: 4,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: 'text.primary' }}
      >
        Мои задачи
      </Typography>

      <Grid container spacing={2}>
        {/* Left Column - Task List */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              bgcolor: 'grey.100',
              borderRadius: 2,
              overflow: 'auto',
              boxShadow: 1,
            }}
          >
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                Список задач ({allUserTasks.length})
              </Typography>
            </Box>

            {allUserTasks.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">У вас пока нет задач</Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {allUserTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem
                      onClick={() => handleTaskSelect(task)}
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 1,
                        mx: 1,
                        mb: 1,
                        bgcolor:
                          selectedTask?.id === task.id ? 'primary.light' : 'background.paper',
                        '&:hover': {
                          bgcolor: selectedTask?.id === task.id ? 'primary.light' : 'grey.200',
                        },
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 'medium', color: 'text.primary' }}
                              noWrap
                            >
                              {task.title}
                            </Typography>
                            <Chip
                              label={getStatusText(task.status)}
                              color={getStatusColor(task.status)}
                              size="small"
                              sx={{ mt: 1, fontWeight: 'medium' }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {task.creator.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(task.created_at)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < allUserTasks.length - 1 && (
                      <Divider sx={{ mx: 2, bgcolor: 'grey.300' }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Right Column - Task Details and Chat */}
        <Grid item xs={12} md={7}>
          {selectedTask ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Task Details */}
              <Paper
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: 'text.primary', flexGrow: 1 }}
                  >
                    {selectedTask.title}
                  </Typography>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    {selectedTask.creator.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Box>
                <Chip
                  label={getStatusText(selectedTask.status)}
                  color={getStatusColor(selectedTask.status)}
                  size="small"
                  sx={{ mb: 2, fontWeight: 'medium' }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Описание
                    </Typography>
                    <Typography variant="body1" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                      {selectedTask.description}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Часы
                        </Typography>
                        <Typography variant="body1">{selectedTask.hours}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Дедлайн
                        </Typography>
                        <Typography variant="body1">{formatDate(selectedTask.deadline)}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Создатель
                        </Typography>
                        <Typography variant="body1">{selectedTask.creator.name}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Категории
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {selectedTask.categories?.map((category) => (
                            <Chip
                              key={category.id}
                              label={category.name}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: 'grey.400' }}
                            />
                          )) ?? <Typography variant="body2">Нет категорий</Typography>}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {/* Task Management Buttons */}
                {user && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    {selectedTask.status === 'assigned' && selectedTask.creatorId === user.id && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleStartTask(selectedTask)}
                        sx={{ borderRadius: 10, px: 3, textTransform: 'none' }}
                      >
                        Начать работу
                      </Button>
                    )}

                    {selectedTask.status === 'running' && selectedTask.creatorId === user.id && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteTask(selectedTask)}
                        sx={{ borderRadius: 10, px: 3, textTransform: 'none' }}
                      >
                        Завершить
                      </Button>
                    )}

                    {(selectedTask.status === 'assigned' || selectedTask.status === 'running') &&
                      selectedTask.creatorId === user.id && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelTask(selectedTask)}
                          sx={{ borderRadius: 10, px: 3, textTransform: 'none' }}
                        >
                          Отменить
                        </Button>
                      )}

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
                          sx={{ borderRadius: 10, px: 3, textTransform: 'none' }}
                        >
                          Оставить отзыв
                        </Button>
                      )}
                  </Box>
                )}
              </Paper>

              {/* Chat Section */}
              {selectedChatId && user && (
                <Paper
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    bgcolor: 'grey.100',
                    boxShadow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
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
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
              }}
            >
              <Box textAlign="center">
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Выберите задачу для просмотра
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
          targetUserName={`исполнителя задачи "${completedTaskForReview.title}"`}
          onSuccess={handleReviewSuccess}
        />
      )}
    </Box>
  );
};

export default UserTasksPage;
