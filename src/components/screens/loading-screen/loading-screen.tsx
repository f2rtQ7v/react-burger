import BaseScreen, { ScreenProps } from '../base-screen/base-screen.tsx';
import styles from './loading-screen.module.css';

export default function LoadingScreen({ children, ...props }: ScreenProps) {
  return (
    <BaseScreen {...props}>
      <div className={styles.spinner}></div>
      {children}
    </BaseScreen>
  );
}
