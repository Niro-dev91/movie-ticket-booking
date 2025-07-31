import React from "react";
import { useCart } from "../payment/CartContext";

export default function PurchaseSummary() {
    const { cartItems, removeFromCart } = useCart();

    const ticketCost = 7000;
    const foodCost = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = ticketCost + foodCost;

    return (
        <div className="bg-gray-50 p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">PURCHASE SUMMARY</h3>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>ADULT Ticket (x 2)</span>
                    <span>LKR {ticketCost.toLocaleString()}</span>
                </div>

                {cartItems.length > 0 && (
                    <>
                        <div className="font-semibold text-gray-700 mt-4">Food & Beverages Added</div>
                        {cartItems.map((item) => (
                            <div className="flex justify-between items-center" key={item.id}>
                                <span>{item.name} (x {item.qty})</span>
                                <div className="flex items-center gap-2">
                                    <span>LKR {(item.price * item.qty).toLocaleString()}</span>
                                    <button
                                        className="text-red-500 font-bold"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>LKR {total.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Have a promo code?"
                    className="w-full p-2 border rounded"
                />
            </div>
        </div>
    );
}
