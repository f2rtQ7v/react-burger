import { useState, useCallback, useEffect } from 'react';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import LoadingScreen from '../screens/loading-screen/loading-screen.jsx';
import ErrorScreen from '../screens/error-screen/error-screen.jsx';
import { ingredientsUrl } from '../../utils/api.js';
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

    fetch(ingredientsUrl)
      .then(r => r.ok ? r.json() : Promise.reject(`Ошибка ${r.status}`))
      .then(r => {
        setStatus('success');
        setIngredients(r.data);
      })
      .catch(e => {
        setStatus('error');
        setError(e);
      });
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
    content = <LoadingScreen />;
  } else if (status === 'error') {
    content = (
      <ErrorScreen>
        <span>Не удалось загрузить список ингредиентов</span>
        <span>{`${error}`}</span>
      </ErrorScreen>
    );
  }

  return content;
}
