import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $cart as cart, removeItemFromCart, subtotal } from '../../stores/cart';
import cls from './Cart.module.css';

const EmptyCart = () => {
  return (
    <>
      <p>Ваша корзина пуста!</p>
    </>
  );
};

const Cart = () => {
  const $cart = useStore(cart);
  const $subtotal = useStore(subtotal);
    useEffect(() => {
      if (Object.keys($cart).length == 0) localStorage.setItem('cart', JSON.stringify($cart));
    }, [cart]);
    if (Object.keys($cart).length == 0) {
      return <EmptyCart />;
    }
  return (
    <div>
      <ul>
        {Object.values($cart).map((entry) => {
          if (!entry) {
            return null;
          }

          return (
            <li>
              <span>{entry.quantity}</span>
              <span>{entry.item.title}</span>
              <span>
                <button title="remove item" onClick={() => removeItemFromCart(entry?.item.id!)}>
                  &times;
                </button>
              </span>
              <span>{entry.item.price}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
