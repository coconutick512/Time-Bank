import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignPage from '@/pages/SignPage';
import { MainLayout } from '@/app/layout/ui/MainLayout';

export default function Router(): React.JSX.Element {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<SignPage />} />
      </Route>
    </Routes>
  );
}
