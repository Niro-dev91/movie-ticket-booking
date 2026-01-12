import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { showtimeId } = useParams();

    const [card, setCard] = useState({
        number: "",
        expMonth: "",
        expYear: "",
        name: "",
        cvv: "",
    });

    if (!state) {
        navigate("/");
        return null;
    }

    const {
        customer,
        paymentMode,
        total = 0,
        selectedTickets = [],
        cartItems = [],
        movieTitle,
        features,
        showDate,
        showTime,
        cinema,
        hall,
        seats = [],
    } = state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        console.log("Payment Data:", {
            showtimeId,
            customer,
            paymentMode,
            card,
            total,
        });

        alert("Payment successful!");
        navigate("/success");
    };

    const ticketTotal = selectedTickets.reduce(
        (sum, t) => sum + t.price * t.count,
        0
    );

    const foodTotal = cartItems.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
    );

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6 mt-8 uppercase">
                    Payment
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

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
                                className="w-full p-3 border rounded-lg"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    name="expMonth"
                                    value={card.expMonth}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
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
                                    className="w-full p-3 border rounded-lg"
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
                                className="w-full p-3 border rounded-lg"
                            />

                            <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                value={card.cvv}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            />
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-600 hover:text-black"
                            >
                                ← Back
                            </button>

                            <button
                                onClick={handlePayment}
                                className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600"
                            >
                                Pay LKR {total.toLocaleString("en-LK")}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT – Order Summary */}
                    <div className="bg-white shadow-md rounded-2xl p-6 border h-fit">

                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold uppercase">
                                {movieTitle}
                            </h3>
                            <span className="text-sm text-gray-600">
                                {selectedTickets.reduce((a, b) => a + b.count, 0)} Ticket(s)
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                            {features}, {showDate}, {showTime} <br />
                            {cinema} <br />
                            {hall} <br />
                        </p>

                        <hr className="my-4" />

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Tickets</span>
                                <span>LKR {ticketTotal.toLocaleString("en-LK")}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Food & Beverages</span>
                                <span>LKR {foodTotal.toLocaleString("en-LK")}</span>
                            </div>
                            <p className="note">Bank Charges & VAT Included</p>
                        </div>                      
                        <hr className="my-4" />

                        <div className="flex justify-between font-bold">
                            <span>SUB TOTAL</span>
                            <span>LKR {total.toLocaleString("en-LK")}</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
