import React, { useEffect, useMemo } from 'react';
import type { CSSProperties, MutableRefObject, ReactNode } from 'react';
import cls from './Modal.module.css';
import { Portal } from '../Portal/Portal';

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  width?: number;
  height?: number;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { children, isOpen, onClose, width, height } = props;
  if (!isOpen) {
    return null;
  }
  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const styles = useMemo<CSSProperties>(
    () => ({
      width: `${width}px`,
      height: `${height}px`,
    }),
    [width, height],
  );
  return (
    <Portal>
      <div className={cls.modal} onClick={onClose}>
        <div className={cls.overlay}>
          <div className={cls.content} onClick={onContentClick} style={styles}>
            <div className={cls.close_btn} onClick={onClose}>
              <i className="ri-close-large-fill"></i>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
