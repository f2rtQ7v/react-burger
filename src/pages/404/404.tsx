import styles from './404.module.css';

export default function Page404() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>404</div>
      <div className={styles.text}>страница не найдена</div>
    </div>
  );
}
