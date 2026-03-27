import { useState } from "react";
import {
  FiLogOut,
  FiEdit2,
  FiPlus,
  FiX,
  FiSquare,
  FiCheckSquare,
} from "react-icons/fi";

import "./Dashboard.css";
import RenameListModal from "./RenameListModal";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import ConfirmModal from "./ConfirmModal";

function Dashboard() {
  const [listTitle, setListTitle] = useState("WEEKEND GROCERY");
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteCategoryIndex, setDeleteCategoryIndex] = useState(null);
  const [groceryData, setGroceryData] = useState([]);

  const handleToggleCheck = (categoryIndex, itemId) => {
    setGroceryData(prevData =>
      prevData.map((category, cIndex) => {
        if (cIndex !== categoryIndex) return category;

        return {
          ...category,
          items: category.items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item,
          ),
        };
      }),
    );
  };
  const handleOpenDeleteModal = (categoryIndex, itemId) => {
    setDeleteCategoryIndex(categoryIndex);
    setItemToDelete(itemId);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteItem = (categoryIndex, itemId) => {
    setGroceryData(prevData =>
      prevData.map((category, cIndex) => {
        if (cIndex !== categoryIndex) return category;

        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId),
        };
      }),
    );
  };
  const handleConfirmDelete = () => {
    handleDeleteItem(deleteCategoryIndex, itemToDelete);
    setIsDeleteModalOpen(false);
    setDeleteCategoryIndex(null);
    setItemToDelete(null);
  };
  const handleConfirmClear = () => {
    handleClearAll();
    setIsClearModalOpen(false);
  };
  const handleClearAll = () => {
    setGroceryData(prevData =>
      prevData.map(category => ({
        ...category,
        items: [],
      })),
    );
  };

  const handleAddItem = () => {
    setIsAddModalOpen(true);
  };
  const handleCreateItem = async newItem => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5001/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newItem.name,
          quantity: newItem.quantity,
          category: newItem.category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create item");
        return;
      }

      setGroceryData(prevData => {
        const existingCategory = prevData.find(
          category => category.category === data.category,
        );

        if (existingCategory) {
          return prevData.map(category => {
            if (category.category !== data.category) return category;

            return {
              ...category,
              items: [
                ...category.items,
                {
                  id: data._id,
                  name: data.name,
                  quantity: data.quantity,
                  checked: data.purchased,
                },
              ],
            };
          });
        }

        return [
          ...prevData,
          {
            category: data.category,
            items: [
              {
                id: data._id,
                name: data.name,
                quantity: data.quantity,
                checked: data.purchased,
              },
            ],
          },
        ];
      });
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };
  const handleConfirmLogout = () => {
    alert("Logged out");
    setIsLogoutModalOpen(false);
  };
  const handleEditTitle = () => {
    setIsRenameModalOpen(true);
  };

  const handleOpenEditModal = (categoryIndex, item) => {
    setSelectedCategoryIndex(categoryIndex);
    setSelectedItem({
      ...item,
      category: groceryData[categoryIndex].category,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditedItem = async updatedItem => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5001/api/items/${updatedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: updatedItem.name,
            quantity: updatedItem.quantity,
            category: updatedItem.category,
            checked: updatedItem.checked,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update item");
        return;
      }

      setGroceryData(prevData => {
        const originalCategory = prevData[selectedCategoryIndex].category;

        return prevData.map(category => {
          if (category.category === originalCategory) {
            return {
              ...category,
              items:
                originalCategory === data.category
                  ? category.items.map(item =>
                      item.id === updatedItem.id
                        ? {
                            ...item,
                            name: data.name,
                            quantity: data.quantity,
                            checked: data.purchased,
                          }
                        : item,
                    )
                  : category.items.filter(item => item.id !== updatedItem.id),
            };
          }

          if (category.category === data.category) {
            return {
              ...category,
              items: [
                ...category.items,
                {
                  id: updatedItem.id,
                  name: data.name,
                  quantity: data.quantity,
                  checked: data.purchased,
                },
              ],
            };
          }

          return category;
        });
      });

      setIsEditModalOpen(false);
      setSelectedItem(null);
      setSelectedCategoryIndex(null);
    } catch (error) {
      console.error("Update item error:", error);
      alert("Server error");
    }
  };

  const handleSaveTitle = updatedTitle => {
    setListTitle(updatedTitle.toUpperCase());
    setIsRenameModalOpen(false);
  };

  return (
    <div className="dashboard-page">
      <div className="phone-frame">
        <div className="dashboard-topbar">
          <h2 className="greeting">👋 Hi, yelimlee!</h2>
          <button className="icon-button logout-button" onClick={handleLogout}>
            <FiLogOut />
          </button>
        </div>

        <div className="title-row">
          <div className="title-left">
            <div className="dashboard-title">{listTitle}</div>
            <button
              className="icon-button edit-button"
              onClick={handleEditTitle}>
              <FiEdit2 />
            </button>
          </div>
          <button
            className="clear-button"
            onClick={() => setIsClearModalOpen(true)}>
            Clear
          </button>
        </div>

        <div className="category-list">
          {groceryData.length === 0 ? (
            <div className="empty-state">
              <p>No items yet</p>
              <p className="empty-sub">Tap + to add your first item</p>
            </div>
          ) : (
            groceryData.map((category, categoryIndex) => (
              <div className="category-section" key={category.category}>
                <h3 className="category-title">{category.category}</h3>

                <div className="category-card">
                  {category.items.map(item => (
                    <div
                      className="item-row"
                      key={item.id}
                      onClick={() => handleOpenEditModal(categoryIndex, item)}>
                      <button
                        className="check-button"
                        onClick={e => {
                          e.stopPropagation();
                          handleToggleCheck(categoryIndex, item.id);
                        }}>
                        {item.checked ? <FiCheckSquare /> : <FiSquare />}
                      </button>

                      <span
                        className={
                          item.checked ? "item-text checked" : "item-text"
                        }>
                        {item.name} x {item.quantity}
                      </span>

                      <button
                        className="delete-button"
                        onClick={e => {
                          e.stopPropagation();
                          handleOpenDeleteModal(categoryIndex, item.id);
                        }}>
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <button className="floating-add-button" onClick={handleAddItem}>
          <FiPlus />
        </button>
        {isRenameModalOpen && (
          <RenameListModal
            currentTitle={listTitle}
            onSave={handleSaveTitle}
            onClose={() => setIsRenameModalOpen(false)}
          />
        )}
      </div>
      {isEditModalOpen && selectedItem && (
        <EditItemModal
          currentItem={selectedItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
            setSelectedCategoryIndex(null);
          }}
          onSave={handleSaveEditedItem}
        />
      )}
      {isAddModalOpen && (
        <AddItemModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={newItem => {
            handleCreateItem(newItem);
            setIsAddModalOpen(false);
          }}
        />
      )}
      {isClearModalOpen && (
        <ConfirmModal
          title="CLEAR LIST"
          message="Are you sure you want to clear the list? This action cannot be undone."
          confirmText="Clear"
          onClose={() => setIsClearModalOpen(false)}
          onConfirm={handleConfirmClear}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title="DELETE ITEM"
          message="Are you sure you want to delete this item?"
          confirmText="Delete"
          onClose={() => setIsDeleteModalOpen(false)}
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

export default Dashboard;
