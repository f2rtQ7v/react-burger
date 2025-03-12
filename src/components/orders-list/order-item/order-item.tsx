import useOrderIngredients from '@/hooks/use-order-ingredients';
import { OrderStatus, OrderDate, OrderName, OrderHeader, OrderFooter } from '@components/order-elements/order-elements.tsx';
import IngredientImage from '@components/ingredient-image/ingredient-image.tsx';
import styles from './order-item.module.css';

interface IOrderItemProps {
  order: IOrder;
  showStatus: boolean;
}

const SHOW_INGREDIENTS = 6;

export default function OrderItem({ order, showStatus }: IOrderItemProps) {
  const ingredients = useOrderIngredients(order);
  if (!ingredients) {
    return null;
  }

  const uniqueIngredients = [...new Set(ingredients)];
  const price = ingredients.reduce((acc, n) => acc + n.price, 0);

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
            <IngredientImage key={n._id} image={n.image_mobile} style={{ zIndex: 10 - i }}>
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
