import React from 'react';

const ConfirmationDialog = function ({
  onClose = () => {},
  onConfirm = () => {},
  heading,
  children
} = {}) {
  return (
    <>
      <div className="modal is-active" aria-label="Confirmation Dialog">
        <div className="modal-background animated fadeIn faster" />
        <div className="modal-card animated fadeInDown faster">
          <header
            className="modal-card-head"
            aria-label="Confirmation Dialog Header"
          >
            <p className="modal-card-title">{heading}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">
            <button
              className="button is-danger"
              onClick={onConfirm}
              aria-label="Delete"
            >
              Delete
            </button>
            <button className="button" onClick={onClose} aria-label="Cancel">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;
