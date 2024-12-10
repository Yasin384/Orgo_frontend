// src/components/Layout/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SchoolApp
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/">Главная</Button>
            <Button color="inherit" component={Link} to="/schedule">Расписание</Button>
            <Button color="inherit" component={Link} to="/profile">Профиль</Button>
            <Button color="inherit" component={Link} to="/leaderboard">Лидерборд</Button>
            {user.role === 'TEACHER' ? (
              <Button color="inherit" component={Link} to="/teacher-grades">Управление оценками</Button>
            ) : (
              <Button color="inherit" component={Link} to="/grades">Оценки</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Выйти</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Войти</Button>
            <Button color="inherit" component={Link} to="/register">Регистрация</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;