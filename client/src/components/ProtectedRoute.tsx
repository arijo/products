import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole: 'ADMIN';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { role } = useSelector((state: RootState) => state.auth);

  if (!role) {
    return <Navigate to="/signin" replace />;
  }
  
  if (role !== requiredRole) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default ProtectedRoute;