import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignPage from '@/pages/SignPage';
import { MainLayout } from '@/app/layout/ui/MainLayout';
import MainPage from '@/pages/MainPage';
import ExecutorsPage from '@/pages/ExecutorsPage';
import OrdersPage from '@/pages/OrdersPage';
import PersonalOrder from '@/pages/PersonalOrder';

export default function Router(): React.JSX.Element {
  return (
    
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<SignPage />} />
        <Route path="/executors" element={<ExecutorsPage />} />
        <Route path="/orders/one/:id" element={<PersonalOrder />} />
      </Route>
    </Routes>
    
  );
}
