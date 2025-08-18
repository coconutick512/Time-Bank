import { useState } from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line fsd-layers/no-import-from-top
import { useAppDispatch } from '@/app/store';
import { loginUser, registerUser } from '@/entities/user/model/userThunk';
import type { UserLogin, UserRegister } from '@/entities/user/types/schema';
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
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';

function SignPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<UserLogin>();

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm<UserRegister>();

  const handleLogin = async (data: UserLogin): Promise<void> => {
    await dispatch(loginUser(data));
    resetLogin();
  };

  const handleRegister = async (data: UserRegister): Promise<void> => {
    await dispatch(registerUser(data));
    resetRegister();
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Банк Времени
        </Typography>

        <Tabs
          value={activeTab}
          onChange={() => setActiveTab(!activeTab)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>

        {activeTab && (
          <Box component="form" onSubmit={handleLoginSubmit(handleLogin)} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              error={!!loginErrors.email}
              helperText={loginErrors.email?.message}
              {...loginRegister('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email',
                },
              })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              error={!!loginErrors.password}
              helperText={loginErrors.password?.message}
              {...loginRegister('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
              })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Войти
            </Button>
          </Box>
        )}

        {!activeTab && (
          <Box
            component="form"
            onSubmit={handleRegisterSubmit(handleRegister)}
            sx={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Имя"
              autoComplete="name"
              error={!!registerErrors.name}
              helperText={registerErrors.name?.message}
              {...registerRegister('name', {
                required: 'Имя обязательно',
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа',
                },
              })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              error={!!registerErrors.email}
              helperText={registerErrors.email?.message}
              {...registerRegister('email', {
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email',
                },
              })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              error={!!registerErrors.password}
              helperText={registerErrors.password?.message}
              {...registerRegister('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
              })}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default SignPage;
