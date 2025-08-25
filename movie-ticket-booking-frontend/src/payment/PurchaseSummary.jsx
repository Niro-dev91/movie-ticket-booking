import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PaymentModeSelector } from "../payment/PaymentModeSelector";

export default function PurchaseSummary() {
  const location = useLocation();
  const { selectedTickets = [] } = location.state || {};
  const { cartItems, removeFromCart } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    email: "",
  });

  const ticketCost = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.count,
    0
  );
  const foodCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const total = ticketCost + foodCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 p-6 rounded shadow max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">PURCHASE SUMMARY</h3>

      <div className="space-y-2 text-sm">
        {/* Tickets */}
        {selectedTickets.length > 0 ? (
          selectedTickets.map((ticket) => (
            <div className="flex justify-between" key={ticket.id}>
              <span>
                {ticket.type} (x {ticket.count})
              </span>
              <span>
                LKR {(ticket.price * ticket.count).toLocaleString("en-LK")}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tickets selected</p>
        )}

        {/* Food & Beverages */}
        {cartItems.length > 0 && (
          <>
            <div className="font-semibold text-gray-700 mt-4">
              Food & Beverages Added
            </div>
            {cartItems.map((item) => (
              <div
                className="flex justify-between items-center"
                key={item.id}
              >
                <span>
                  {item.name} (x {item.qty})
                </span>
                <div className="flex items-center gap-2">
                  <span>
                    LKR {(item.price * item.qty).toLocaleString("en-LK")}
                  </span>
                  <button
                    className="text-red-500 font-bold hover:text-red-700"
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
          <span>LKR {total.toLocaleString("en-LK")}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Have a promo code?"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Payment Method */}
      <PaymentModeSelector />

      {/* Customer Details */}
      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-4">Your Details</h4>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={customer.contact}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={customer.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        className="mt-6 w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
        onClick={() => {
          console.log("Customer Details:", customer);
          console.log("Total Amount:", total);
          alert("Payment processing...");
        }}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
