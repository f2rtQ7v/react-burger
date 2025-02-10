import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { delIngredient, moveIngredient } from '../../../services/burger-constructor/slice.ts';
import { Ingredient } from '../../../utils/types.ts';
import styles from './ingredient-item.module.css';

function IngredientItemFilling({ ingredient, index }) {
  const sortable = typeof index === 'number';
  const dispatch = useDispatch();
  const ref = useRef();

  const [ { isDragging }, dragRef ] = useDrag(() => ({
    type: 'sort',
    item: { ingredient, index },
    canDrag: () => sortable,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [ index ]);

  const [ , dropRef ] = useDrop({
    accept: 'sort',
    hover(item) {
      if (item.index === index) {
        return;
      }

      dispatch(moveIngredient({
        oldIndex: item.index,
        newIndex: index,
      }));

      item.index = index;
    },
  }, [ index ]);

  const constructorElementProps = useMemo(() => {
    return ingredient
      ? ({
          text: ingredient.name,
          price: ingredient.price,
          thumbnail: ingredient.image,
          handleClose: () => dispatch(delIngredient(ingredient.id)),
        })
      : ({
          text: 'Перетащите начинки и соусы',
          extraClass: styles.ingredientPlaceholder,
        });
  }, [ ingredient, dispatch ]);

  return (
    <li
      className={styles[sortable ? 'ingredientItemSortable' : 'ingredientItem']}
      ref={dragRef(dropRef(ref))}
      style={{ opacity: +!isDragging }}
    >
      {sortable && <DragIcon type="primary" />}
      <ConstructorElement {...constructorElementProps} />
    </li>
  );
}

IngredientItemFilling.propTypes = {
  ingredient: Ingredient,
  index: PropTypes.number,
};

export default IngredientItemFilling;
