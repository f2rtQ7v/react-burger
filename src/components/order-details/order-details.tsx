import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '@services/store.ts';
import { getOrder } from '@services/features/orders.by-number/slice.ts';
import useOrderIngredients from '@/hooks/use-order-ingredients';
import IngredientImage from '@components/ingredient-image/ingredient-image.tsx';
import Price from '@components/price/price.tsx';
import { OrderStatus, OrderDate, OrderName, OrderHeader, OrderFooter } from '@components/order-elements/order-elements.tsx';
import { LoadingScreen, ErrorScreen } from '@components/screens/screens.tsx';
import styles from './order-details.module.css';

export default function OrderDetails({ showHeader = false }: { showHeader?: boolean }) {
  const dispatch = useDispatch();
  const { number = -1 } = useParams();
  const { orders: ordersAll } = useSelector(state => state.ordersAll);
  const { orders: ordersProfile } = useSelector(state => state.ordersProfile);
  const { orders: ordersByNumber, error } = useSelector(state => state.ordersByNumber);

  const order =
    ordersAll?.find(n => n.number === +number) ??
    ordersProfile?.find(n => n.number === +number) ??
    ordersByNumber[number];

  const ingredients = useOrderIngredients(order);

  useEffect(() => {
    if (!order) {
      dispatch(getOrder(+number));
    }
  }, [ dispatch, number, order ]);

  if (!order) {
    return error
      ? <ErrorScreen>{error}</ErrorScreen>
      : <LoadingScreen />;
  }

  if (!ingredients) {
    return (
      <ErrorScreen>
        <span>Заказ не может быть отображен</span>
        <span>Некорректный список ингредиентов</span>
      </ErrorScreen>
    );
  }

  const [ count, price ] = ingredients.reduce((acc, n) => (
    acc[0].set(n, -~acc[0].get(n)),
    acc[1] += n.price,
    acc
  ), [ new Map, 0 ]);

  return (
    <div className={styles.container}>
      {showHeader && <OrderHeader number={order.number} />}
      <OrderName name={order.name} className="pt-10" />
      <OrderStatus status={order.status} />
      <div className={styles.ingredientsHeader}>Состав:</div>
      <div className={styles.ingredients}>
        {Array.from(count).map(([ ingredient, count ]) => (
          <div key={ingredient._id} className={styles.ingredient}>
            <IngredientImage image={ingredient.image_mobile} className={styles.ingredientImage} />
            <span>{ingredient.name}</span>
            <Price value={`${count} x ${ingredient.price}`} className={styles.ingredientPrice} />
          </div>
        ))}
      </div>
      <OrderFooter price={price}>
        <OrderDate date={order.createdAt} />
      </OrderFooter>
    </div>
  );
}
