import { useState } from "react";
import "./CategoryModal.css";

function CategoryModal({ mode, currentCategory, onClose, onSave }) {
  const isEditMode = mode === "edit";

  const [categoryName, setCategoryName] = useState(
    isEditMode && currentCategory ? currentCategory.name : ""
  );

  const [emoji, setEmoji] = useState(
    isEditMode && currentCategory ? currentCategory.emoji : "🏷️"
  );

  const emojiOptions = ["🏷️", "🍞", "🥛", "🍎", "🥩", "🐟", "🥬", "🍚", "🍪"];

  const handleSubmit = e => {
    e.preventDefault();

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      return;
    }

    onSave({
      name: trimmedName,
      emoji,
    });
  };

  return (
    <div className="category-modal-overlay" onClick={onClose}>
      <div className="category-modal-box" onClick={e => e.stopPropagation()}>
        <h2 className="category-modal-title">
          {isEditMode ? "EDIT CATEGORY" : "ADD CATEGORY"}
        </h2>

        <form className="category-modal-form" onSubmit={handleSubmit}>
          <div className="category-input-row">
            <div className="category-input-wrapper">
              <span className="category-input-emoji">{emoji}</span>
              <input
                type="text"
                className="category-name-input"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
                placeholder="Category name"
              />
            </div>

            <button type="submit" className="category-save-button">
              {isEditMode ? "Save" : "Add"}
            </button>
          </div>

          <div className="emoji-picker-row">
            {emojiOptions.map(item => (
              <button
                key={item}
                type="button"
                className={
                  emoji === item
                    ? "emoji-option-button selected"
                    : "emoji-option-button"
                }
                onClick={() => setEmoji(item)}>
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
