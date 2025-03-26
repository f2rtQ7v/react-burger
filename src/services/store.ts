import { useSelector as US, useDispatch as UD } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerIngredients from './features/burger-ingredients/slice.ts';
import burgerConstructor from './features/burger-constructor/slice.ts';
import auth from './features/auth/slice.ts';
import order from './features/order/slice.ts';
import ordersByNumber from './features/orders.by-number/slice.ts';
import { ordersAll, ordersProfile } from './features/orders.list/slices.ts';
import { socketMiddleware } from './middlewares/ws.ts';

const reducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  auth,
  order,
  ordersByNumber,
  [ordersAll.name]: ordersAll.reducer,
  [ordersProfile.name]: ordersProfile.reducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      socketMiddleware(ordersAll.actions),
      socketMiddleware(ordersProfile.actions, true)
    ),
});

export type RootState = ReturnType<typeof reducer>;
export const useSelector = US.withTypes<RootState>();
export const useDispatch = UD.withTypes<typeof store.dispatch>();
export default store;
