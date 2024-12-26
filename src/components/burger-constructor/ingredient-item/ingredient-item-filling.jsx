import { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_CONSTRUCTOR_DEL, BURGER_CONSTRUCTOR_MOVE } from '../../../services/actions/burger-constructor.js';
import { Ingredient } from '../../../utils/types.js';
import styles from './ingredient-item.module.css';

function IngredientItemFilling({ ingredient, index }) {
  const dispatch = useDispatch();

  const ref = useRef();

  const [ { isDragging }, dragRef ] = useDrag(() => ({
    type: 'sort',
    item: { ingredient, index },
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

      dispatch({
        type: BURGER_CONSTRUCTOR_MOVE,
        oldIndex: item.index,
        newIndex: index,
      });

      item.index = index;
    },
  }, [ index ]);

  const constructorElementProps = useMemo(() => {
    return ingredient
      ? ({
          text: ingredient.name,
          price: ingredient.price,
          thumbnail: ingredient.image,
          handleClose: () => dispatch({
            type: BURGER_CONSTRUCTOR_DEL,
            id: ingredient.id,
          }),
        })
      : ({
          text: 'Добавьте начинки и соусы',
          extraClass: styles.ingredientPlaceholder,
        });
  }, [ ingredient, dispatch ]);

  const sortable = typeof index === 'number';
  const className = styles[sortable ? 'ingredientItemSortable' : 'ingredientItem'];

  dragRef(dropRef(ref));

  return (
    <li className={className} ref={ref} style={{ opacity: +!isDragging }}>
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
