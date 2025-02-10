import PropTypes from 'prop-types';
import styles from './error-screen.module.css';

function ErrorScreen({ transparent = false, children }) {
  const classes = [ styles.container, transparent && styles.transparent ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

ErrorScreen.propTypes = {
  transparent: PropTypes.bool,
};

export default ErrorScreen;
