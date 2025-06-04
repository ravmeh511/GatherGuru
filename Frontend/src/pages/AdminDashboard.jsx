import React from 'react';
import { Box, Typography } from '@mui/material';

function AdminDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the admin dashboard. More features coming soon!
      </Typography>
    </Box>
  );
}

export default AdminDashboard; 