/* eslint-disable fsd-layers/no-import-from-top */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  MenuItem,
  Select,
  Button,
  Divider,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  LogOut as LogoutIcon,
  Menu as MenuIcon,
  User,
  Clock,
} from 'lucide-react';
import { logoutUser } from '@/entities/user/model/userThunk';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { RootState } from '@/app/store';
import mail from '@/public/mail.png';
import ship from '@/public/watches.svg';

type NavbarProps = {
  userBalance?: number;
  currentLanguage: string;
  searchQuery: string;
  onSearch: (query: string) => void;
  onLanguageChange: (language: string) => void;
  onLogoClick: () => void;
  onHowItWorksClick: () => void;
  onLogout: () => void;
  onLogin: () => void;
  onRegister: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  searchQuery,
  onSearch,
  onLanguageChange,
  onHowItWorksClick,
  onLogin,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, user } = useAppSelector((state: RootState) => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuContent = (
    <Box
      sx={{
        width: { xs: '80vw', sm: 280 },
        maxWidth: 320,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        bgcolor: 'background.paper',
        borderRadius: 2,
        m: 1,
      }}
    >
      {user ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'grey.100',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
              }}
            >
              <img
                src={
                  user.avatar
                    ? `http://localhost:3000/api/uploads/avatars/${user.avatar}`
                    : '/default-avatar.png'
                }
                alt="avatar"
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                Мой профиль
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Clock size={14} color="#10b981" />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user.balance} TD
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 10,
              py: 1,
              textTransform: 'none',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            onClick={() => {
              navigate('/create-task');
              setDrawerOpen(false);
            }}
          >
            Создать задание
          </Button>

          <Divider sx={{ my: 1, bgcolor: 'grey.300' }} />

          <MenuItem
            onClick={() => {
              navigate('/orders');
              setDrawerOpen(false);
            }}
            sx={{
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'grey.100' },
              transition: 'background-color 0.2s',
            }}
          >
            Заказы
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate('/executors');
              setDrawerOpen(false);
            }}
            sx={{
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'grey.100' },
              transition: 'background-color 0.2s',
            }}
          >
            Исполнители
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate('/profile');
              setDrawerOpen(false);
            }}
            sx={{
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'grey.100' },
              transition: 'background-color 0.2s',
            }}
          >
            Настройки профиля
          </MenuItem>

          <Divider sx={{ my: 1, bgcolor: 'grey.300' }} />

          <MenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            sx={{
              py: 1,
              borderRadius: 1,
              color: 'error.main',
              '&:hover': { bgcolor: 'error.light' },
              transition: 'background-color 0.2s',
            }}
          >
            <LogoutIcon size={16} style={{ marginRight: 8 }} />
            Выйти
          </MenuItem>
        </>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 'medium', color: 'text.primary', textAlign: 'center' }}
          >
            Банк Времени
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 1,
              borderRadius: 10,
              py: 1,
              textTransform: 'none',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
            onClick={() => {
              navigate('/register');
              setDrawerOpen(false);
            }}
          >
            Присоединиться
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mb: 1,
              borderRadius: 10,
              py: 1,
              textTransform: 'none',
              borderColor: 'grey.400',
              color: 'text.primary',
              '&:hover': { bgcolor: 'grey.100', borderColor: 'grey.500' },
            }}
            onClick={() => {
              onLogin();
              setDrawerOpen(false);
            }}
          >
            Войти
          </Button>

          <Divider sx={{ my: 1, bgcolor: 'grey.300' }} />

          <MenuItem
            onClick={() => {
              onHowItWorksClick();
              setDrawerOpen(false);
            }}
            sx={{
              py: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: 'grey.100' },
              transition: 'background-color 0.2s',
            }}
          >
            Как это работает
          </MenuItem>
        </>
      )}

      <Box sx={{ mt: 2 }}>
        <Select
          fullWidth
          size="small"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          sx={{
            borderRadius: 1,
            bgcolor: 'grey.50',
            '& .MuiSelect-select': { py: 1 },
          }}
        >
          <MenuItem value="ru disparity: 0px 0px 4px 4px"></MenuItem>;
          <MenuItem value="ru">Русский</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          color: 'text.primary',
          py: 1.5,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: '1200px',
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Логотип */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.9 },
              gap: 1,
            }}
          >
            <img src={ship} alt="logo" style={{ width: '28px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }} noWrap>
              Time Bank
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary', '&:hover': { bgcolor: 'grey.100' } }}
            >
              <MenuIcon size={24} />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Button
                variant="text"
                onClick={() => navigate('/tasks')}
                sx={{
                  color: 'text.primary',
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <img src={mail} alt="tasks" style={{ width: '22px', mr: 1 }} />
                Задачи
              </Button>

              {user ? (
                <>
                  <Button
                    variant="text"
                    onClick={() => navigate('/executors')}
                    sx={{
                      color: 'text.primary',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    Исполнители
                  </Button>

                  <Button
                    variant="text"
                    onClick={() => navigate('/orders')}
                    sx={{
                      color: 'text.primary',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    Заказы
                  </Button>

                  <Box
                    onClick={() => navigate('/profile')}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: 'grey.100',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1,
                      }}
                    >
                      <img
                        src={
                          user.avatar
                            ? `http://localhost:3000/api/uploads/avatars/${user.avatar}`
                            : '/default-avatar.png'
                        }
                        alt="avatar"
                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Clock size={14} color="#10b981" />
                      <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
                        {user.balance} TD
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="text"
                    onClick={() => dispatch(logoutUser())}
                    sx={{
                      color: 'error.main',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      '&:hover': { bgcolor: 'error.light' },
                    }}
                    startIcon={<LogoutIcon size={16} />}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="text"
                    onClick={onHowItWorksClick}
                    sx={{
                      color: 'text.primary',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                    }}
                  >
                    Как это работает
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={onLogin}
                    sx={{
                      color: 'text.primary',
                      borderColor: 'grey.400',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      '&:hover': { bgcolor: 'grey.100', borderColor: 'grey.500' },
                    }}
                  >
                    Войти
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                  >
                    Присоединиться
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '80vw', sm: 280 },
              maxWidth: 320,
              bgcolor: 'background.paper',
              borderRadius: '16px 0 0 16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              p: 1,
              m: 1,
            },
          },
        }}
        ModalProps={{
          sx: {
            '& .MuiBackdrop-root': {
              bgcolor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        }}
      >
        {menuContent}
      </Drawer>
    </>
  );
};