import React from 'react';

// Фиксированные товары
const products = [
  { id: 1, name: 'хлеб', price: 3000 },
  { id: 2, name: 'молоко', price: 5000 },
  { id: 3, name: 'яблоки', price: 7000 }
];

// Компонент списка товаров
const ProductList = ({ addToCart }) => {
  return (
    <div>
      <h2>Продукты</h2>

      {/* Выводим каждый товар */}
      {products.map(product => (
        <div key={product.id} className="product">
          {product.name} - {product.price} сум
          <button onClick={() => addToCart(product)}>добавить</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
