import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function FoodAndBeverage() {
  const [categories, setCategories] = useState([]);
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategoriesAndItems();
  }, []);

  const fetchCategoriesAndItems = async () => {
    try {
      const [categoryRes, itemRes] = await Promise.all([
        axios.get("http://localhost:8080/api/food-categories/all"),
        axios.get("http://localhost:8080/api/food-items/all"),
      ]);

      const categories = categoryRes.data;
      const items = itemRes.data;

      setCategories(categories);
      if (categories.length > 0) setActiveTab(categories[0].name);

      // Group items by category name
      const grouped = {};
      categories.forEach(cat => {
        grouped[cat.name] = items.filter(item => item.categoryName === cat.name);
      });

      setItemsByCategory(grouped);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const handleQuantityChange = (id, amount) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount),
    }));
  };

  const handleAddToCart = (item) => {
    const uniqueId = item.id || item.name;
    const qty = quantities[uniqueId] || 1;

    addToCart({ ...item, id: uniqueId, qty }); 
  };



  return (
    <div className="w-full max-w-3xl bg-gray-50 shadow-md rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6 border-b pb-2">FOOD & BEVERAGES</h3>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.name)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${activeTab === cat.name
              ? "bg-pink-100 text-pink-600 border-pink-500"
              : "bg-gray-100 text-gray-600 border-transparent"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {itemsByCategory[activeTab]?.map((item) => (
          <div
            key={item.id || item.name}  
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded object-cover"
            />

            {/* Name and price */}
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{item.name}</div>
              <div className="text-sm text-gray-500">LKR {item.price}.00</div>
            </div>

            {/* Quantity control */}
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 text-lg border rounded flex items-center justify-center"
                onClick={() => handleQuantityChange(item.id || item.name, -1)}
              >
                −
              </button>
              <input
                type="text"
                readOnly
                className="w-10 text-center border rounded"
                value={quantities[item.id || item.name] || 1}   
              />
              <button
                className="w-8 h-8 text-lg border rounded flex items-center justify-center"
                onClick={() => handleQuantityChange(item.id || item.name, 1)}
              >
                +
              </button>
            </div>

            {/* Add button */}
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Add
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
