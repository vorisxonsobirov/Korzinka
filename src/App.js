// App.jsx
import React, { useState, useEffect } from 'react';
import ProductList from './components/Product';
import Cart from './components/Cart';
import Auth from './components/Auth';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]); // Корзина
  const [user, setUser] = useState(null); // Авторизованный пользователь

  // При загрузке — проверка сохранённого пользователя
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Логин
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedUser', JSON.stringify(userData));
  };

  // Выход
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  // Добавление товара в корзину
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      return found
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  // Уменьшение количества
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Общая сумма
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      {/* Если вошёл — показываем магазин */}
      {user ? (
        <>
          <div className="header">
            <h1>Привет, {user.username} 👋</h1>
            <button onClick={handleLogout} className="logout-btn">Выйти</button>
          </div>
          <ProductList addToCart={addToCart} />
          <Cart cart={cart} addToCart={addToCart} decreaseQty={decreaseQty} total={total} />
        </>
      ) : (
        // Если не вошёл — форма авторизации
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
