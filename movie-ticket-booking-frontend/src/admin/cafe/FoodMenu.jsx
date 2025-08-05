import React, { useState, useEffect } from "react";

export default function FoodMenu() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/food-categories/all")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedItems = [...items];
      updatedItems[index].image = reader.result; // base64 string
      setItems(updatedItems);
    };
    if (file) reader.readAsDataURL(file);
  };

  const addItem = () => {
    if (!selectedCategoryId) return;
    const categoryObj = categories.find(
      (cat) => cat.id.toString() === selectedCategoryId
    );
    setItems([
      ...items,
      {
        name: "",
        price: "",
        description: "",
        categoryId: selectedCategoryId,
        categoryName: categoryObj?.name || "",
        image: null,
      },
    ]);
  };

  // Remove one item by index
  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Remove all items
  const removeAllItems = () => {
    setItems([]);
  };

  const saveItems = () => {
    const payload = items.map(({ name, price, description, categoryId, image }) => ({
      name,
      price,
      description,
      categoryId: Number(categoryId),
      image, // base64 string
    }));

    fetch("/api/food-items/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          alert("Items saved successfully!");
          setItems([]);
        } else {
          alert("Failed to save items.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving items.");
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Menu Management</h2>

      {/* Category Dropdown */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Select Category
        </label>
        <select
          value={selectedCategoryId}
          onChange={handleCategoryChange}
          className="block w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-400 text-gray-700"
        >
          <option value="">Choose a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Item Button */}
      <button
        onClick={addItem}
        disabled={!selectedCategoryId}
        className="mb-8 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        + Add Item
      </button>

      {/* Remove All Button */}
      {items.length > 0 && (
        <button
          onClick={removeAllItems}
          className="mb-8 ml-4 px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
        >
          Remove All
        </button>
      )}

      {/* Item Cards */}
      <div className="grid gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 relative"
          >
            {/* Remove single item button */}
            <button
              onClick={() => removeItem(index)}
              className="absolute top-3 right-3 text-red-600 font-bold text-xl hover:text-red-800"
              title="Remove item"
            >
              &times;
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Price</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-1">Description</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows={2}
                value={item.description}
                onChange={(e) => handleItemChange(index, "description", e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
              />
              {item.image && (
                <img
                  src={item.image}
                  alt="Uploaded"
                  className="mt-3 w-32 h-32 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      {items.length > 0 && (
        <button
          onClick={saveItems}
          className="mt-8 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
          Save All Items
        </button>
      )}
    </div>
  );
}
