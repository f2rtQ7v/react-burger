import styles from './link.module.css';

export default ({ children, className, ...props }) => (
  <span className={`${styles.link} ${className || ''}`} {...props}>
    {children}
  </span>
);
