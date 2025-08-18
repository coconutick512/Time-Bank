import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';
import type { TaskUpdate } from '@/entities/tasks/types/schema';
import { useNavigate } from 'react-router-dom';

type EditTaskModalProps = {
  id: number;
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (updatedTask: TaskUpdate) => void;
};

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  onClose,
  id: initialId,
  title: initialTitle,
  description: initialDescription,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [id, setId] = useState(initialId);

  const navigate = useNavigate();
  // Синхронизация состояния при открытии модалки
  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      setId(initialId);
    }
  }, [open, initialId, initialTitle, initialDescription]);

  const handleSave = (): void => {
    onSave({ id, title, description });
    onClose();
    navigate(`/orders`);
    // СДЕЛАТЬ ТАК, ЧТОБЫ НАВИГИРОВАЛ НА СТРАНИЦУ ЗАКЗОВ САМОГО ЮЗЕРА, А НЕ ВСЕ
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Редактировать задание
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Заголовок"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Описание"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>
              Отмена
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Сохранить
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};
