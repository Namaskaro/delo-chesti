import React from 'react';
import cls from './Success.module.css';

const Success = () => {
  return (
    <div className={cls.success_animation}>
      <svg className={cls.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className={cls.checkmark_circle} cx="26" cy="26" r="25" fill="none" />
        <path className={cls.checkmark_check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    </div>
  );
};

export default Success;
