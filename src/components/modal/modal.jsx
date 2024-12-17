import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay.jsx';
import styles from './modal.module.css';

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKeydown = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [ onClose ]);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span>{title}</span>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    document.body
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
