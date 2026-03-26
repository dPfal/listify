import { useState } from "react";
import CategoryModal from "./CategoryModal";
import ConfirmModal from "./ConfirmModal";
import "./AdminPanel.css";
import { FiLogOut } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
function AdminPanel() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Bread", emoji: "🍞" },
    { id: 2, name: "Dairy", emoji: "🥛" },
    { id: 3, name: "Fruit", emoji: "🍎" },
    { id: 4, name: "Meat", emoji: "🥩" },
    { id: 5, name: "Seafood", emoji: "🐟" },
    { id: 6, name: "Veggies", emoji: "🥬" },
  ]);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditModal = category => {
    setModalMode("edit");
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleOpenDeleteModal = category => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCategory = categoryData => {
    if (modalMode === "add") {
      const newCategory = {
        id: Date.now(),
        name: categoryData.name,
        emoji: categoryData.emoji,
      };

      setCategories(prev => [...prev, newCategory]);
    } else {
      setCategories(prev =>
        prev.map(category =>
          category.id === selectedCategory.id
            ? {
                ...category,
                name: categoryData.name,
                emoji: categoryData.emoji,
              }
            : category
        )
      );
    }

    setIsCategoryModalOpen(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = () => {
    setCategories(prev =>
      prev.filter(category => category.id !== selectedCategory.id)
    );
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    alert("Logged out");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="admin-page">
      <div className="phone-frame">
        <div className="admin-topbar">
          <h2 className="admin-greeting">⚙️ Admin Panel</h2>
          <button
            className="icon-button logout-button"
            onClick={handleLogoutClick}>
            <FiLogOut />
          </button>
        </div>

        <div className="admin-title-row">
          <div className="admin-main-title">CATEGORY MANAGEMENT</div>
        </div>

        <div className="admin-category-card">
          {categories.map(category => (
            <div className="admin-category-row" key={category.id}>
              <div className="admin-category-left">
                <span className="admin-category-emoji">{category.emoji}</span>
                <span className="admin-category-name">{category.name}</span>
              </div>

              <div className="admin-category-actions">
                <button
                  className="admin-delete-button"
                  onClick={() => handleOpenDeleteModal(category)}>
                  Delete
                </button>

                <button
                  className="admin-edit-button"
                  onClick={() => handleOpenEditModal(category)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="admin-floating-add-button"
          onClick={handleOpenAddModal}>
          <FiPlus />
        </button>
      </div>

      {isCategoryModalOpen && (
        <CategoryModal
          mode={modalMode}
          currentCategory={selectedCategory}
          onClose={() => {
            setIsCategoryModalOpen(false);
            setSelectedCategory(null);
          }}
          onSave={handleSaveCategory}
        />
      )}

      {isDeleteModalOpen && selectedCategory && (
        <ConfirmModal
          title="DELETE CATEGORY"
          message="Are you sure you want to delete this category?"
          confirmText="Delete"
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isLogoutModalOpen && (
        <ConfirmModal
          title="LOGOUT"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}

export default AdminPanel;
