import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';
import styles from './constructor.module.css';

export default function ConstructorPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}
