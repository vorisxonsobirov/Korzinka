import React, { useState } from 'react';
import ProductList from './components/Product';
import Cart from './components/Cart';
import './App.css'; // Стили

const App = () => {
  const [cart, setCart] = useState([]); // Состояние корзины (массив товаров)

  // Добавить товар в корзину
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id); // Проверяем, есть ли товар уже в корзине

      if (found) {
        // Если есть — увеличиваем количество
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Если нет — добавляем с quantity: 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Уменьшить количество товара
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0) // Удалить, если quantity стало 0
    );
  };

  // Общая сумма товаров в корзине
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>магазин</h1>

      {/* Список товаров */}
      <ProductList addToCart={addToCart} />

      {/* Корзина */}
      <Cart
        cart={cart}
        addToCart={addToCart}
        decreaseQty={decreaseQty}
        total={total}
      />
    </div>
  );
};

export default App;
