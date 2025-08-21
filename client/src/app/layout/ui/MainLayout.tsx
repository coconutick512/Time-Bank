import React, { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooks';
import { logoutUser, fetchUser } from '@/entities/user/model/userThunk';
import { Navbar } from '@/widgets/navbar/ui/Navbar';
import { Footer } from '@/widgets/footer/ui/Footer';

export const MainLayout = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStatus = useAppSelector((state) => state.user.status);
  const user = useAppSelector((state) => state.user.user);
  const justLoggedOut = useRef(false);

  const isAuth = userStatus === 'logged';
  const balance = user?.balance ?? 0;
  const language = 'en';

  // Initialize user authentication on app start
  useEffect(() => {
    void dispatch(fetchUser());

    // if (userStatus === 'loading' && !justLoggedOut.current) {
    //   console.log('🔄 Attempting to fetch user session...');
    //   dispatch(fetchUser()).catch(() => {
    //     console.log('🚫 Failed to fetch user - staying as guest');
    //   });
    // }


    // if (userStatus !== 'guest') {
    //   justLoggedOut.current = false;
    // }
  }, [dispatch]);

  console.log('MainLayout Debug:', {
    userStatus,
    user,
    isAuth,
    balance,
  });

  const handleLogout = async (): Promise<void> => {
    
    console.log(' Logout clicked - current status:', userStatus);
    try {
      justLoggedOut.current = true;
      await dispatch(logoutUser()).unwrap();
      console.log(' Logout successful - navigating to home');
      navigate('/');
    } catch (error) {
      console.error(' Logout failed:', error);
      justLoggedOut.current = false;
    }
  };

  const handleLogin = (): void => {
    navigate('/login');
  };

  const handleRegister = (): void => {
    navigate('/login');
  };

  return (
    <>
      <Navbar
        currentLanguage={language}
        searchQuery=""
        onSearch={(q) => console.log('Search:', q)}
        onLanguageChange={(lang) => console.log('Lang:', lang)}
        onLogoClick={() => navigate('/')}
        onHowItWorksClick={() => navigate('/how-it-works')}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      <Outlet />
      <Footer />
    </>
  );
};
