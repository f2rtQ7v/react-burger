import styles from './link.module.css';

export default function Link({ children, className, ...props }) {
  return (
    <span className={`${styles.link} ${className || ''}`} {...props}>
      {children}
    </span>
  );
}
