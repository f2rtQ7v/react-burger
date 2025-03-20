import { HTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '@components/price/price.tsx';
import styles from './ingredient-item.module.css';

interface IIngredientItemProps extends HTMLAttributes<HTMLDivElement> {
  ingredient: IIngredient;
  count: number;
}

export default function IngredientItem({
  ingredient,
  count,
  ...props
}: IIngredientItemProps) {
  const location = useLocation();

  const [ , dragRef ] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }));

  return (
    <Link
      to={`/ingredient/${ingredient._id}`}
      state={{ background: location }}
      ref={dragRef}
      data-test-id={`ingredient-item-${ingredient._id}`}
    >
      <div className={styles.ingredient} {...props}>
        <div className={styles.image}>
          {count ? <Counter count={count} /> : null}
          <img src={ingredient.image} />
        </div>
        <Price value={ingredient.price} />
        <span
          className={styles.name}
          data-test-id={`ingredient-name-${ingredient._id}`}
        >
          {ingredient.name}
        </span>
      </div>
    </Link>
  );
}
