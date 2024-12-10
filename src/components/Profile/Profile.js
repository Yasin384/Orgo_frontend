// src/components/Profile/Profile.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';
import { Paper, Typography, TextField, Box } from '@mui/material';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('user-profiles/');
        const userProfile = response.data.find(p => p.user.id === user.id);
        setProfile(userProfile);
      } catch (error) {
        console.error('Ошибка при получении профиля:', error);
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <Typography>Загрузка профиля...</Typography>;

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Профиль</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Имя пользователя"
          value={profile.user.username}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Email"
          value={profile.user.email}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Имя"
          value={profile.user.first_name}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Фамилия"
          value={profile.user.last_name}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="XP"
          value={profile.xp}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Уровень"
          value={profile.level}
          fullWidth
          margin="normal"
          disabled
        />
        {/* Здесь можно добавить отображение достижений */}
      </Box>
    </Paper>
  );
};

export default Profile;