import { useMemo } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

interface IIngredientItemBun {
  ingredient: IIngredient | null;
  type: 'top' | 'bottom';
}

export default function IngredientItemBun({
  ingredient,
  type,
}: IIngredientItemBun) {
  const constructorElementProps = useMemo(() => ingredient
    ? ({
        text: `${ingredient.name} (${type === 'top' ? 'Верх' : 'Низ'})`,
        price: ingredient.price,
        thumbnail: ingredient.image,
        isLocked: true,
      })
    : ({
        text: 'Перетащите булку',
        price: 0,
        thumbnail: '',
        extraClass: styles.ingredientPlaceholder,
      })
  , [ ingredient, type ]);

  return (
    <li
      className={styles.ingredientItem}
      data-test-id={ingredient ? `order-ingredient-${ingredient.id}` : `ingredient-placeholder-${type}`}
    >
      <ConstructorElement {...constructorElementProps} type={type} />
    </li>
  );
}
