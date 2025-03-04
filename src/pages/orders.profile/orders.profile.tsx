import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from '../../hooks/use-app-dispatch.ts';
import actions from '../../services/features/orders.profile/actions.ts';
import Orders from '../../components/orders/orders.tsx'
import { LoadingScreen } from '../../components/screens/screens.tsx';
import { ordersProfileUrl } from '../../utils/orders.ts';
import styles from './orders.profile.module.css';

export default function ProfileOrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.connect(ordersProfileUrl()));
    return () => dispatch(actions.disconnect());
  }, [ dispatch ]);

  const { orders } = useSelector(state => state.ordersProfile);

  if (!orders) {
    return <LoadingScreen />;
  }

  return (
    <Orders orders={orders} />
  );
}
