import React from 'react';
import { Product } from '../ProductCard/ProductCard';
import { addItemToCart } from '../../stores/cart';
import cls from './AddProduct.module.css';

const AddToCart = ({ item }: { item: Product }) => {
  return (
    <button className={cls.add_to_cart} onClick={() => addItemToCart(item)}>
      Добавить в корзину
    </button>
  );
};

export default AddToCart;
