import { useAppSelector } from '@/shared/hooks/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
type ProtectedRouterProps = {
  allowedStatuses: ('logged' | 'loading' | 'reject')[];
  redirectTo: string;
};

function ProtectedRouter({ allowedStatuses, redirectTo }: ProtectedRouterProps): React.JSX.Element {
  const userStatus = useAppSelector((state) => state.user.status);

  return allowedStatuses.includes(userStatus) ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default ProtectedRouter;
