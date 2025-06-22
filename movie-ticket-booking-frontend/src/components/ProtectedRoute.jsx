import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roles: allowedRoles = [] }) {
  const { token, roles, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.some(role => roles.includes(role))) {
    // User is logged in but does not have required role
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
