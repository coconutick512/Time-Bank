import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignPage from '@/pages/SignPage/SignPage';
import { MainLayout } from '@/app/layout/ui/MainLayout';
import MainPage from '@/pages/MainPage/MainPage';
import ExecutorsPage from '@/pages/ExecutorPage/ExecutorsPage';
import OrdersPage from '@/pages/OrdersPage/OrdersPage';
import PersonalOrder from '@/pages/PersonalOrder/PersonalOrder';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import UserTasksPage from '@/pages/UserTasksPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import ProtectedRouter from './ProtectedRouter';

export default function Router(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<SignPage />} />
        <Route
          element={
            <ProtectedRouter
              allowedStatuses={['logged', 'loading', 'reject']}
              redirectTo="/login"
            />
          }
        >
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/executors" element={<ExecutorsPage />} />
          <Route path="/orders/:id" element={<PersonalOrder />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/tasks" element={<UserTasksPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
