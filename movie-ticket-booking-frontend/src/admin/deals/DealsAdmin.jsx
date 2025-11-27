import React, { useState } from "react";

export default function DealsAdmin() {
  const [newDeal, setNewDeal] = useState({
    title: "",
    bannerFile: null,
    description: "",
    terms: "",
    active: true,
    validFrom: "",
    validTo: "",
    type: "PERCENTAGE",
    value: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addDeal = async (deal) => {
    try {
      const formData = new FormData();
      formData.append("title", deal.title);
      formData.append("description", deal.description);
      formData.append("active", String(deal.active));
      formData.append("validFrom", deal.validFrom);
      formData.append("validTo", deal.validTo);
      formData.append("type", deal.type);


      formData.append("value", deal.type === "BOGO" ? "" : String(deal.value));


      if (deal.bannerFile) formData.append("banner", deal.bannerFile);


      const termsArray = deal.terms
        .split(";")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      termsArray.forEach((term) => formData.append("terms", term));

      const res = await fetch("http://localhost:8080/api/deals/add", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to add deal");
      }

      return await res.json();
    } catch (err) {
      console.error("Error adding deal:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addDeal(newDeal);
      setNewDeal({
        title: "",
        bannerFile: null,
        description: "",
        terms: "",
        active: true,
        validFrom: "",
        validTo: "",
        type: "PERCENTAGE",
        value: "",
      });
      setPreviewUrl(null);
      alert("Deal added successfully");
    } catch (err) {
      setError(err.message || "Failed to add deal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Deals & Exclusives</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        {error && <div className="text-red-600">{error}</div>}

        <input
          type="text"
          placeholder="Deal Title"
          value={newDeal.title}
          onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setNewDeal({ ...newDeal, bannerFile: file });
            setPreviewUrl(file ? URL.createObjectURL(file) : null);
          }}
          className="w-full border p-2 rounded"
          required
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-64 h-40 object-cover rounded border"
          />
        )}

        <textarea
          placeholder="Description"
          value={newDeal.description}
          onChange={(e) =>
            setNewDeal({ ...newDeal, description: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Terms (Term1;Term2;Term3)"
          value={newDeal.terms}
          onChange={(e) => setNewDeal({ ...newDeal, terms: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={newDeal.validFrom}
            onChange={(e) =>
              setNewDeal({ ...newDeal, validFrom: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newDeal.validTo}
            onChange={(e) =>
              setNewDeal({ ...newDeal, validTo: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4 items-center">
          <label>Type:</label>
          <select
            value={newDeal.type}
            onChange={(e) => {
              const nextType = e.target.value;
              setNewDeal({
                ...newDeal,
                type: nextType,
                value: nextType === "BOGO" ? "" : newDeal.value,
              });
            }}
            className="border p-2 rounded"
            required
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat</option>
            <option value="BOGO">Buy 1 Get 1</option>
          </select>

          <input
            type="number"
            placeholder="Value"
            value={newDeal.value}
            onChange={(e) =>
              setNewDeal({
                ...newDeal,
                value: e.target.value === "" ? "" : parseFloat(e.target.value),
              })
            }
            className="border p-2 rounded w-24"
            disabled={newDeal.type === "BOGO"}
            required={newDeal.type !== "BOGO"}
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newDeal.active}
            onChange={(e) =>
              setNewDeal({ ...newDeal, active: e.target.checked })
            }
          />
          Active Deal
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Deal"}
        </button>
      </form>
    </div>
  );
}
