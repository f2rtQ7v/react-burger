import styles from './link.module.css';

const Link = ({ children, className, ...props }) =>
  <span className={`${styles.link} ${className || ''}`} {...props}>{children}</span>

export default Link;
