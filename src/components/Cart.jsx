import React from 'react';

const Cart = ({ cart, addToCart, decreaseQty, total }) => {
  return (
    <div>
      <h2>корзинка</h2>
      {cart.length === 0 ? (
        <p>корзинка пуста</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            {item.name} — {item.quantity} x {item.price} = {item.quantity * item.price} сум
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => decreaseQty(item.id)}>-</button>
          </div>
        ))
      )}
      <div 
      className="total">Общая сумма: {total} сум 
         <form action=""><button className='Sell_btn'>Продать</button></form>
      </div>
     
    </div>
  );
};

export default Cart;
