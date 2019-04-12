import React from "react";

const ConfirmationDialog = function({ onClose = () => {}, onConfirm = () => {}, heading, children } = {}) {
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background animated fadeIn faster" />
        <div className="modal-card animated fadeInDown faster">
          <header className="modal-card-head">
            <p className="modal-card-title">{heading}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={onConfirm}>
              Delete
            </button>
            <button className="button" onClick={onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;
