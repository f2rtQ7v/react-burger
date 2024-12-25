import {
  BURGER_CONSTRUCTOR_ADD,
  BURGER_CONSTRUCTOR_DEL,
  BURGER_CONSTRUCTOR_RESET,
} from '../actions/burger-constructor.js';

const initialState = {
  bun: null,
  fillings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD:
      return action.ingredient.type === 'bun'
        ? {
            ...state,
            bun: action.ingredient,
          }
        : {
            ...state,
            fillings: [
              ...state.fillings,
              {
                ...action.ingredient,
                id: 1 + Math.max(0, ...state.fillings.map(n => n.id)),
              },
            ],
          };

    case BURGER_CONSTRUCTOR_DEL:
      return {
        ...state,
        fillings: state.fillings.filter(n => n.id !== action.id),
      };

    case BURGER_CONSTRUCTOR_RESET:
      return initialState;

    default:
      return state;
  }
};
