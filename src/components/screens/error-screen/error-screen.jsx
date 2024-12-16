import styles from './error-screen.module.css';

export default function ErrorScreen(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}
