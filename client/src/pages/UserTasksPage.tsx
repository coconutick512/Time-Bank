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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { fetchUserTasks, fetchUserExecutedTasks } from '@/entities/tasks/model/tasksThunk';
import { fetchChat } from '@/entities/chat/model/chatThunk';
import { ChatWindow } from '@/widgets/chat/taskChat';
import type { Task } from '@/entities/tasks/types/schema';
import type { RootState } from '@/app/store';

const UserTasksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { tasks, executedTasks, status, error } = useAppSelector((state: RootState) => state.tasks);
  const { chat } = useAppSelector((state: RootState) => state.chat);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id) {
      void dispatch(fetchUserTasks(user.id));
      void dispatch(fetchUserExecutedTasks(user.id));
    }
  }, [dispatch, user?.id]);

  const handleTaskSelect = async (task: Task) => {
    setSelectedTask(task);
    try {
      // Fetch chat for the selected task
      const chat = await dispatch(fetchChat(task.id)).unwrap();
      setSelectedChatId(chat.id);
    } catch (error) {
      console.error('Failed to fetch chat:', error);
      setSelectedChatId(null);
    }
  };

  const getStatusColor = (
    status: string,
  ): 'primary' | 'warning' | 'success' | 'error' | 'default' => {
    switch (status) {
      case 'open':
        return 'primary';
      case 'assigned':
        return 'warning';
      case 'completed':
        return 'success';
      case 'canceled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Открыта';
      case 'assigned':
        return 'Назначена';
      case 'completed':
        return 'Завершена';
      case 'canceled':
        return 'Отменена';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) =>
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

  // Combine user tasks and executed tasks, removing duplicates
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
                      button
                      onClick={() => handleTaskSelect(task)}
                      selected={selectedTask?.id === task.id}
                      sx={{
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
                    <Typography variant="body1" paragraph>
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
                        {selectedTask.categories.map((category) => (
                          <Chip
                            key={category.id}
                            label={category.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
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
    </Box>
  );
};

export default UserTasksPage;
