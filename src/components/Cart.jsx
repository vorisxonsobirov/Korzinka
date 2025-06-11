import React from 'react';

// Компонент корзины
const Cart = ({ cart, addToCart, decreaseQty, total }) => {
  return (
    <div>
      <h2>корзинка</h2>

      {/* Если корзина пуста */}
      {cart.length === 0 ? (
        <p>корзинака пуста</p>
      ) : (
        // Выводим товары в корзине
        cart.map(item => (
          <div key={item.id} className="cart-item">
            {item.name} — {item.quantity} x {item.price} = {item.quantity * item.price} сум
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => decreaseQty(item.id)}>-</button>
          </div>
        ))
      )}

      {/* Общая сумма */}
      <div className="total">общая сумма: {total} сум
        <form action=""><button className='btn'>продать</button></form>
      </div>
    </div>
  );
};

export default Cart;
