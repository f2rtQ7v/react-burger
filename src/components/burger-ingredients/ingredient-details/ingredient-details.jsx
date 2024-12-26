import { Ingredient } from '../../../utils/types.js';
import styles from './ingredient-details.module.css';

const details = [
  { key:      'calories', name:  'Калории', unit: 'ккал' },
  { key:      'proteins', name:    'Белки', unit:    'г' },
  { key:           'fat', name:     'Жиры', unit:    'г' },
  { key: 'carbohydrates', name: 'Углеводы', unit:    'г' },
];

const IngredientDetails = ({ ingredient, ...props }) => (
  <div className={styles.container} {...props}>
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

IngredientDetails.propTypes = {
  ingredient: Ingredient.isRequired,
};

export default IngredientDetails;
