import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Events = () => {
  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Events Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Here you can manage all events in the system.
      </Typography>
    </Paper>
  );
};

export default Events; 