import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/burger-ingredients/actions.js';
import AppHeader from '../app-header/app-header.jsx';
import ConstructorPage from '../../pages/constructor/constructor.jsx';
import RegisterPage from '../../pages/register.jsx';
import LoginPage from '../../pages/login.jsx';
import ForgotPasswordPage from '../../pages/forgot-password.jsx';
import ResetPasswordPage from '../../pages/reset-password.jsx';
import ProfilePage from '../../pages/profile/profile.jsx';
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
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ingredient/:id" element={<IngredientDetails />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}
