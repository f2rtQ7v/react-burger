import { useState, useCallback, useEffect } from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import { ingredientsUrl } from '../../utils/data.js';
import styles from './app.module.css';

export default function App() {
  const [ status, setStatus ] = useState('init');
  const [ error, setError ] = useState(null);
  const [ ingredients, setIngredients ] = useState(null);
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

  useEffect(() => {
    setStatus('loading');
    setError(null);

    // имитируем задержку
    setTimeout(() => {
      fetch(ingredientsUrl)
        .then(r => r.json())
        .then(r => {
          setIngredients(r.data);
          setStatus('success');
        })
        .catch(e => {
          setStatus('error');
          setError(e);
        });
    }, 2000);
  }, []);

  let content = null;

  if (status === 'success') {
    content = (<>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={styles.header}>Соберите бургер</h1>
        <BurgerIngredients
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          addIngredient={addIngredient}
        />
        <BurgerConstructor
          ingredients={selectedIngredients}
          delIngredient={delIngredient}
        />
      </main>
    </>);
  } else if (status === 'loading') {
    content = <p>loading...</p>;
  } else if (status === 'error') {
    content = <p>error: {`${error}`}</p>
  }

  return content;
}
