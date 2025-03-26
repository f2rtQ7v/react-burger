import { useEffect } from 'react';
import { useDispatch, useSelector } from '@services/store.ts';
import { TOrdersSlice } from '@services/features/orders.list/slice-creator';

export default function useOrdersData(ordersSlice: TOrdersSlice) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersSlice.actions.connect(ordersSlice.getUrl()));
    return () => {
      dispatch(ordersSlice.actions.disconnect());
    };
  }, [ dispatch, ordersSlice ]);

  return useSelector(ordersSlice.getState);
}
