import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/auth/actions.js';
import { getIngredients } from '../../services/burger-ingredients/actions.js';
import { getIngredientsState } from '../../services/burger-ingredients/slice.js';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route.jsx';
import AppHeader from '../app-header/app-header.jsx';
import ConstructorPage from '../../pages/constructor/constructor.jsx';
import RegisterPage from '../../pages/auth/register.jsx';
import LoginPage from '../../pages/auth/login.jsx';
import ForgotPasswordPage from '../../pages/auth/forgot-password.jsx';
import ResetPasswordPage from '../../pages/auth/reset-password.jsx';
import ProfilePage from '../../pages/profile/profile.jsx';
import SettingsPage from '../../pages/settings.jsx';
import OrdersPage from '../../pages/orders/orders.jsx';
import IngredientPage from '../../pages/ingredient.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Page404 from '../../pages/404/404.jsx';
import { LoadingScreen, ErrorScreen } from '../../components/screens/';
import styles from './app.module.css';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  const {
    ingredients,
    ingredientsRequest,
    ingredientsError,
  } = useSelector(getIngredientsState);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [ dispatch ]);

  if (ingredientsRequest) {
    return <LoadingScreen />;
  }

  if (ingredientsError) {
    return (
      <ErrorScreen>
        <span>Не удалось загрузить список ингредиентов</span>
        <span>{ingredientsError}</span>
      </ErrorScreen>
    );
  }

  return ingredients && (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.content}>
        {background && (
          <Routes>
            <Route path="/ingredient/:id" element={<IngredientPage />} />
          </Routes>
        )}

        <Routes location={background ?? location}>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/register" element={<OnlyUnAuth element={<RegisterPage />}/>} />
          <Route path="/login" element={<OnlyUnAuth element={<LoginPage />}/>} />
          <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />}/>} />
          <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />}/>} />
          <Route path="/profile" element={<OnlyAuth element={<ProfilePage />}/>}>
            <Route index element={<SettingsPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
          <Route path="/ingredient/:id" element={<IngredientDetails />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}
