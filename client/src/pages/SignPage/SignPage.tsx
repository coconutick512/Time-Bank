import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchUser, loginUser, registerUser, submitAnceta } from '@/entities/user/model/userThunk';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import type { UserLogin, UserRegister } from '@/entities/user/types/schema';
import { fetchAllSkills } from '@/entities/skills/model/skillsThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';

const timeZones = [
  'UTC',
  'Europe/Moscow',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Australia/Sydney',
];

type FormData = {
  name: string;
  email: string;
  password: string;
  city: string;
  timezone: string;
  teachingCategories: number[];
  bio: string;
  avatarFile?: FileList;
};

function SignPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    skills,
    status: skillsLoading,
    error: skillsError,
  } = useAppSelector((state) => state.skills);
  const { user, status: userLoading } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      city: '',
      timezone: '',
      teachingCategories: [],
      bio: '',
    },
  });

  const teachingCategories = watch('teachingCategories');

  useEffect(() => {
    void dispatch(fetchAllSkills());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/orders');
    }
  }, [user, navigate]);

  const onLogin = async (data: UserLogin) => {
    try {
      setLoading(true);
      setError('');
      await dispatch(loginUser(data)).unwrap();
      navigate('/orders');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data: FormData) => {
    try {
      setLoading(true);
      setError('');

      const profileData = new FormData();
      profileData.append('city', data.city);
      profileData.append('time', data.timezone);
      profileData.append('about', data.bio);
      profileData.append('skills', JSON.stringify(data.teachingCategories));

      if (avatarFile) {
        profileData.append('avatar', avatarFile);
      }

      await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      );
      await dispatch(submitAnceta(profileData));

      await dispatch(fetchUser());
      navigate('/orders');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSkillToggle = (skillId: number) => {
    const current = teachingCategories || [];
    const newCategories = current.includes(skillId)
      ? current.filter((id: number) => id !== skillId)
      : [...current, skillId];

    setValue('teachingCategories', newCategories);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setError('');
    reset();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: '400px',
          width: '100%',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
        elevation={3}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: 'text.primary' }}
        >
          Банк Времени
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              borderRadius: 1,
            },
            '& .Mui-selected': {
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
            },
          }}
        >
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
            {error}
          </Alert>
        )}

        {activeTab === 0 && (
          <Box
            component="form"
            onSubmit={handleSubmit(onLogin)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email',
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'grey.50', borderRadius: 1 }}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOff sx={{ color: 'text.secondary' }} />
                      ) : (
                        <Visibility sx={{ color: 'text.secondary' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'grey.50', borderRadius: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: 10,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 'medium',
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Войти'}
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box
            component="form"
            onSubmit={handleSubmit(onRegister)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Имя"
              margin="normal"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Имя обязательно',
                minLength: { value: 2, message: 'Минимум 2 символа' },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'grey.50', borderRadius: 1 }}
            />

            <TextField
              label="Email"
              margin="normal"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email',
                },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'grey.50', borderRadius: 1 }}
            />

            <TextField
              label="Пароль"
              margin="normal"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: { value: 6, message: 'Минимум 6 символов' },
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOff sx={{ color: 'text.secondary' }} />
                      ) : (
                        <Visibility sx={{ color: 'text.secondary' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ borderRadius: 1 }}
            />

            <TextField
              label="Город"
              margin="normal"
              fullWidth
              {...register('city')}
              placeholder="Введите ваш город"
              sx={{ bgcolor: 'grey.50', borderRadius: 1 }}
            />

            <FormControl fullWidth margin="normal" error={!!errors.timezone}>
              <InputLabel>Часовой пояс</InputLabel>
              <Select
                label="Часовой пояс"
                {...register('timezone')}
                defaultValue=""
                sx={{ borderRadius: 1 }}
              >
                <MenuItem value="" disabled>
                  Выберите часовой пояс
                </MenuItem>
                {timeZones.map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </Select>
              {errors.timezone && <FormHelperText>{errors.timezone.message}</FormHelperText>}
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <InputLabel sx={{ mb: 1, color: 'text.secondary' }}>Аватар</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ marginTop: '8px', width: '100%' }}
              />
            </Box>

            <Typography
              variant="subtitle1"
              sx={{ mt: 2, fontWeight: 'medium', color: 'text.primary' }}
            >
              Навыки, которые могу преподать:
            </Typography>

            {skillsLoading === 'loading' ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : skillsError ? (
              <Alert severity="error" sx={{ borderRadius: 1, my: 2 }}>
                Ошибка загрузки навыков
              </Alert>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  maxHeight: 150,
                  overflowY: 'auto',
                  p: 2,
                  borderRadius: 1,
                }}
              >
                {skills.map((skill) => {
                  const checked = teachingCategories.includes(skill.id);
                  return (
                    <Button
                      key={skill.id}
                      variant={checked ? 'contained' : 'outlined'}
                      color={checked ? 'primary' : 'inherit'}
                      onClick={() => handleSkillToggle(skill.id)}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 10,
                        px: 2,
                        py: 0.5,
                        bgcolor: checked ? 'primary.main' : 'grey.200',
                        '&:hover': { bgcolor: checked ? 'primary.dark' : 'grey.300' },
                      }}
                    >
                      {skill.name}
                    </Button>
                  );
                })}
              </Box>
            )}

            <TextField
              label="О себе"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              {...register('bio')}
              placeholder="Расскажите о себе, своих компетенциях и опыте..."
              sx={{ bgcolor: 'grey.50', borderRadius: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{
                mt: 3,
                borderRadius: 10,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 'medium',
                bgcolor: 'secondary.main',
                '&:hover': { bgcolor: 'secondary.dark' },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default SignPage;
