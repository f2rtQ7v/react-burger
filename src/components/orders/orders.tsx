import { Link, useLocation } from 'react-router-dom';
import OrderItem from './order-item/order-item.tsx';
import styles from './orders.module.css';

interface IOrderProps {
  orders: IOrder[];
  showStatus?: boolean;
}

export default function Orders({ orders, showStatus = false }: IOrderProps) {
  const location = useLocation();

  return (
    <ul className={styles.ordersList}>
      {orders.map(n => (
        <li key={n._id} className={styles.ordersListItem}>
          <Link
            to={`${location.pathname}/${n.number}`}
            state={{ background: location }}
          >
            <OrderItem order={n} showStatus={showStatus} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
