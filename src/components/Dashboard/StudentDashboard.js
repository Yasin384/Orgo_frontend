// src/components/Dashboard/StudentDashboard.js
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Schedule from '../Schedule/Schedule';
import Leaderboard from '../Leaderboard/Leaderboard';
import Grades from '../Grades/Grades';
import Profile from '../Profile/Profile';

const StudentDashboard = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Добро пожаловать, ученик!</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Schedule />
        </Grid>
        <Grid item xs={12} md={6}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={6}>
          <Leaderboard />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grades />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard;