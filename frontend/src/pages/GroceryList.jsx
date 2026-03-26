import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GroceryList() {
  const [listName, setListName] = useState("My Grocery List");
  const [renameInput, setRenameInput] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Milk", purchased: false },
    { id: 2, name: "Bread", purchased: true },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRenameList = () => {
    if (!renameInput.trim()) return;
    setListName(renameInput);
    setRenameInput("");
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    const item = {
      id: Date.now(),
      name: newItem,
      purchased: false,
    };

    setItems([...items, item]);
    setNewItem("");
  };

  const handleDeleteItem = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const handleTogglePurchased = id => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setItems(updatedItems);
  };

  const handleUpdateItem = id => {
    const newName = prompt("Enter new item name:");
    if (!newName || !newName.trim()) return;

    const updatedItems = items.map(item =>
      item.id === id ? { ...item, name: newName } : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="grocery-container">
      <div className="top-bar">
        <h2>{listName}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="rename-section">
        <input
          type="text"
          placeholder="Enter new list name"
          value={renameInput}
          onChange={e => setRenameInput(e.target.value)}
        />
        <button onClick={handleRenameList}>Rename List</button>
      </div>

      <div className="add-section">
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item-card">
            <span className={item.purchased ? "purchased" : ""}>
              {item.name}
            </span>

            <div className="item-buttons">
              <button onClick={() => handleTogglePurchased(item.id)}>
                {item.purchased ? "Unmark" : "Purchased"}
              </button>
              <button onClick={() => handleUpdateItem(item.id)}>Update</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
