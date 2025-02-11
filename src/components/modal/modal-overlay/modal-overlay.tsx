import { ReactNode, HTMLAttributes } from 'react';
import styles from './modal-overlay.module.css';

interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalOverlay({ children, ...props }: ModalOverlayProps) {
  return (
    <div className={styles.overlay} {...props}>
      {children}
    </div>
  );
}
