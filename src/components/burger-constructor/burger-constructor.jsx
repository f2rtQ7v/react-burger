import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { Ingredients } from '../../utils/types.js';
import styles from './burger-constructor.module.css';

const getBunProps = (props, type) => props
  ? ({
      type,
      text: `${props.name} (${type === 'top' ? 'Верх' : 'Низ'})`,
      price: props.price,
      thumbnail: props.image,
      isLocked: true,
    })
  : ({
      type,
      text: 'Добавьте булку',
      extraClass: styles.ingredientPlaceholder,
    });

const getFillingProps = (props, delIngredient) => props
  ? ({
      text: props.name,
      price: props.price,
      thumbnail: props.image,
      handleClose: () => delIngredient(props.id),
    })
  : ({
      text: 'Добавьте начинки и соусы',
      extraClass: styles.ingredientPlaceholder,
    });

function BurgerConstructor({ ingredients, delIngredient }) {
  const [ showOrder, setShowOrder ] = useState(false);

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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          disabled={!bun}
          onClick={() => setShowOrder(true)}
        >
          Оформить заказ
        </Button>
      </div>

      {showOrder &&
        <Modal onClose={() => setShowOrder(false)}>
          <OrderDetails orderId={Math.random() * 1e6 | 0} />
        </Modal>
      }

    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: Ingredients.isRequired,
  delIngredient: PropTypes.func.isRequired,
};

export default BurgerConstructor;
