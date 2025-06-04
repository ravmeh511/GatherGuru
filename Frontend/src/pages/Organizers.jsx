import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Organizers = () => {
  return (
    <Paper sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Organizers Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Here you can manage all organizers in the system.
      </Typography>
    </Paper>
  );
};

export default Organizers; 