import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from './burger-ingredients/slice.js';
import burgerConstructor from './burger-constructor/slice.js';
import auth from './auth/slice.js';
import order from './order/slice.js';

export default configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    auth,
    order,
  },
});
