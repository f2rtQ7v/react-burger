import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/slice.ts';
import burgerConstructor from './burger-constructor/slice.ts';
import auth from './auth/slice.ts';
import order from './order/slice.ts';

export default configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    auth,
    order,
  },
});
