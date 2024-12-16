import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-list.module.css';

const IngredientsList = forwardRef(({ title, children }, ref) => {
  return (
    <div className={styles.container} ref={ref}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {children}
      </div>
    </div>
  );
})

IngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IngredientsList;
