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
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import type { UserLogin, UserRegister } from '@/entities/user/types/schema';
import './SignPage.css';
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

interface FormData {
  name: string;
  email: string;
  password: string;
  city: string;
  timezone: string;
  teachingCategories: number[];
  bio: string;
  avatarFile?: FileList;
}

function SignPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { skills, status: skillsLoading, error: skillsError } = useAppSelector((state) => state.skills);
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

      // Регистрация пользователя
      
      // Заполнение профиля
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
          password: data.password 
        })
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

  if (userLoading === 'loading' ) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="sign-root">
      <Paper className="sign-paper" elevation={3}>
        <Typography className="sign-title" variant="h4" gutterBottom>
          Банк Времени
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          className="sign-tabs"
        >
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {activeTab === 0 && (
          <Box 
            component="form" 
            onSubmit={handleSubmit(onLogin)} 
            className="sign-form"
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
                    <Email />
                  </InputAdornment>
                ),
              }}
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
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              className="sign-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Войти'}
            </Button>
          </Box>
        )}

        {activeTab === 1 && (
          <Box
            component="form"
            onSubmit={handleSubmit(onRegister)}
            className="sign-form"
            noValidate
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
                    <Person />
                  </InputAdornment>
                ),
              }}
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
                    <Email />
                  </InputAdornment>
                ),
              }}
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
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Город"
              margin="normal"
              fullWidth
              {...register('city')}
              placeholder="Введите ваш город"
            />

            <FormControl fullWidth margin="normal" error={!!errors.timezone}>
              <InputLabel>Часовой пояс</InputLabel>
              <Select 
                label="Часовой пояс" 
                {...register('timezone')}
                defaultValue=""
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
              {errors.timezone && (
                <FormHelperText>{errors.timezone.message}</FormHelperText>
              )}
            </FormControl>

            <Box margin="normal">
              <InputLabel>Аватар</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ marginTop: '8px' }}
              />
            </Box>

            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Навыки, которые могу преподать:
            </Typography>
            
            {skillsLoading === 'loading' ? (
              <CircularProgress />
            ) : skillsError ? (
              <Alert severity="error">Ошибка загрузки навыков</Alert>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  maxHeight: 150,
                  overflowY: 'auto',
                  mb: 2,
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
                      sx={{ textTransform: 'none' }}
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
            />

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              color="secondary" 
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>
          </Box>
        )}
      </Paper>
    </div>
  );
}

export default SignPage;