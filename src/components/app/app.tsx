import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store.ts';
import { actions } from '../../services/features/auth/actions.ts';
import { getAuthState } from '../../services/features/auth/slice.ts';
import { getIngredients } from '../../services/features/burger-ingredients/actions.ts';
import { getIngredientsState } from '../../services/features/burger-ingredients/slice.ts';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route.tsx';
import AppHeader from '../app-header/app-header.tsx';
import ConstructorPage from '../../pages/constructor/constructor.tsx';
import RegisterPage from '../../pages/auth/register.tsx';
import LoginPage from '../../pages/auth/login.tsx';
import ForgotPasswordPage from '../../pages/auth/forgot-password.tsx';
import ResetPasswordPage from '../../pages/auth/reset-password.tsx';
import ProfilePage from '../../pages/profile/profile.tsx';
import SettingsPage from '../../pages/settings.tsx';
import OrdersAllPage from '../../pages/orders.all/orders.all.tsx';
import OrdersProfilePage from '../../pages/orders.profile/orders.profile.tsx';
import OrderPage from '../../pages/order.tsx';
import OrderDetails from '../order-details/order-details.tsx';
import LogoutPage from '../../pages/logout.tsx';
import IngredientPage from '../../pages/ingredient.tsx';
import IngredientDetails from '../ingredient-details/ingredient-details.tsx';
import Page404 from '../../pages/404/404.tsx';
import { LoadingScreen, ErrorScreen } from '../../components/screens/screens.tsx';
import styles from './app.module.css';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  const { isAuthChecked } = useSelector(getAuthState);
  const {
    ingredients,
    request: ingredientsRequest,
    error: ingredientsError,
  } = useSelector(getIngredientsState);

  useEffect(() => {
    dispatch(actions.getUser());
    dispatch(getIngredients());
  }, [ dispatch ]);

  if (ingredientsRequest || !isAuthChecked) {
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
            <Route path="/feed/:number" element={<OrderPage />} />
            <Route path="/profile/orders/:number" element={<OrderPage showStatus />} />
          </Routes>
        )}

        <Routes location={background ?? location}>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/feed" element={<OrdersAllPage />} />
          <Route path="/register" element={<OnlyUnAuth element={<RegisterPage />}/>} />
          <Route path="/login" element={<OnlyUnAuth element={<LoginPage />}/>} />
          <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage />}/>} />
          <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage />}/>} />
          <Route path="/profile" element={<OnlyAuth element={<ProfilePage />}/>}>
            <Route index element={<SettingsPage />} />
            <Route path="orders" element={<OrdersProfilePage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
          <Route path="/ingredient/:id" element={<IngredientDetails />} />
          <Route path="/feed/:number" element={<OrderDetails showHeader />} />
          <Route path="/profile/orders/:number" element={<OrderDetails showHeader showStatus />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}
