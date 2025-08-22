import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { createSpecialTask, fetchCategories } from '@/entities/tasks/model/tasksThunk';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  Chip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { fetchUser } from '@/entities/user/model/userThunk';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  executorId: number; // Profile owner ID
  creatorId: number; // Current user ID (task creator)
  bookedDate: string;
};

export default function CreateTaskModal({
  isOpen,
  onClose,
  executorId,
  creatorId,
  bookedDate,
}: Props): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { categories, status } = useAppSelector((state) => state.tasks);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [hours, setHours] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Загружаем категории при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      void dispatch(fetchCategories());
    }
  }, [isOpen, dispatch]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(
      createSpecialTask({
        title,
        description,
        deadline,
        bookedDate,
        creator: { name: user?.name ?? '' },
        executorId,
        creatorId,
        status: 'open',
        id: 0,
        hours: Number(hours),
        created_at: Date.now().toString(),
        categories: selectedCategories.map((id) => ({
          id,
          name: categories.find((cat) => cat.id === id)?.name || '',
        })),
      }),
    )
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          onClose();
          setTitle('');
          setDescription('');
          setDeadline('');
          setHours('');
          setSelectedCategories([]);
        }
      })
      .then(() => void dispatch(fetchUser()));
  };

  const handleCategoryChange = (event: any) => {
    const { value } = event.target;
    setSelectedCategories(typeof value === 'string' ? value.split(',').map(Number) : value);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Новое задание</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Время: {new Date(bookedDate).toLocaleString()}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
            aria-required="true"
            aria-label="Название задания"
          />

          <TextField
            fullWidth
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
            required
            // rows={4}
            aria-required="true"
            aria-label="Описание задания"
          />

          <TextField
            fullWidth
            label="Дедлайн"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            aria-required="true"
            aria-label="Срок выполнения"
          />

          <TextField
            fullWidth
            label="Часы (тайм-доллары)"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            margin="normal"
            inputProps={{ min: 1 }}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Категории</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              label="Категории"
              onChange={handleCategoryChange}
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
                  <Checkbox checked={selectedCategories.includes(category.id)} />
                  <Typography>{category.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!title || !description || !deadline || !hours}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
}
