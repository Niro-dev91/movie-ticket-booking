import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PaymentModeSelector } from "../payment/PaymentModeSelector";
import { useAuth } from "../context/AuthContext";

export default function PurchaseSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedTickets = [] } = location.state || {};
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth(); // logged-in user
  const { showtimeId } = useParams();

  const [showtime, setShowtime] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [paymentMode, setPaymentMode] = useState("");
  const [errors, setErrors] = useState({});

  /* ------------------Auto-load user details------------------ */
  useEffect(() => {
    if (user) {
      setCustomer({
        name: user.username || "",
        contact: user.contactNumber || "",
        email: user.email || "",
      });
    }
  }, [user]);

  /* ------------------ Load showtime ------------------ */
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/showtimes/${showtimeId}`)
      .then((res) => setShowtime(res.data))
      .catch((err) => console.error("Failed to load showtime", err));
  }, [showtimeId]);

  /* ------------------ Calculations ------------------ */
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

  const validateForm = () => {
    const newErrors = {};

    if (!customer.name.trim()) newErrors.name = "Full name is required";

    if (!customer.contact.trim())
      newErrors.contact = "Contact number is required";
    else if (!/^[0-9]{10}$/.test(customer.contact))
      newErrors.contact = "Contact number must be 10 digits";

    if (!customer.email.trim())
      newErrors.email = "Email address is required";
    else if (!/^\S+@\S+\.\S+$/.test(customer.email))
      newErrors.email = "Invalid email address";

    if (!paymentMode)
      newErrors.paymentMode = "Please select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (!validateForm() || !showtime) return;

    navigate(`/payment/${showtimeId}/confirm`, {
      state: {
        customer,
        paymentMode,
        total,
        selectedTickets,
        cartItems,

        movieTitle: showtime.title,
        features: "DOLBY ATMOS",
        showDate: new Date(showtime.date).toLocaleDateString("en-US", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        }),
        showTime: new Date(`1970-01-01T${showtime.startTime}`).toLocaleTimeString(
          "en-US",
          { hour: "2-digit", minute: "2-digit" }
        ),
        cinema: showtime.locationName,
        hall: "ATMOS",
        seats: selectedTickets.flatMap((t) => t.seats || []),
      },
    });
  };

  if (!showtime) {
    return <div className="text-center p-10">Loading showtime details...</div>;
  }

  return (
    <div className="bg-gray-50 p-6 rounded shadow max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">PURCHASE SUMMARY</h3>

      {/* Tickets */}
      <div className="space-y-2 text-sm">
        {selectedTickets.map((ticket) => (
          <div className="flex justify-between" key={ticket.id}>
            <span>{ticket.type} (x {ticket.count})</span>
            <span>
              LKR {(ticket.price * ticket.count).toLocaleString("en-LK")}
            </span>
          </div>
        ))}

        {/* Food */}
        {cartItems.length > 0 && (
          <>
            <div className="font-semibold text-gray-700 mt-4">
              Food & Beverages Added
            </div>
            {cartItems.map((item) => (
              <div className="flex justify-between" key={item.id}>
                <span>{item.name} (x {item.qty})</span>
                <span>
                  LKR {(item.price * item.qty).toLocaleString("en-LK")}
                </span>
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
      <PaymentModeSelector
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
      />
      {errors.paymentMode && (
        <p className="text-red-500 text-sm">{errors.paymentMode}</p>
      )}

      {/* Customer Details */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">Your Details</h4>

        <input
          name="name"
          value={customer.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-2"
        />

        <input
          name="contact"
          value={customer.contact}
          onChange={handleInputChange}
          placeholder="Contact Number"
          className="w-full p-2 border rounded mb-2"
        />

        <input
          name="email"
          value={customer.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleProceed}
        className="mt-6 w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
