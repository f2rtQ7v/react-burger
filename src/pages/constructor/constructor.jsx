import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredientsState } from '../../services/burger-ingredients/slice.js';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor.jsx';
import LoadingScreen from '../../components/screens/loading-screen/loading-screen.jsx';
import ErrorScreen from '../../components/screens/error-screen/error-screen.jsx';
import styles from './constructor.module.css';

export default function ConstructorPage() {
  const {
    ingredients,
    ingredientsRequest,
    ingredientsError,
  } = useSelector(getIngredientsState);

  let content = null;

  if (ingredients) {
    content = (<>
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
        <span>{ingredientsError}</span>
      </ErrorScreen>
    );
  }

  return content;
}
