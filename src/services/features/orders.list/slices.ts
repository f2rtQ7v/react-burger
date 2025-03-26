import { createOrdersSlice } from './slice-creator.ts';

export const ordersAll = createOrdersSlice(
  'ordersAll',
  () => '/all'
);

export const ordersProfile = createOrdersSlice(
  'ordersProfile',
  () => `?token=${localStorage.getItem('accessToken')?.replace('Bearer ', '')}`
);
