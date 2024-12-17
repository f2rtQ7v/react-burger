import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, ...props }) {
  return (
    <div className={styles.overlay} {...props}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node,
};

export default ModalOverlay;
