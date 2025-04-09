import { useState, useLayoutEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderItem from './order-item/order-item.tsx';
import styles from './orders-list.module.css';

interface IOrdersListProps {
  orders: IOrder[];
  showStatus?: boolean;
}

export default function OrdersList({ orders, showStatus = false }: IOrdersListProps) {
  const location = useLocation();
  const ordersRef = useRef(null);
  const [ showIngredients, setShowIngredients ] = useState(6);

  useLayoutEffect(() => {
    if (ordersRef.current) {
      const observer = new ResizeObserver(entries => {
        for (const n of entries) {
          setShowIngredients(Math.min(8, Math.max(5, (n.contentRect.width - 250) / 50 | 0)));
        }
      });
      observer.observe(ordersRef.current);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className={styles.container} ref={ordersRef}>
      {orders.map(n => (
        <Link
          key={n._id}
          to={`${location.pathname}/${n.number}`}
          state={{ background: location }}
        >
          <OrderItem order={n} showStatus={showStatus} showIngredients={showIngredients} />
        </Link>
      ))}
    </div>
  );
}
