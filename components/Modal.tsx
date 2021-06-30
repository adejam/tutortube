interface ModalProps {
  modalTitle: string
  modalId: string
  modalDisplay: boolean
  closeModal: (...args: any[]) => any
}

const Modal: React.FunctionComponent<ModalProps> = ({
  modalTitle,
  modalId,
  children,
  modalDisplay,
  closeModal,
}) => {
  const closeModalByWindowClick  = (e: any) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };
  return (
    <section id={modalId} onClick={closeModalByWindowClick} aria-hidden="true" className={`modal ${modalDisplay || 'd-none'}  h-full w-full`}>
      <div className="modal-content pos-relative d-flex flex-column ">
        <header className="modal-header d-flex align-flex-start justify-between ">
          <h3 className="modal-title">{modalTitle}</h3>
          <button
            type="button"
            id="close-moda"
            className="close-modal-button pointer"
            onClick={closeModal}
            aria-label="Close"
          >
            <span aria-hidden="true">
              <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </span>
          </button>
        </header>
        <section className="modal-body" aria-label="modal-body">
          {children}
        </section>
      </div>
    </section>
  );
};

export default Modal;
