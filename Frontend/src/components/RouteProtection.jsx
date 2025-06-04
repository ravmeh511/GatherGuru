import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Admin route protection
export function AdminProtectedRoute({ children }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn || !user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

// Organizer route protection
export function OrganizerProtectedRoute({ children }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn || !user || user.role !== 'organizer') {
    return <Navigate to="/organizer/login" replace />;
  }

  return children;
}

// Generic route protection with role check
export function ProtectedRoute({ children, requiredRole, redirectPath }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn || !user || user.role !== requiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

// PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

OrganizerProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Default exports
export default {
  AdminProtectedRoute,
  OrganizerProtectedRoute,
  ProtectedRoute,
}; 