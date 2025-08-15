import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
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
} from '@mui/material';
import { Search as SearchIcon, LogOut as LogoutIcon, Menu as MenuIcon } from 'lucide-react';
type NavbarProps = {
  isAuth: boolean;
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
  isAuth,
  userBalance,
  currentLanguage,
  searchQuery,
  onSearch,
  onLanguageChange,
  onLogoClick,
  onHowItWorksClick,
  onLogout,
  onLogin,
  onRegister,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuContent = (
    <>
      <Box sx={{ width: 250, p: 2 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          px: 1,
          mb: 2,
        }}
      >
        <SearchIcon style={{ marginRight: 8, color: '#888' }} size={20} />
        <InputBase
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          sx={{ width: '100%' }}
        />
      </Box>
      {isAuth ? (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Balance: {userBalance}
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              onLogout();
              setDrawerOpen(false);
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <Button
            color="inherit"
            onClick={() => {
              onHowItWorksClick();
              setDrawerOpen(false);
            }}
          >
            How it works
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              onLogin();
              setDrawerOpen(false);
            }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onRegister();
              setDrawerOpen(false);
            }}
          >
            Registration
          </Button>
        </>
      )}

      {/* Язык */}
      <Select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        size="small"
        sx={{ mt: 2, minWidth: 100 }}
      >
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="ru">RU</MenuItem>
        <MenuItem value="de">DE</MenuItem>
      </Select>
    </>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Лого */}
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={onLogoClick}
          >
            MyLogo
          </Typography>

          {isMobile ? (
            <>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Поиск */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  px: 1,
                  maxWidth: 400,
                  flexGrow: 1,
                }}
              >
                <SearchIcon style={{ marginRight: 8, color: '#888' }} size={20} />
                <InputBase
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  sx={{ width: '100%' }}
                />
              </Box>

              {isAuth ? (
                <>
                  <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
                    Balance: {userBalance}
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={onHowItWorksClick}>
                    How it works
                  </Button>
                  <Button color="inherit" onClick={onLogin}>
                    Log in
                  </Button>
                  <Button variant="contained" onClick={onRegister}>
                    Registration
                  </Button>
                </>
              )}

              {/* Выбор языка */}
              <Select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                size="small"
                sx={{ minWidth: 80 }}
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="ru">RU</MenuItem>
                <MenuItem value="de">DE</MenuItem>
              </Select>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Мобильное меню */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {menuContent}
      </Drawer>
    </>
  );
};
