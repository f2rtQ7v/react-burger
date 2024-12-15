import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

export const IngredientTypes = PropTypes.arrayOf(IngredientType);

export const Ingredient = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
  id: PropTypes.number,
});

export const Ingredients = PropTypes.arrayOf(Ingredient);
