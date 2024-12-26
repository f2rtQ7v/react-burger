import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/types.js';
import styles from './ingredient-item.module.css';

function IngredientItemBun({ ingredient, type }) {
  const constructorElementProps = useMemo(() => {
    return ingredient
      ? ({
          text: `${ingredient.name} (${type === 'top' ? 'Верх' : 'Низ'})`,
          price: ingredient.price,
          thumbnail: ingredient.image,
          isLocked: true,
        })
      : ({
          text: 'Добавьте булку',
          extraClass: styles.ingredientPlaceholder,
        });
  }, [ ingredient, type ]);

  return (
    <li className={styles.ingredientItem}>
      <ConstructorElement {...constructorElementProps} type={type} />
    </li>
  );
}

IngredientItemBun.propTypes = {
  ingredient: Ingredient,
  type: PropTypes.string,
};

export default IngredientItemBun;
