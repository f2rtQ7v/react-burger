import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { BURGER_CONSTRUCTOR_ADD, BURGER_CONSTRUCTOR_DEL } from '../../services/actions/burger-constructor.js';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details.jsx';
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

function BurgerConstructor() {
  const dispatch = useDispatch();

  const { bun, fillings } = useSelector(state => state.burgerConstructor);

  const delIngredient = useCallback(id => {
    dispatch({ type: BURGER_CONSTRUCTOR_DEL, id });
  }, [ dispatch ]);

  const [ showOrder, setShowOrder ] = useState(false);

  const total = useMemo(() => {
    return fillings.reduce((acc, n) => acc + n.price, bun?.price << 1);
  }, [ bun, fillings ]);

  const [ collected, dropRef ] = useDrop(() => ({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({ type: BURGER_CONSTRUCTOR_ADD, ingredient });
    },
  }));

  return (
    <section className={styles.container} ref={dropRef}>

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

export default BurgerConstructor;
