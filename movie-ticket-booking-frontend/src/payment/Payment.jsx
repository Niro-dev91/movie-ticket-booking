import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { showtimeId } = useParams();

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!state) {
        navigate("/");
        return null;
    }

    const {
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

    const ticketTotal = selectedTickets.reduce(
        (sum, t) => sum + t.price * t.count,
        0
    );

    const foodTotal = cartItems.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
    );

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError("");

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.id) {
                setError("Please login before payment.");
                return;
            }

            if (!stripe || !elements) {
                setError("Stripe is not ready. Please try again.");
                return;
            }

            if (!seats || seats.length === 0) {
                setError("No seats selected. Please go back and select seats.");
                return;
            }

            const response = await fetch(
                "http://localhost:8080/api/payments/create-payment-intent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        showtimeId: Number(showtimeId),
                        amount: total,
                        seats: seats,
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to create payment.");
            }

            const data = await response.json();

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);

                await fetch(
                    `http://localhost:8080/api/payments/failed/${data.paymentIntentId}`,
                    {
                        method: "POST",
                    }
                );

                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                await fetch(
                    `http://localhost:8080/api/payments/success/${result.paymentIntent.id}`,
                    {
                        method: "POST",
                    }
                );

                navigate("/success", {
                    state: {
                        paymentIntentId: result.paymentIntent.id,
                        showtimeId,
                        movieTitle,
                        features,
                        showDate,
                        showTime,
                        cinema,
                        hall,
                        total,
                        selectedTickets,
                        cartItems,
                        seats,
                    },
                });
            }
        } catch (err) {
            setError(err.message || "Payment failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold mb-6 mt-8 uppercase">
                    Payment
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gray-50 shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-6 border-b pb-2">
                            Card Payment
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-white p-4 border rounded-lg">
                                <CardElement
                                    options={{
                                        hidePostalCode: true,
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#111827",
                                                "::placeholder": {
                                                    color: "#9ca3af",
                                                },
                                            },
                                            invalid: {
                                                color: "#ef4444",
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={() => navigate(-1)}
                                disabled={loading}
                                className="text-gray-600 hover:text-black disabled:text-gray-400"
                            >
                                ← Back
                            </button>

                            <button
                                onClick={handlePayment}
                                disabled={loading || !stripe}
                                className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Processing..."
                                    : `Pay LKR ${total.toLocaleString("en-LK")}`}
                            </button>
                        </div>
                    </div>

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
                            {hall}
                        </p>

                        <div className="text-xs text-gray-600 mt-2">
                            Selected Seats:{" "}
                            {seats.length > 0 ? seats.join(", ") : "N/A"}
                        </div>

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

                            <p className="text-xs text-gray-500">
                                Bank Charges & VAT Included
                            </p>
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