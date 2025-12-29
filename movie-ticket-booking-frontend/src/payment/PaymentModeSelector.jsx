import React from "react";

const paymentOptions = [
  { id: "Visa", label: "Visa Card", img: "/assets/visa.jpg" },
  { id: "Master", label: "Master Card", img: "/assets/master.jpg" },
];

export const PaymentModeSelector = ({ paymentMode, setPaymentMode }) => {
  return (
    <div className="mt-4">
      <h4 className="text-xl font-semibold mb-4">Select Payment Method</h4>

      <div className="flex gap-4">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded p-2 cursor-pointer flex flex-col items-center transition
              ${
                paymentMode === option.id
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              }`}
            onClick={() => setPaymentMode(option.id)}
          >
            <img
              src={option.img}
              alt={option.label}
              className="w-16 h-16 object-contain"
            />
            <span className="text-sm mt-1">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
