import { useMemo } from 'react';
import { ordersProfile } from '@services/features/orders.list/slices.ts';
import useOrdersData from '@/hooks/use-orders-data';
import OrdersList from '@components/orders-list/orders-list.tsx'
import { LoadingScreen } from '@components/screens/screens.tsx';

export default function ProfileOrdersPage() {
  const { orders } = useOrdersData(ordersProfile);
  const reversedOrders = useMemo(() => orders?.toReversed(), [ orders ]);

  return reversedOrders
    ? <OrdersList orders={reversedOrders} showStatus />
    : <LoadingScreen />;
}
