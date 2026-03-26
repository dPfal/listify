import "./ConfirmModal.css";

function ConfirmModal({ title, message, confirmText, onClose, onConfirm }) {
  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
        <h2 className="confirm-modal-title">{title}</h2>

        <p className="confirm-modal-message">{message}</p>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="confirm-cancel-button"
            onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            className="confirm-action-button"
            onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
