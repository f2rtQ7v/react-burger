import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  ORDER_RESET,
} from '../actions/order.js';

const initialState = {
  order: null,
  orderCreateRequest: false,
  orderCreateError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        orderCreateError: null,
        orderCreateRequest: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: {
          id: action.data.order.number,
          name: action.data.name,
        },
        orderCreateRequest: false,
      };

    case ORDER_CREATE_ERROR:
      return {
        ...state,
        orderCreateError: action.error || 'Неизвестная ошибка при создании заказа',
        orderCreateRequest: false,
      };

    case ORDER_RESET:
      return initialState;

    default:
      return state;
  }
};
