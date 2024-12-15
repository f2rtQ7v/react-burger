import styles from './link.module.css';

export default function Link({ children, className, disabled, ...props }) {
  const classes = [ styles.link, disabled && styles.disabled, className ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
