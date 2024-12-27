import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredients } from '../../services/actions/burger-ingredients.js';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import LoadingScreen from '../screens/loading-screen/loading-screen.jsx';
import ErrorScreen from '../screens/error-screen/error-screen.jsx';
import styles from './app.module.css';

export default function App() {
  const dispatch = useDispatch();

  const {
    ingredients,
    ingredientsRequest,
    ingredientsError,
  } = useSelector(state => state.burgerIngredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [ dispatch ]);

  let content = null;

  if (ingredients) {
    content = (<>
      <AppHeader />
      <main className={styles.main}>
        <h1 className={styles.header}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>);
  } else if (ingredientsRequest) {
    content = <LoadingScreen />;
  } else if (ingredientsError) {
    content = (
      <ErrorScreen>
        <span>Не удалось загрузить список ингредиентов</span>
        <span>{`${ingredientsError}`}</span>
      </ErrorScreen>
    );
  }

  return content;
}
