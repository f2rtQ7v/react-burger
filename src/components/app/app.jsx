import { useState, useCallback } from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';

export default function App() {
  const [ selectedIngredients, setSelectedIngredients ] = useState([]);

  const addIngredient = useCallback(ingredient => {
    setSelectedIngredients(ingredients => [
      ...(ingredient.type === 'bun'
        ? ingredients.filter(n => n.type !== 'bun')
        : ingredients
      ),
      { ...ingredient, id: 1 + Math.max(0, ...ingredients.map(n => n.id)) },
    ]);
  }, []);

  const delIngredient = useCallback(id => {
    setSelectedIngredients(ingredients => ingredients.filter(n => n.id !== id));
  }, []);

  return (<>
    <AppHeader />
    <main className={styles.main}>
      <h1 className={styles.header}>Соберите бургер</h1>
      <BurgerIngredients
        selectedIngredients={selectedIngredients}
        addIngredient={addIngredient}
      />
      <BurgerConstructor
        ingredients={selectedIngredients}
        delIngredient={delIngredient}
      />
    </main>
  </>);
}
