import { useSelector } from '../../../services/store.ts';
import { getIngredientsState } from '../../../services/features/burger-ingredients/slice.ts';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Price from '../../../components/price/price.tsx';
import OrderStatus from '../../../components/order-status/order-status.tsx';
import IngredientImage from '../../../components/ingredient-image/ingredient-image.tsx';
import styles from './order-item.module.css';

interface IOrderItemProps {
  order: IOrder;
  showStatus: boolean;
}

const SHOW_INGREDIENTS = 6;

export default function OrderItem({ order, showStatus }: IOrderItemProps) {
  const { ingredients } = useSelector(getIngredientsState);

  const orderIngredients = order.ingredients.map(n => ingredients!.find(m => n === m._id));
  if (orderIngredients.some(n => !n)) {
    return null;
  }

  const uniqueIngredients = [...new Set(orderIngredients)];
  const price = orderIngredients.reduce((acc, n) => acc + n!.price, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.number}>#{order.number}</span>
        <FormattedDate date={new Date(order.createdAt)} className={styles.createdAt} />
      </div>
      <div className={styles.name}>{order.name}</div>
      {showStatus && <OrderStatus status={order.status} />}
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {uniqueIngredients.slice(0, SHOW_INGREDIENTS).map((n, i) => (
            <IngredientImage image={n!.image_mobile} style={{ zIndex: 10 - i }}>
              {-~i === SHOW_INGREDIENTS && uniqueIngredients.length > SHOW_INGREDIENTS && (
                <div className={styles.moreIngredients}>
                  +{uniqueIngredients.length - SHOW_INGREDIENTS}
                </div>
              )}
            </IngredientImage>
          ))}
        </div>
        <Price value={price} />
      </div>
    </div>
  );
}
