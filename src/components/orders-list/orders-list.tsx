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
      {orders.map(n => (
        <Link
          key={n._id}
          to={`${location.pathname}/${n.number}`}
          state={{ background: location }}
        >
          <OrderItem order={n} showStatus={showStatus} />
        </Link>
      ))}
    </div>
  );
}
