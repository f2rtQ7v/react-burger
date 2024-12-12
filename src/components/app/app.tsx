import AppHeader from '../app-header/app-header.tsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.tsx';
import styles from './app.module.css';
import * as data from '../../utils/data.js';

export default () => (
  <>
    <AppHeader />
    <main className={styles.main}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <BurgerIngredients className={styles.ingredients} {...data} />
    </main>
  </>
);
