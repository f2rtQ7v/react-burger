import { forwardRef, ReactNode } from 'react';
import styles from './ingredients-list.module.css';

interface IIngredientsList {
  title: string;
  children: ReactNode;
}

const IngredientsList = forwardRef<HTMLDivElement, IIngredientsList>(
  ({ title, children }, ref) => (
    <div className={styles.container} ref={ref}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {children}
      </div>
    </div>
  )
);

export default IngredientsList;
