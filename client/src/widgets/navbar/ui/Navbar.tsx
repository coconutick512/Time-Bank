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
;

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
  userBalance = 0,
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
    <Box sx={{ width: 280, p: 3 }}>
      {user ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#e0f2fe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <User size={20} color="#0369a1" />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Мой профиль
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={16} color="#10b981" style={{ marginRight: 4 }} />
                <Typography variant="body2" color="text.secondary">
                  {userBalance} TD
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
            onClick={() => {
              navigate('/create-task');
              setDrawerOpen(false);
            }}
          >
            Создать задание
          </Button>

          <Divider sx={{ my: 2 }} />

          <MenuItem
            onClick={() => {
              navigate('/orders');
              setDrawerOpen(false);
            }}
            sx={{ py: 1.5, borderRadius: 1 }}
          >
            Заказы
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate('/executors');
              setDrawerOpen(false);
            }}
            sx={{ py: 1.5, borderRadius: 1 }}
          >
            Исполнители
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate('/profile');
              setDrawerOpen(false);
            }}
            sx={{ py: 1.5, borderRadius: 1 }}
          >
            Настройки профиля
          </MenuItem>

          <Divider sx={{ my: 2 }} />

          <MenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
            sx={{ py: 1.5, borderRadius: 1, color: '#ef4444' }}
          >
            <LogoutIcon size={18} style={{ marginRight: 8 }} />
            Выйти
          </MenuItem>
        </>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Банк Времени
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
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
            sx={{ mb: 2 }}
            onClick={() => {
              onLogin();
              setDrawerOpen(false);
            }}
          >
            Войти
          </Button>

          <Divider sx={{ my: 2 }} />

          <MenuItem
            onClick={() => {
              onHowItWorksClick();
              setDrawerOpen(false);
            }}
            sx={{ py: 1.5, borderRadius: 1 }}
          >
            Как это работает
          </MenuItem>
        </>
      )}

      <Box sx={{ mt: 3 }}>
        <Select
          fullWidth
          size="small"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <MenuItem value="ru">Русский</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </Box>
    </Box>
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          color: '#111827',
          borderBottom: '1px solid #e5e7eb',
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 'lg',
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Логотип */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
              }}
            >
              <Clock color="#ffffff" size={20} />
            </Box>
            <Typography variant="h6" fontWeight="bold" noWrap>
              Банк Времени
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#374151' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Поиск */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f3f4f6',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  width: 300,
                  '&:focus-within': {
                    boxShadow: '0 0 0 2px #bfdbfe',
                  },
                }}
              >
                <SearchIcon size={18} color="#6b7280" style={{ marginRight: 8 }} />
                <InputBase
                  placeholder="Поиск услуг..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  sx={{
                    width: '100%',
                    '& input': {
                      py: 1,
                    },
                  }}
                />
              </Box>

              {user ? (
                <>
                  <Button
                    variant="text"
                    onClick={() => navigate('/executors')}
                    sx={{
                      color: '#111827',
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    }}
                  >
                    Исполнители
                  </Button>

                  <Button
                    variant="text"
                    onClick={() => navigate('/orders')}
                    sx={{
                      color: '#111827',
                      '&:hover': { backgroundColor: '#f3f4f6' },
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
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: '#e0f2fe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5,
                      }}
                    >
                      <User size={16} color="#0369a1" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Clock size={14} color="#10b981" style={{ marginRight: 4 }} />
                      <Typography variant="body2" fontWeight="medium">
                        {userBalance} TD
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="text"
                    onClick={() => dispatch(logoutUser())}
                    sx={{
                      color: '#ef4444',
                      ml: 2,
                      '&:hover': {
                        backgroundColor: '#fee2e2',
                      },
                    }}
                    startIcon={<LogoutIcon size={18} />}
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
                      color: '#111827',
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    }}
                  >
                    Как это работает
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={onLogin}
                    sx={{
                      color: '#111827',
                      borderColor: '#d1d5db',
                      '&:hover': { borderColor: '#9ca3af' },
                    }}
                  >
                    Войти
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{
                      bgcolor: '#3b82f6',
                      '&:hover': { bgcolor: '#2563eb' },
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
              width: 320,
              backgroundColor: '#f8fafc', // Светло-голубой фон как на главной
              boxShadow: 'xl',
              borderLeft: '1px solid #e2e8f0',
              '& .MuiMenuItem-root': {
                borderRadius: '8px',
                marginBottom: '4px',
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
              },
            },
          },
        }}
        ModalProps={{
          sx: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
          },
        }}
      >
        {menuContent}
      </Drawer>
    </>
  );
};
