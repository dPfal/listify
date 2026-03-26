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
function Dashboard() {
  const [listTitle, setListTitle] = useState("WEEKEND GROCERY");
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [groceryData, setGroceryData] = useState([
    {
      category: "Fruit",
      emoji: "🍎",
      items: [{ id: 1, name: "Grape", quantity: 1, checked: false }],
    },
    {
      category: "Veggies",
      emoji: "🥬",
      items: [{ id: 2, name: "Lettuce", quantity: 2, checked: true }],
    },
    {
      category: "Bread",
      emoji: "🍞",
      items: [
        { id: 3, name: "Burger Bun", quantity: 1, checked: false },
        { id: 4, name: "Wheat Bread", quantity: 1, checked: false },
      ],
    },
    {
      category: "Dairy",
      emoji: "🥛",
      items: [{ id: 5, name: "Soy Milk", quantity: 1, checked: true }],
    },
    {
      category: "Meat",
      emoji: "🥩",
      items: [{ id: 6, name: "Rump Steak", quantity: 1, checked: true }],
    },
    {
      category: "Seafood",
      emoji: "🐟",
      items: [{ id: 7, name: "Salmon", quantity: 1, checked: false }],
    },
  ]);

  const handleToggleCheck = (categoryIndex, itemId) => {
    setGroceryData(prevData =>
      prevData.map((category, cIndex) => {
        if (cIndex !== categoryIndex) return category;

        return {
          ...category,
          items: category.items.map(item =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          ),
        };
      })
    );
  };

  const handleDeleteItem = (categoryIndex, itemId) => {
    setGroceryData(prevData =>
      prevData.map((category, cIndex) => {
        if (cIndex !== categoryIndex) return category;

        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId),
        };
      })
    );
  };

  const handleClearAll = () => {
    setGroceryData(prevData =>
      prevData.map(category => ({
        ...category,
        items: [],
      }))
    );
  };

  const handleAddItem = () => {
    setIsAddModalOpen(true);
  };

  const handleLogout = () => {
    alert("Logout button clicked");
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

  const handleSaveEditedItem = updatedItem => {
    setGroceryData(prevData => {
      const originalCategory = prevData[selectedCategoryIndex].category;

      return prevData.map(category => {
        if (category.category === originalCategory) {
          return {
            ...category,
            items:
              originalCategory === updatedItem.category
                ? category.items.map(item =>
                    item.id === updatedItem.id
                      ? {
                          ...item,
                          name: updatedItem.name,
                          quantity: updatedItem.quantity,
                          checked: updatedItem.checked,
                        }
                      : item
                  )
                : category.items.filter(item => item.id !== updatedItem.id),
          };
        }

        if (category.category === updatedItem.category) {
          return {
            ...category,
            items: [
              ...category.items,
              {
                id: updatedItem.id,
                name: updatedItem.name,
                quantity: updatedItem.quantity,
                checked: updatedItem.checked,
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
          <button className="clear-button" onClick={handleClearAll}>
            Clear
          </button>
        </div>

        <div className="category-list">
          {groceryData.map((category, categoryIndex) => (
            <div className="category-section" key={category.category}>
              <h3 className="category-title">
                <span className="category-emoji">{category.emoji}</span>{" "}
                {category.category}
              </h3>

              <div className="category-card">
                {category.items.length > 0 ? (
                  category.items.map(item => (
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
                          handleDeleteItem(categoryIndex, item.id);
                        }}>
                        <FiX />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="empty-text">No items</p>
                )}
              </div>
            </div>
          ))}
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
            console.log(newItem);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
