import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '@components/modal-overlay/modal-overlay';

import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

export const Modal = ({ title, onClose, children }) => {
  // Обработчик нажатия клавиши Escape
  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Добавляем обработчик при монтировании
    document.addEventListener('keydown', handleEscapeKey);

    // Удаляем обработчик при размонтировании
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  const handleOverlayClick = () => {
    onClose();
  };

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={handleOverlayClick} />
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div className={styles.header}>
          {title && (
            <h2 id="modal-title" className="text text_type_main-large">
              {title}
            </h2>
          )}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            data-testid="modal-close-button"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
