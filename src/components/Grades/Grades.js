// src/components/Grades/Grades.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Grades = () => {
  const { user } = useContext(AuthContext);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get('grades/');
        const userGrades = response.data.filter(grade => grade.student.id === user.id);
        setGrades(userGrades);
      } catch (error) {
        console.error('Ошибка при получении оценок:', error);
      }
    };
    fetchGrades();
  }, [user]);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Ваши оценки</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Предмет</TableCell>
            <TableCell>Оценка</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Учитель</TableCell>
            <TableCell>Комментарии</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.id}>
              <TableCell>{grade.subject.name}</TableCell>
              <TableCell>{grade.grade}</TableCell>
              <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
              <TableCell>{grade.teacher.username}</TableCell>
              <TableCell>{grade.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Grades;