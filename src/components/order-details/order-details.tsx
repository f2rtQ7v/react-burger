import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store.ts';
import { getIngredientsState } from '../../services/features/burger-ingredients/slice.ts';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '../ingredient-image/ingredient-image.tsx';
import OrderStatus from '../order-status/order-status.tsx';
import Price from '../price/price.tsx';
import { LoadingScreen, ErrorScreen } from '../screens/screens.tsx';
import { getOrder } from '../../services/features/orders.by-number/actions.ts';
import styles from './order-details.module.css';

interface IOrderDetails {
  showHeader?: boolean;
  showStatus?: boolean;
}

export default function OrderDetails({
  showHeader = false,
  showStatus = false,
}: IOrderDetails) {
  const dispatch = useDispatch();
  const { number = -1 } = useParams();
  const { orders: ordersAll } = useSelector(state => state.ordersAll);
  const { orders: ordersProfile } = useSelector(state => state.ordersProfile);
  const { orders: ordersByNumber, error } = useSelector(state => state.ordersByNumber);
  const { ingredients } = useSelector(getIngredientsState);

  const order =
    ordersAll?.find(n => n.number === +number) ??
    ordersProfile?.find(n => n.number === +number) ??
    ordersByNumber[number];

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

  const orderIngredients = order.ingredients.map(n => ingredients!.find(m => n === m._id));
  if (orderIngredients.some(n => !n)) {
    return null;
  }

  const [ count, price ] = orderIngredients.reduce((acc, n) => (
    acc[0].set(n, -~acc[0].get(n)),
    acc[1] += n!.price,
    acc
  ), [ new Map, 0 ]);

  return (
    <div className={styles.container}>
      {showHeader && <div className={styles.header}>#{order.number}</div>}
      <div className={styles.name}>{order.name}</div>
      {showStatus && <OrderStatus status={order.status} />}
      <div className={styles.ingredientsHeader}>Состав:</div>
      <div className={styles.ingredients}>
        {Array.from(count).map(([ ingredient, count ]) => (
          <div className={styles.ingredient}>
            <IngredientImage image={ingredient.image_mobile} className={styles.ingredientImage} />
            <span>{ingredient.name}</span>
            <Price value={`${count} x ${ingredient.price}`} className={styles.ingredientPrice} />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <FormattedDate date={new Date(order.createdAt)} className={styles.createdAt} />
        <Price value={price} />
      </div>
    </div>
  );
}
