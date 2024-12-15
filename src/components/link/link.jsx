import PropTypes from 'prop-types';
import styles from './link.module.css';

function Link({ children, className, disabled, ...props }) {
  const classes = [ styles.link, disabled && styles.disabled, className ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

Link.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Link;
