import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types.js';
import styles from './burger-ingredient-item.module.css';

const IngredientItem = ({ ingredient, ...props }) => (
  <div className={styles.ingredient} {...props}>
    <div className={styles.image}>
      {ingredient.count ? <Counter count={ingredient.count} /> : null}
      <img src={ingredient.image} />
    </div>
    <span className={styles.price}>
      {ingredient.price}
      <CurrencyIcon type="primary" />
    </span>
    <span className={styles.name}>{ingredient.name}</span>
  </div>
);

IngredientItem.propTypes = {
  ingredient: Ingredient.isRequired,
};

export default IngredientItem;
