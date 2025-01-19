import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types.js';
import styles from './ingredient-item.module.css';

function IngredientItem({ ingredient, count, ...props }) {
  const [ collected, dragRef ] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }));

  return (
    <div className={styles.ingredient} {...props} ref={dragRef}>
      <div className={styles.image}>
        {count ? <Counter count={count} /> : null}
        <img src={ingredient.image} />
      </div>
      <span className={styles.price}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </span>
      <span className={styles.name}>{ingredient.name}</span>
    </div>
  );
}

IngredientItem.propTypes = {
  ingredient: Ingredient.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
