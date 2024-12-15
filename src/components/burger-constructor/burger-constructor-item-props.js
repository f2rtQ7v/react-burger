import styles from './burger-constructor.module.css';

export const getBunProps = (props, type) => props
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

export const getFillingProps = (props, delIngredient) => props
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
