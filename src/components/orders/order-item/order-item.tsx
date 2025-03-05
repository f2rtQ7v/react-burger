import { useSelector } from 'react-redux';
import { getIngredientsState } from '../../../services/features/burger-ingredients/slice.ts';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../../components/price/price.tsx';
import styles from './order-item.module.css';

interface IOrderItemProps {
  order: IOrder;
  showStatus: boolean;
}

const statuses: {
  [key in TOrderStatus]: [ string, string ];
} = {
  created: [    'Создан',     '' ],
  pending: [ 'Готовится',     '' ],
  done:    [  'Выполнен', 'done' ],
};

const SHOW_INGREDIENTS = 6;

export default function OrderItem({ order, showStatus }: IOrderItemProps) {
  const { ingredients } = useSelector(getIngredientsState);

  const orderIngredients = order.ingredients.map(n => ingredients!.find(m => n === m._id));
  if (orderIngredients.some(n => !n)) {
    return null;
  }

  const uniqueIngredients = [...new Set(orderIngredients)];
  const price = orderIngredients.reduce((acc, n) => acc + n!.price, 0);

  const status = statuses[order.status];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.number}>#{order.number}</span>
        <FormattedDate date={new Date(order.createdAt)} className={styles.createdAt} />
      </div>
      <div className={styles.name}>{order.name}</div>
      {showStatus && <div className={styles.status + ' ' + status[1]}>{status[0]}</div>}
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {uniqueIngredients.slice(0, SHOW_INGREDIENTS).map((n, i) => (
            <div
              className={styles.ingredient}
              style={{ zIndex: 10 - i }}
            >
              <img src={n!.image_mobile} className={styles.ingredientImage} />
              {-~i === SHOW_INGREDIENTS && uniqueIngredients.length > SHOW_INGREDIENTS && (
                <div className={styles.moreIngredients}>
                  +{uniqueIngredients.length - SHOW_INGREDIENTS}
                </div>
              )}
            </div>
          ))}
        </div>
        <Price value={price} />
      </div>
    </div>
  );
}
