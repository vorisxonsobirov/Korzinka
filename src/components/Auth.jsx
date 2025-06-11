import React, { useState } from 'react';

// Храним пользователей в localStorage
const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();

    if (isLogin) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin(user);
      } else {
        setError('Неверный логин или пароль');
      }
    } else {
      const exists = users.find(u => u.username === username);
      if (exists) {
        setError('Пользователь уже существует');
      } else {
        const newUser = { username, password };
        saveUsers([...users, newUser]);
        onLogin(newUser);
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
      <p>
        {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <button onClick={switchMode}>
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Auth;
