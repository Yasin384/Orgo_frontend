// src/components/Leaderboard/Leaderboard.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get('leaderboard/');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Ошибка при получении лидерборда:', error);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Лидерборд</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ранг</TableCell>
            <TableCell>Пользователь</TableCell>
            <TableCell>XP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.rank}</TableCell>
              <TableCell>{item.user_profile.user.username}</TableCell>
              <TableCell>{item.user_profile.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Leaderboard;