import { ReactNode } from 'react';
import styles from './ingredients-list.module.css';

export default function IngredientsList(props: { children: ReactNode }) {
  return (
    <ul className={styles.container}>
      {props.children}
    </ul>
  );
}
