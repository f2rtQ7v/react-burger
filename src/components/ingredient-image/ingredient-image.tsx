import { ReactNode, CSSProperties } from 'react';
import styles from './ingredient-image.module.css';

interface IIngredientImageProps {
  image: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function IngredientImage({
  image,
  className = '',
  children,
  ...props
}: IIngredientImageProps) {
  return (
    <div className={`${styles.ingredient} ${className}`} {...props}>
      <img src={image} className={styles.ingredientImage} />
      {children}
    </div>
  );
}
