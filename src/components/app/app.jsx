import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/actions.js';
import AppHeader from '../app-header/app-header.jsx';
import ConstructorPage from '../../pages/constructor/constructor.jsx';
import IngredientPage from '../../pages/ingredient.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Page404 from '../../pages/404/404.jsx';
import styles from './app.module.css';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    dispatch(getIngredients());
  }, [ dispatch ]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>
        {state?.background && (
          <Routes>
            <Route path="/ingredient/:id" element={<IngredientPage />} />
          </Routes>
        )}

        <Routes location={state?.background ?? location}>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/ingredient/:id" element={<IngredientDetails />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}
