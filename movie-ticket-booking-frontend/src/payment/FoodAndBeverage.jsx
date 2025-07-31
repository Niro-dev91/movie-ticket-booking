import React, { useState } from "react";
import { useCart } from "../payment/CartContext";

const allItems = {
    Coffee: [
        { id: 1, name: "Mochaccino", price: 700, img: "https://via.placeholder.com/60" },
        { id: 2, name: "Hot Chocolate", price: 700, img: "https://via.placeholder.com/60" },
        { id: 3, name: "Americano", price: 700, img: "https://via.placeholder.com/60" },
    ],
    Popcorn: [
        { id: 4, name: "Cheese Popcorn", price: 850, img: "https://via.placeholder.com/60" },
    ],
    Combo: [
        { id: 5, name: "Movie Combo", price: 1500, img: "https://via.placeholder.com/60" },
    ],
    "Hot Kitchen": [
        { id: 6, name: "Fried Chicken", price: 1200, img: "https://via.placeholder.com/60" },
    ],
    Juice: [
        { id: 7, name: "Orange Juice", price: 500, img: "https://via.placeholder.com/60" },
    ],
    Desserts: [
        { id: 8, name: "Brownie", price: 600, img: "https://via.placeholder.com/60" },
    ],
    Beverage: [
        { id: 9, name: "Coca Cola", price: 400, img: "https://via.placeholder.com/60" },
    ],
};

const categories = Object.keys(allItems);

export default function FoodAndBeverage() {
    const [activeTab, setActiveTab] = useState("Coffee");
    const [quantities, setQuantities] = useState({});
    const { addToCart } = useCart();

    const handleQuantityChange = (id, amount) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + amount),
        }));
    };

    const handleAddToCart = (item) => {
        const qty = quantities[item.id] || 1;
        for (let i = 0; i < qty; i++) {
            addToCart(item);
        }
    };

    return (
        <div className="w-full max-w-3xl bg-gray-50 shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 border-b pb-2">FOOD & BEVERAGES</h3>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap mb-6">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-4 py-2 rounded-md border text-sm font-medium ${activeTab === cat
                            ? "bg-pink-100 text-pink-600 border-pink-500"
                            : "bg-gray-100 text-gray-600 border-transparent"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Items List */}
            <div className="space-y-4">
                {allItems[activeTab].map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4"
                    >
                        {/* Image */}
                        <img
                            src={item.img}
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
                                onClick={() => handleQuantityChange(item.id, -1)}
                            >
                                −
                            </button>
                            <input
                                type="text"
                                readOnly
                                className="w-10 text-center border rounded"
                                value={quantities[item.id] || 1}
                            />
                            <button
                                className="w-8 h-8 text-lg border rounded flex items-center justify-center"
                                onClick={() => handleQuantityChange(item.id, 1)}
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
