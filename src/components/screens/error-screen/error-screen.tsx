import BaseScreen, { ScreenProps } from '../base-screen/base-screen.tsx';
import styles from './error-screen.module.css';

export default function ErrorScreen(props: ScreenProps) {
  return (
    <BaseScreen className={styles.red} {...props} />
  );
}
