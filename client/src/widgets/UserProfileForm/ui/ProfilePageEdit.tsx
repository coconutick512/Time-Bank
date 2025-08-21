import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { fetchUser, updateProfile } from '@/entities/user/model/userThunk';
import type { User } from '@/entities/user/types/schema';
import type { Skill } from '@/entities/skills/types/schema';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';

type Props = {
  user: User;
  skills: Skill[];
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ProfileEditForm({
  user,
  skills,
  onCancel,
  onSuccess,
}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user.name || '',
    city: user.city ?? '',
    timezone: user.timezone ?? '',
    about: user.about ?? '',
    availableDates: user.availableDates ?? [],
  });
  const [selectedSkills, setSelectedSkills] = useState<number[]>(
    skills?.map((skill) => skill.id) || [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.avatar ? `http://localhost:3000/api/uploads/avatars/${user.avatar}` : null,
  );
  const currentUser = useAppSelector((state) => state.user.user);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('city', formData.city || '');
      formDataToSend.append('timezone', formData.timezone || '');
      formDataToSend.append('about', formData.about || '');
      formDataToSend.append('availableDates', JSON.stringify(formData.availableDates || []));
      formDataToSend.append('skillIds', JSON.stringify(selectedSkills || []));

      if (selectedFile) {
        formDataToSend.append('avatar', selectedFile);
      }

      console.log('Sending skillIds:', selectedSkills);
      console.log('Sending skillIds JSON:', JSON.stringify(selectedSkills || []));

      await dispatch(updateProfile(formDataToSend)).unwrap();
      await dispatch(fetchUser()).unwrap();

      onSuccess();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = (): void => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDateChange = (date: Date, isSelected: boolean): void => {
    const dateStr = date.toISOString();
    setFormData((prev) => ({
      ...prev,
      availableDates: isSelected
        ? [...prev.availableDates, dateStr]
        : prev.availableDates.filter((d) => d !== dateStr),
    }));
  };

  const handleSkillToggle = (skillId: number): void => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId],
    );
  };
  const status = useAppSelector((state) => state.user.status);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4, bgcolor: 'white' }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'text.primary' }}>
        Редактировать профиль
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        {/* Avatar Section */}
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}>
            Фото профиля
          </InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={previewUrl || undefined}
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'white',
                border: '2px solid',
                borderColor: 'grey.300',
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main' },
              }}
              onClick={handleAvatarClick}
            >
              {!previewUrl && <PhotoCamera fontSize="large" color="action" />}
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleAvatarClick}
                startIcon={<PhotoCamera />}
                size="small"
              >
                Выбрать фото
              </Button>
              {previewUrl && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveAvatar}
                  startIcon={<Delete />}
                  size="small"
                >
                  Удалить
                </Button>
              )}
            </Box>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB
          </Typography>
        </Box>

        {/* Name Field */}
        <TextField
          label="Имя"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          variant="outlined"
          fullWidth
          required
          sx={{ bgcolor: 'white' }}
        />

        {/* City Field */}
        <TextField
          label="Город"
          value={formData.city}
          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
          variant="outlined"
          fullWidth
          sx={{ bgcolor: 'white' }}
        />

        {/* Timezone Field */}
        <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'white' }}>
          <InputLabel>Часовой пояс</InputLabel>
          <Select
            value={formData.timezone}
            onChange={(e) => setFormData((prev) => ({ ...prev, timezone: e.target.value }))}
            label="Часовой пояс"
          >
            <MenuItem value="">Выберите часовой пояс</MenuItem>
            <MenuItem value="UTC">UTC</MenuItem>
            <MenuItem value="Europe/Moscow">Europe/Moscow</MenuItem>
            <MenuItem value="America/New_York">America/NewYork</MenuItem>
            <MenuItem value="America/LosAngeles">America/LosAngeles</MenuItem>
            <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
            <MenuItem value="Australia/Sydney">Australia/Sydney</MenuItem>
          </Select>
        </FormControl>

        {/* About Field */}
        <TextField
          label="О себе"
          value={formData.about}
          onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          placeholder="Расскажите о себе..."
          sx={{ bgcolor: 'white' }}
        />

        {/* Skills Section */}
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}>Навыки</InputLabel>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            {skills.map((skill) => (
              <FormControlLabel
                key={skill.id}
                control={
                  <Checkbox
                    checked={selectedSkills.includes(skill.id)}
                    onChange={() => handleSkillToggle(skill.id)}
                    color="primary"
                  />
                }
                label={skill.name}
              />
            ))}
          </Box>
        </Box>

        {/* Available Dates Section */}
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}>
            Доступные даты
          </InputLabel>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Выберите даты, когда вы доступны для выполнения задач
          </Typography>
          <TextField
            type="date"
            onChange={(e) => {
              const date = new Date(e.target.value);
              handleDateChange(date, true);
            }}
            variant="outlined"
            fullWidth
            sx={{ bgcolor: 'white' }}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              Выбранные даты:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.availableDates.map((dateStr) => (
                <Box
                  key={`date-${dateStr}`}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem',
                  }}
                >
                  {new Date(dateStr).toLocaleDateString()}
                  <IconButton
                    size="small"
                    onClick={() => handleDateChange(new Date(dateStr), false)}
                    sx={{ ml: 1, color: 'primary.main' }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 3 }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={isSubmitting}
            sx={{ bgcolor: 'white', borderColor: 'grey.300', color: 'text.primary' }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
