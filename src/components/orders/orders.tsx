import OrderItem from './order-item/order-item.tsx';
import styles from './orders.module.css';

interface IOrderProps {
  orders: IOrder[];
  showStatus?: boolean;
}

export default function Orders({ orders, showStatus = false }: IOrderProps) {
  return (
    <ul className={styles.ordersList}>
      {orders.map(n => (
        <li key={n._id} className={styles.ordersListItem}>
          <OrderItem order={n} showStatus={showStatus} />
        </li>
      ))}
    </ul>
  );
}
