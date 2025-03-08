import { useSelector } from '../../../services/store.ts';
import { getIngredientsState } from '../../../services/features/burger-ingredients/slice.ts';
import { OrderStatus, OrderDate, OrderName, OrderHeader, OrderFooter } from '../../order-elements/order-elements.tsx';
import IngredientImage from '../../ingredient-image/ingredient-image.tsx';
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
      <OrderHeader number={order.number}>
        <OrderDate date={order.createdAt} />
      </OrderHeader>
      <OrderName name={order.name} className="pt-6" />
      {showStatus && <OrderStatus status={order.status} />}
      <OrderFooter price={price}>
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
      </OrderFooter>
    </div>
  );
}
