import { configureStore } from '@reduxjs/toolkit';
import burgerIngredients from './features/burger-ingredients/slice.ts';
import burgerConstructor from './features/burger-constructor/slice.ts';
import auth from './features/auth/slice.ts';
import order from './features/order/slice.ts';
import ordersAllActions from './features/orders.all/actions.ts';
import ordersAll from './features/orders.all/slice.ts';
import ordersProfileActions from './features/orders.profile/actions.ts';
import ordersProfile from './features/orders.profile/slice.ts';
import { socketMiddleware } from './middlewares/ws.ts';

const store = configureStore({
  reducer: {
    burgerIngredients,
    burgerConstructor,
    auth,
    order,
    ordersAll,
    ordersProfile,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      socketMiddleware(ordersAllActions),
      socketMiddleware(ordersProfileActions, true)
    ),
});

export type RootState = ReturnType<typeof store.reducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
