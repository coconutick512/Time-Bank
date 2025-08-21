import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
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
import type { RootState } from '@/app/store';
import {
  StyledAppBar,
  StyledToolbar,
  LogoContainer,
  LogoIconContainer,
  MenuContainer,
  SearchContainer,
  SearchInput,
  ProfileContainer,
  ProfileIconContainer,
  DrawerPaper,
  DrawerMenuItem,
  ProfileBox,
  ProfileIconBox,
  CreateTaskButton,
  AuthButton,
  JoinButton,
  LogoutButton,
} from './Navbar.styles.ts';

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
          <ProfileBox>
            <ProfileIconBox>
              <User size={20} color="#0369a1" />
            </ProfileIconBox>
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
          </ProfileBox>

          <CreateTaskButton
            fullWidth
            variant="contained"
            onClick={() => {
              navigate('/create-task');
              setDrawerOpen(false);
            }}
          >
            Создать задание
          </CreateTaskButton>

          <Divider sx={{ my: 2 }} />

          <DrawerMenuItem
            onClick={() => {
              navigate('/orders');
              setDrawerOpen(false);
            }}
          >
            Заказы
          </DrawerMenuItem>

          <DrawerMenuItem
            onClick={() => {
              navigate('/executors');
              setDrawerOpen(false);
            }}
          >
            Исполнители
          </DrawerMenuItem>

          <DrawerMenuItem
            onClick={() => {
              navigate('/profile');
              setDrawerOpen(false);
            }}
          >
            Настройки профиля
          </DrawerMenuItem>

          <Divider sx={{ my: 2 }} />

          <DrawerMenuItem
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <LogoutIcon size={18} style={{ marginRight: 8 }} />
            Выйти
          </DrawerMenuItem>
        </>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Банк Времени
          </Typography>

          <JoinButton
            fullWidth
            variant="contained"
            onClick={() => {
              navigate('/register');
              setDrawerOpen(false);
            }}
          >
            Присоединиться
          </JoinButton>

          <AuthButton
            fullWidth
            variant="outlined"
            onClick={() => {
              onLogin();
              setDrawerOpen(false);
            }}
          >
            Войти
          </AuthButton>

          <Divider sx={{ my: 2 }} />

          <DrawerMenuItem
            onClick={() => {
              onHowItWorksClick();
              setDrawerOpen(false);
            }}
          >
            Как это работает
          </DrawerMenuItem>
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
      <StyledAppBar position="sticky" elevation={0}>
        <StyledToolbar>
          {/* Логотип */}
          <LogoContainer onClick={() => navigate('/')}>
            <LogoIconContainer>
              <Clock color="#ffffff" size={20} />
            </LogoIconContainer>
            <Typography variant="h6" fontWeight="bold" noWrap>
              Банк Времени
            </Typography>
          </LogoContainer>

          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#374151' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <MenuContainer>
              {/* Поиск */}
              <SearchContainer>
                <SearchIcon size={18} color="#6b7280" style={{ marginRight: 8 }} />
                <SearchInput
                  placeholder="Поиск услуг..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </SearchContainer>

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

                  <ProfileContainer onClick={() => navigate('/profile')}>
                    <ProfileIconContainer>
                      <User size={16} color="#0369a1" />
                    </ProfileIconContainer>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Clock size={14} color="#10b981" style={{ marginRight: 4 }} />
                      <Typography variant="body2" fontWeight="medium">
                        {userBalance} TD
                      </Typography>
                    </Box>
                  </ProfileContainer>

                  <LogoutButton
                    variant="text"
                    onClick={() => dispatch(logoutUser())}
                    startIcon={<LogoutIcon size={18} />}
                  >
                    Выйти
                  </LogoutButton>
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

                  <AuthButton variant="outlined" onClick={onLogin}>
                    Войти
                  </AuthButton>

                  <JoinButton variant="contained" onClick={() => navigate('/login')}>
                    Присоединиться
                  </JoinButton>
                </>
              )}
            </MenuContainer>
          )}
        </StyledToolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            component: DrawerPaper,
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
