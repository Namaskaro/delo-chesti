import React from 'react';
import { Product } from '../ProductCard/ProductCard';
import { removeItemFromCart } from '../../stores/cart';
import cls from './DeleteProduct.module.css';

const DeleteProduct = ({ item }: { item: Product }) => {
  return (
    <button className={cls.add_to_cart} onClick={() => removeItemFromCart(item.id)}>
      Удалить
    </button>
  );
};

export default DeleteProduct;
