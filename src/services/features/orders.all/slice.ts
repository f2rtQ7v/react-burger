import { createOrdersActions, createState, createOrdersReducer } from '../../../utils/orders.ts';

export const actions = createOrdersActions('ORDERS-ALL');
export const initialState = createState();
export default createOrdersReducer(initialState, actions);
