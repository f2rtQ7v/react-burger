import { ReactNode, HTMLAttributes } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function ModalOverlay({ children, ...props }: IModalOverlayProps) {
  return (
    <div className={styles.overlay} {...props}>
      {children}
    </div>
  );
}
