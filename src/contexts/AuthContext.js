// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const response = await api.post('login/', credentials); // Отправляем на '/api/login/'
      localStorage.setItem('token', response.data.token); // Сохраняем токен
      await fetchUser(); // Получаем данные пользователя
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Неправильные учетные данные');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('users/register/', userData);
      localStorage.setItem('token', response.data.token);
      await fetchUser();
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('logout/');
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await api.get('me/'); // Предполагаем, что бэкенд имеет endpoint 'me/'
      setUser(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await fetchUser();
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};