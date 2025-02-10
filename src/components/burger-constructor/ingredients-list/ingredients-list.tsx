import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';

const IngredientsList = ({ children }) => (
  <ul className={styles.container}>
    {children}
  </ul>
);

IngredientsList.propTypes = {
  children: PropTypes.node,
};

export default IngredientsList;
