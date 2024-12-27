import { createOrderRequest } from '../../utils/api.js';

const base = 'order/';

export const ORDER_CREATE_REQUEST = `${base}create-request`;
export const ORDER_CREATE_SUCCESS = `${base}create-success`;
export const ORDER_CREATE_ERROR = `${base}create-error`;
export const ORDER_RESET = `${base}reset`;

export const createOrder = (bun, fillings) => dispatch => {
  dispatch({ type: ORDER_CREATE_REQUEST });

  createOrderRequest(bun, fillings)
    .then(r => dispatch({ type: ORDER_CREATE_SUCCESS, data: r }))
    .catch(e => dispatch({ type: ORDER_CREATE_ERROR, error: e }));
};
