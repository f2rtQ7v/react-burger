import { Link, useLocation } from 'react-router-dom';
import OrderItem from './order-item/order-item.tsx';
import styles from './orders-list.module.css';

interface IOrdersListProps {
  orders: IOrder[];
  showStatus?: boolean;
}

export default function OrdersList({ orders, showStatus = false }: IOrdersListProps) {
  const location = useLocation();

  return (
    <div className={styles.container}>
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
    </div>
  );
}
