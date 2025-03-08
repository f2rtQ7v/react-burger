import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store.ts';
import { getIngredientsState } from '../../services/features/burger-ingredients/slice.ts';
import styles from './ingredient-details.module.css';

interface IIngredientDetail {
  key: keyof IIngredient;
  name: string;
  unit: string;
}

const details: IIngredientDetail[] = [
  { key:      'calories', name:  'Калории', unit: 'ккал' },
  { key:      'proteins', name:    'Белки', unit:    'г' },
  { key:           'fat', name:     'Жиры', unit:    'г' },
  { key: 'carbohydrates', name: 'Углеводы', unit:    'г' },
];

export default function IngredientDetails() {
  const { id = '' } = useParams();
  const { ingredientsMap } = useSelector(getIngredientsState);
  const ingredient = ingredientsMap[id];

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={ingredient.image_large} />
      <h2 className={styles.name}>{ingredient.name}</h2>
      <div className={styles.details}>
        {details.map(n => (
          <div key={n.key} className={styles.detailsItem}>
            <span>{n.name}, {n.unit}</span>
            <span className={styles.detailsItemValue}>{ingredient[n.key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
