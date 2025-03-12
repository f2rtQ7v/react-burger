import { useSelector } from '@services/store.ts';
import { getIngredientsState } from '@services/features/burger-ingredients/slice.ts';

export default function useOrderIngredients(order: IOrder | null) {
  const { ingredientsMap } = useSelector(getIngredientsState);
  const orderIngredients = order?.ingredients.map(n => ingredientsMap[n]);

  return orderIngredients?.every(Boolean)
    ? orderIngredients
    : null;
}
