import styles from './orders.module.css';

interface IOrderProps {
  orders: TOrder[];
}

export default function Orders({ orders }: IOrderProps) {
  return (
    <ul>
      {orders.map(n => <li key={n._id}>{n.name}</li>)}
    </ul>
  );
}
