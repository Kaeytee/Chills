// AdminRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

interface RootState {
  auth: {
    user: {
      role?: string;
    } | null;
  };
}

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;