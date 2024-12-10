// src/components/Grades/TeacherGrades.js
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TeacherGrades = () => {
  const [grades, setGrades] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentGrade, setCurrentGrade] = useState({ student: '', subject: '', grade: '', comments: '' });
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await api.get('grades/');
        setGrades(response.data);
      } catch (error) {
        console.error('Ошибка при получении оценок:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await api.get('users/');
        const studentUsers = response.data.filter(user => user.role === 'STUDENT');
        setStudents(studentUsers);
      } catch (error) {
        console.error('Ошибка при получении студентов:', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await api.get('subjects/');
        setSubjects(response.data);
      } catch (error) {
        console.error('Ошибка при получении предметов:', error);
      }
    };

    fetchGrades();
    fetchStudents();
    fetchSubjects();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentGrade({ student: '', subject: '', grade: '', comments: '' });
    setOpen(false);
  };

  const handleChange = (e) => {
    setCurrentGrade({ ...currentGrade, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('grades/', currentGrade);
      handleClose();
      // Обновляем оценки
      const response = await api.get('grades/');
      setGrades(response.data);
    } catch (error) {
      console.error('Ошибка при создании оценки:', error);
      alert('Не удалось создать оценку. Проверьте введённые данные.');
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Управление оценками</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Добавить оценку
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Студент</TableCell>
            <TableCell>Предмет</TableCell>
            <TableCell>Оценка</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Комментарии</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.id}>
              <TableCell>{grade.student.username}</TableCell>
              <TableCell>{grade.subject.name}</TableCell>
              <TableCell>{grade.grade}</TableCell>
              <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
              <TableCell>{grade.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Диалоговое окно для добавления оценки */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить оценку</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Студент</InputLabel>
            <Select
              name="student"
              value={currentGrade.student}
              label="Студент"
              onChange={handleChange}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>{student.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Предмет</InputLabel>
            <Select
              name="subject"
              value={currentGrade.subject}
              label="Предмет"
              onChange={handleChange}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Оценка"
            name="grade"
            type="number"
            value={currentGrade.grade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 1, max: 10 }}
          />
          <TextField
            label="Комментарии"
            name="comments"
            value={currentGrade.comments}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TeacherGrades;