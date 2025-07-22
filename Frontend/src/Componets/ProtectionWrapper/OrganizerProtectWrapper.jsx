import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OrganizerProtectWrapper = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated || role !== 'organizer') {
    return <Navigate to="/organizer/login" />;
  }

  return children;
};

export default OrganizerProtectWrapper; 