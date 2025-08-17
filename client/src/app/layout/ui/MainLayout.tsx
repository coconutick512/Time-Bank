import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/widgets/navbar/ui/Navbar';
import { Footer } from '@/widgets/footer/ui/Footer';
import { useAppSelector } from '@/shared/hooks/hooks';
import type { RootState } from '@/app/store';

export const MainLayout = (): React.JSX.Element => {
  const {user} = useAppSelector((state: RootState) => state.user);
  const language = 'en';

  return (
    <>
      <Navbar
        isAuth={user !== null}
        userBalance={user?.balance}
        currentLanguage={language}
        searchQuery=""
        onSearch={(q) => console.log('Search:', q)}
        onLanguageChange={(lang) => console.log('Lang:', lang)}
        onLogoClick={() => console.log('Go home')}
        onHowItWorksClick={() => console.log('Open how it works')}
        onLogin={() => console.log('Login')}
        onRegister={() => console.log('Register')}
        onLogout={() => console.log('Logout')}
      />
      <Outlet />
      <Footer />
    </>
  );
};
