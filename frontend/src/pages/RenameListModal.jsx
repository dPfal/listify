import { useState } from "react";
import "./RenameListModal.css";

function RenameListModal({ currentTitle, onSave, onClose }) {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleSubmit = e => {
    e.preventDefault();

    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onSave(trimmedTitle);
  };

  return (
    <div className="center-modal-overlay" onClick={onClose}>
      <div className="rename-modal" onClick={e => e.stopPropagation()}>
        <h2 className="rename-modal-title">RENAME LIST</h2>

        <form className="rename-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="rename-input"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Enter list name"
          />

          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default RenameListModal;
