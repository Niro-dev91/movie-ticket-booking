import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const {
        customer,
        paymentMode,
        total,
        selectedTickets = [],
        cartItems = [],
    } = state || {};

    const [card, setCard] = useState({
        number: "",
        expMonth: "",
        expYear: "",
        name: "",
        cvv: "",
    });

    if (!state) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        console.log("Payment Data:", { customer, card, total });
        alert("Payment successful!");
        navigate("/success");
    };

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6 ml-4 mt-8 text-left uppercase">
                    Payment
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 py-4">

                    {/* LEFT – Card Payment */}
                    <div className="lg:col-span-2 bg-gray-50 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-6 border-b pb-2">
                            Card Payment
                        </h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                name="number"
                                placeholder="Card Number"
                                value={card.number}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    name="expMonth"
                                    value={card.expMonth}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Expiry Month</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {String(i + 1).padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="expYear"
                                    value={card.expYear}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Expiry Year</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={25 + i}>
                                            {25 + i}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <input
                                type="text"
                                name="name"
                                placeholder="Cardholder Name"
                                value={card.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />

                            <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                value={card.cvv}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                className="text-gray-600 hover:text-black"
                                onClick={() => navigate(-1)}
                            >
                                ← Back
                            </button>

                            <button
                                onClick={handlePayment}
                                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
                            >
                                Pay LKR {total.toLocaleString("en-LK")}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT – Order Summary */}
                    <div className="bg-gray-50 shadow-md rounded-2xl p-6 h-fit">
                        <h3 className="text-xl font-semibold mb-6 border-b pb-2">
                            Order Summary
                        </h3>

                        <div className="space-y-3 text-sm">
                            {selectedTickets.map((t) => (
                                <div key={t.id} className="flex justify-between">
                                    <span>{t.type} (x{t.count})</span>
                                    <span>
                                        LKR {(t.price * t.count).toLocaleString("en-LK")}
                                    </span>
                                </div>
                            ))}

                            {cartItems.map((i) => (
                                <div key={i.id} className="flex justify-between">
                                    <span>{i.name} (x{i.qty})</span>
                                    <span>
                                        LKR {(i.price * i.qty).toLocaleString("en-LK")}
                                    </span>
                                </div>
                            ))}

                            <hr />

                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>LKR {total.toLocaleString("en-LK")}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
