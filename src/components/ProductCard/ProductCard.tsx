import React, { ReactNode } from 'react';
import cls from './ProductCard.module.css';

export type Color = {
  value: string;
  hex: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  img: string[];
  colors: Color[];
};
type ProductCardProps = {
  children: ReactNode;
};
const ProductCard = (props: ProductCardProps) => {
  const { children } = props;
  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className={cls.card}>
        <div className={cls.img}>
          <img src="/img/store/suit-3.jpg" alt="" />
        </div>
        <h4>Premium Suite</h4>
        <div className={cls.badge_wrapper}></div>
        {children}
      </div>
      ;
    </div>
  );
};

export default ProductCard;
