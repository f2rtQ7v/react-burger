import { ReactNode } from 'react';
import styles from './screens.module.css';

interface ScreenProps {
  children?: ReactNode;
}

export function LoadingScreen(props: ScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      {props.children}
    </div>
  );
}

export function ErrorScreen(props: ScreenProps) {
  const classes = [ styles.container, styles.error ].join(' ');

  return (
    <div className={classes}>
      {props.children}
    </div>
  );
}
