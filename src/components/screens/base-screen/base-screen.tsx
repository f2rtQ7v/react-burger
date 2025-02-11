import { ReactNode } from 'react';
import styles from './base-screen.module.css';

export interface ScreenProps {
  className?: string;
  transparent?: boolean;
  children?: ReactNode;
}

export default function BaseScreen({
  className = '',
  transparent = false,
  children = null,
}: ScreenProps) {
  const classes = [ styles.container, className, transparent && styles.transparent ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
