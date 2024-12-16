import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getBunProps, getFillingProps } from './burger-constructor-item-props.js';
import { Ingredients } from '../../utils/types.js';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ ingredients, delIngredient }) {
  const [ [ bun ], fillings ] = useMemo(() => {
    return ingredients.reduce((acc, n) => (
      acc[+(n.type !== 'bun')].push(n),
      acc
    ), [ [], [] ]);
  }, [ ingredients ]);

  const total = useMemo(() => {
    return ingredients.reduce((acc, n) => acc + n.price, 0);
  }, [ ingredients ]);

  return (
    <section className={styles.container}>

      <ul className={styles.ingredients}>
        <li>
          <ConstructorElement {...getBunProps(bun, 'top')} />
        </li>
      </ul>
      <ul className={styles.ingredients}>
        {!fillings.length && (
          <li>
            <ConstructorElement {...getFillingProps(null)} />
          </li>
        )}
        {fillings.map(n => (
          <li key={n.id}>
            <ConstructorElement {...getFillingProps(n, delIngredient)} />
          </li>
        ))}
      </ul>
      <ul className={styles.ingredients}>
        <li>
          <ConstructorElement {...getBunProps(bun, 'bottom')} />
        </li>
      </ul>

      <div className={styles.footer}>
        <span className={styles.total}>
          {total}
          <CurrencyIcon />
        </span>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>

    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: Ingredients.isRequired,
  delIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
