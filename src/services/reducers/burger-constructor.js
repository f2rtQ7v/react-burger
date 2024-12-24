import {
  BURGER_CONSTRUCTOR_ADD,
  BURGER_CONSTRUCTOR_DEL,
  BURGER_CONSTRUCTOR_RESET,
} from '../actions/burger-constructor.js';

const initialState = {
  ingredients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD:
      return {
        ...state,
        ingredients: [
          ...(action.ingredient.type === 'bun'
            ? state.ingredients.filter(n => n.type !== 'bun')
            : state.ingredients
          ),
          {
            ...action.ingredient,
            id: 1 + Math.max(0, ...state.ingredients.map(n => n.id)),
          },
        ],
      };

    case BURGER_CONSTRUCTOR_DEL:
      return {
        ...state,
        ingredients: state.ingredients.filter(n => n.id !== action.id),
      };

    case BURGER_CONSTRUCTOR_RESET:
      return initialState;

    default:
      return state;
  }
};
