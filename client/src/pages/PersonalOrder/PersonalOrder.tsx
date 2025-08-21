import { deleteTask, editTask, fetchTask } from '@/entities/tasks/model/tasksThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Skeleton, Button } from '@mui/material';
import { Schedule, Person, Category } from '@mui/icons-material';
import type { TasksState, TaskUpdate } from '@/entities/tasks/types/schema';
import { useNavigate, useParams } from 'react-router-dom';
import type { UserState } from '@/entities/user/types/schema';
import { fetchUser } from '@/entities/user/model/userThunk';
import { EditTaskModal } from '@/features/taskCreate/ui/EditTaskModal';
import { createChat, fetchChat } from '@/entities/chat/model/chatThunk';
import { ChatWindow } from '@/widgets/chat/taskChat';
import type { ChatState } from '@/entities/chat/types/schema';
import './PersonalOrder.css';

type RootState = {
  tasks: TasksState;
  user: UserState;
  chat: ChatState;
};

export default function PersonalOrder(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, personalTask } = useAppSelector((state: RootState) => state.tasks);
  const { user } = useAppSelector((state: RootState) => state.user);
  const chat = useAppSelector((state: RootState) => state.chat);
  console.log('_________________________', chat);

  const { id } = useParams();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [chatId, setChatId] = useState<number | null>(null);

  useEffect(() => {
    if (personalTask?.status !== 'open' && personalTask?.id) {
      void dispatch(fetchChat(personalTask.id)).then((action) => {
        if (fetchChat.fulfilled.match(action)) {
          setChatId(action.payload.id);
        } else {
          // создать чат, если не нашли
          void dispatch(createChat(personalTask.id)).then((newChatAction) => {
            if (createChat.fulfilled.match(newChatAction)) {
              setChatId(newChatAction.payload.id);
            }
          });
        }
      });
    }
  }, [personalTask, dispatch]);

  useEffect(() => {
    if (id) {
      void dispatch(fetchTask(id));
      void dispatch(fetchUser());
    }
  }, [dispatch, id]);

  const handleEditSave = (data: TaskUpdate): void => {
    void dispatch(editTask(data));
    setIsEditOpen(false);
  };

  const handleExecutorSave = (data: TaskUpdate): void => {
    void dispatch(editTask(data));
    window.location.reload();
  };

  if (status === 'loading' || !personalTask) {
    return (
      <Box className="po-skeleton-container">
        <Skeleton variant="text" height={40} className="po-skeleton-text" />
        <Skeleton variant="rectangular" height={180} className="po-skeleton-rect" />
      </Box>
    );
  }

  console.log('PersonalTask:', personalTask);
  console.log('User:', user);

  return (
    <>
      <Box className="po-root">
        <Box className="po-header">
          <Typography variant="h5" component="h1" className="po-title">
            {personalTask.title}
          </Typography>
          <Chip
            label={
                    personalTask.status === 'open'
                      ? 'Открыто'
                      : personalTask.status === 'assigned'
                      ? 'Назначено'
                      : personalTask.status === 'running'
                      ? 'В процессе'
                      : personalTask.status === 'completed'
                      ? 'Завершено'
                      : 'Проверка'
                  }
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

        <Typography className="po-description">{personalTask.description}</Typography>

        <Box className="po-info-row">
          <Box className="po-info-item">
            <Schedule fontSize="small" />
            <Typography variant="body2" className="po-info-text">
              {new Date(personalTask.deadline).toLocaleDateString()}
            </Typography>
          </Box>
          <Box className="po-info-item">
            <Person fontSize="small" />
            <Typography variant="body2" className="po-info-text">
              {personalTask.creator.name}
            </Typography>
          </Box>
        </Box>

        {personalTask.categories.length > 0 && (
          <Box className="po-categories-section">
            <Typography variant="subtitle2" className="po-categories-title">
              <Category fontSize="small" />
              Категории:
            </Typography>
            <Box className="po-categories-list">
              {personalTask.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  size="small"
                  className="po-category-chip"
                />
              ))}
            </Box>

            {(personalTask.creatorId === user?.id || personalTask.executorId === user?.id) && personalTask.status === 'assigned' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={() => {
                    void dispatch(
                      editTask({
                        id: personalTask.id,
                        title: personalTask.title,
                        description: personalTask.description,
                        status: 'open',
                        executorId: personalTask.executorId,
                      }),
                    );
                    void dispatch(fetchTask(personalTask.id));
                  }}
                >
                  отказаться
                </Button>
              </Box>
            )}

            {personalTask.creatorId === user?.id && personalTask.status === 'assigned' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={() => {
                    void dispatch(
                      editTask({
                        id: personalTask.id,
                        title: personalTask.title,
                        description: personalTask.description,
                        status: 'running',
                        executorId: personalTask.executorId,
                      }),
                    );
                    void dispatch(fetchTask(personalTask.id));
                  }}
                >
                  Начать работу
                </Button>
              </Box>
            )}


            {personalTask.status === 'running' && personalTask.creatorId === user?.id && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={() => {
                    void dispatch(
                      editTask({
                        id: personalTask.id,
                        title: personalTask.title,
                        description: personalTask.description,
                        status: 'completed',
                        executorId: personalTask.executorId,
                      }),
                    );
                    
                    void dispatch(fetchTask(personalTask.id));
                  }}
                >
                  Завершить
                </Button>
              </Box>
            )}
          </Box>
        )}

        {personalTask.creatorId === user?.id && personalTask.status === 'open' && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={() => setIsEditOpen(true)}>Редактировать</Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                onClick={() => {
                  void dispatch(deleteTask(personalTask.id));
                  navigate('/orders');
                  void dispatch(fetchUser());
                }}
              >
                Удалить
              </Button>
            </Box>
          </>
        )}

        {personalTask.status === 'open' && personalTask.creatorId !== user?.id && (
          <Box className="po-btns-row">
            <Button
              onClick={() =>
                handleExecutorSave({ ...personalTask, status: 'assigned', executorId: user?.id })
              }
              className="po-btn-take"
            >
              Взять в работу
            </Button>
          </Box>
        )}
      </Box>
      {personalTask.status !== 'open' &&
        chatId &&
        (personalTask.creatorId === user?.id || personalTask.executorId === user?.id) && (
          <ChatWindow chatId={chatId} userId={user?.id ?? 0} />
        )}
      <EditTaskModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={personalTask.title}
        description={personalTask.description}
        onSave={handleEditSave}
        id={personalTask.id}
      />
    </>
  );
}
