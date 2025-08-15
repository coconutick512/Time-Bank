import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from "@/app/store";
import { loginUser, registerUser } from "@/entities/user/model/userThunk";
import { UserLogin, UserRegister } from "@/entities/user/types/schema";
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Person,
  Email,
  Lock
} from '@mui/icons-material';

function SignPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();


  const { 
    register: loginRegister, 
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin
  } = useForm<UserLogin>();

  const { 
    register: registerRegister, 
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister
  } = useForm<UserRegister>();

  const handleLogin = async (data: UserLogin): Promise<void> => {
    await dispatch(loginUser(data));
    resetLogin();
  };

  const handleRegister = async (data: UserRegister): Promise<void> => {
    await dispatch(registerUser(data));
    resetRegister();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ 
        mt: 8, 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <Typography variant="h5" gutterBottom>
          Банк Времени
        </Typography>
        
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>


        {activeTab === 0 && (
          <Box 
            component="form" 
            onSubmit={handleLoginSubmit(handleLogin)} 
            sx={{ width: '100%' }}
          >
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
                  message: 'Некорректный email'
                }
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
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
                  message: 'Минимум 6 символов'
                }
              })}
              InputProps={{
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
                )
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
          </Box>
        )}

        
        {activeTab === 1 && (
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
                  message: 'Минимум 2 символа'
                }
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                )
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
                  message: 'Некорректный email'
                }
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
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
                  message: 'Минимум 6 символов'
                }
              })}
              InputProps={{
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
                )
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
    </Container>
  );
}

export default SignPage;