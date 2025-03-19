import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay.tsx';
import styles from './modal.module.css';

interface IModalProps {
  title?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title = '', onClose, children }: IModalProps) {
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();

    document.addEventListener('keydown', onKeydown);
    document.body.classList.add(styles.noScroll);

    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.body.classList.remove(styles.noScroll);
    };
  }, [ onClose ]);

  return createPortal(
    <ModalOverlay onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
        data-test-id="modal"
      >
        <div className={styles.header}>
          <span>{title}</span>
          <span data-test-id="modal-close">
            <CloseIcon type="primary" className={styles.close} onClick={onClose} />
          </span>
        </div>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    document.body
  );
}
