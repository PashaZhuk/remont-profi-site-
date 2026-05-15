import { Navigate } from 'react-router-dom';
import { storage } from '@/utils/storage';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!storage.isAdmin()) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
}
