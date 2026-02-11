import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, header, onClose }) {

  return ReactDOM.createPortal(
    <>
      <div className="modalOverlay" onClose={onClose} />
      <div className="modal">
        <h3 onClose={onClose}>{header}</h3>
        {children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;