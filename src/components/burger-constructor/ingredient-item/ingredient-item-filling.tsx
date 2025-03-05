import { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../../services/store.ts';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { delIngredient, moveIngredient } from '../../../services/features/burger-constructor/slice.ts';
import styles from './ingredient-item.module.css';

interface IIngredientItemFilling {
  ingredient?: IIngredient;
  index?: number;
}

export default function IngredientItemFilling({
  ingredient,
  index,
}: IIngredientItemFilling) {
  const sortable = typeof index === 'number';
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

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
    hover(item: IIngredientItemFilling) {
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

  const constructorElementProps = useMemo(() => ingredient
    ? ({
        text: ingredient.name,
        price: ingredient.price,
        thumbnail: ingredient.image,
        handleClose: () => dispatch(delIngredient(ingredient.id)),
      })
    : ({
        text: 'Перетащите начинки и соусы',
        price: 0,
        thumbnail: '',
        extraClass: styles.ingredientPlaceholder,
      })
  , [ ingredient, dispatch ]);

  dragRef(dropRef(ref));

  return (
    <li
      className={styles[sortable ? 'ingredientItemSortable' : 'ingredientItem']}
      ref={ref}
      style={{ opacity: +!isDragging }}
    >
      {sortable && <DragIcon type="primary" />}
      <ConstructorElement {...constructorElementProps} />
    </li>
  );
}
