import { useSelector as US, useDispatch as UD } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerIngredients from './features/burger-ingredients/slice.ts';
import burgerConstructor from './features/burger-constructor/slice.ts';
import auth from './features/auth/slice.ts';
import order from './features/order/slice.ts';
import ordersByNumber from './features/orders.by-number/slice.ts';
import ordersAllActions from './features/orders.all/actions.ts';
import ordersAll from './features/orders.all/slice.ts';
import ordersProfileActions from './features/orders.profile/actions.ts';
import ordersProfile from './features/orders.profile/slice.ts';
import { socketMiddleware } from './middlewares/ws.ts';

const reducer = combineReducers({
  burgerIngredients,
  burgerConstructor,
  auth,
  order,
  ordersByNumber,
  ordersAll,
  ordersProfile,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      socketMiddleware(ordersAllActions),
      socketMiddleware(ordersProfileActions, true)
    ),
});

export type RootState = ReturnType<typeof reducer>;
export const useSelector = US.withTypes<RootState>();
export const useDispatch = UD.withTypes<typeof store.dispatch>();
export default store;
