import styles from './loading-screen.module.css';

export default function LoadingScreen(props) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      {props.children}
    </div>
  );
}
