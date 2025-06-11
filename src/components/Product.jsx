import React from 'react';

const products = [
  { id: 1, name: 'Хлеб', price: 3000 },
  { id: 2, name: 'Молоко', price: 5000 },
  { id: 3, name: 'Яблоки', price: 7000 }
];

const ProductList = ({ addToCart }) => {
  return (
    <div>
      <h2>товары</h2>
      {products.map(product => (
        <div key={product.id} className="product">
          {product.name} - {product.price} сум
          <button onClick={() => addToCart(product)}>Добавить</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
