import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import Organizers from './pages/Organizers';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './redux/slices/authSlice';
import AdminProtectedRoute from './components/ProtectedRoute';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#2B293D',
    },
    secondary: {
      main: '#FFE047',
    },
  },
});

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  // Prevent infinite redirects by checking the current path
  const getHomeRedirect = () => {
    // If we're already at login or dashboard, don't redirect
    if (location.pathname === '/admin/login' || location.pathname === '/admin/dashboard') {
      return null;
    }
    return isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/admin/login" replace />;
  };

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={getHomeRedirect()} />
        
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin />
            )
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route 
          path="*" 
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          } 
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
