// src/components/Schedule/Schedule.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const ScheduleComponent = () => {
  const { user } = useContext(AuthContext);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get('schedules/');
        setSchedule(response.data);
      } catch (error) {
        console.error('Ошибка при получении расписания:', error);
      }
    };
    fetchSchedule();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Расписание</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>День недели</TableCell>
            <TableCell>Предмет</TableCell>
            <TableCell>Время начала</TableCell>
            <TableCell>Время окончания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.weekday}</TableCell>
              <TableCell>{item.subject.name}</TableCell>
              <TableCell>{item.start_time}</TableCell>
              <TableCell>{item.end_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ScheduleComponent;