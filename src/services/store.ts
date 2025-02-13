import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/slice.ts';
import burgerConstructor from './burger-constructor/slice.ts';
import auth from './auth/slice.ts';
import order from './order/slice.ts';

const store = configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    auth,
    order,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
