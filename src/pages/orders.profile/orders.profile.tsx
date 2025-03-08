import { useEffect } from 'react';
import { useSelector, useDispatch } from '@services/store.ts';
import actions from '@services/features/orders.profile/actions.ts';
import OrdersList from '@components/orders-list/orders-list.tsx'
import { LoadingScreen } from '@components/screens/screens.tsx';
import { ordersProfileUrl } from '@utils/orders.ts';

export default function ProfileOrdersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.connect(ordersProfileUrl()));
    return () => {
      dispatch(actions.disconnect());
    };
  }, [ dispatch ]);

  const orders = useSelector(state => state.ordersProfile.orders?.toReversed());

  return orders
    ? <OrdersList orders={orders} showStatus />
    : <LoadingScreen />;
}
