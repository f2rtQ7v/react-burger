import { createOrdersActions, createState, createOrdersReducer } from '@utils/orders.ts';

export const actions = createOrdersActions('ORDERS-PROFILE');
export const initialState = createState();
export default createOrdersReducer(initialState, actions);
