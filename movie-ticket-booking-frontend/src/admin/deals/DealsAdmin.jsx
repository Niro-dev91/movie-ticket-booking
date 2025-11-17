import React, { useEffect, useState } from "react";

export default function DealsAdmin() {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({
    title: "",
    bannerUrl: "",
    description: "",
    terms: "",
    active: true,
    validFrom: "",
    validTo: "",
  });

  // -----------------------------
  // Fetch all deals
  // -----------------------------
  const fetchDeals = async () => {
    
  };

  // -----------------------------
  // Add new deal
  // -----------------------------
  const addDeal = async (deal) => {
    
  };

  // -----------------------------
  // Delete deal
  // -----------------------------
  const deleteDeal = async (id) => {
   
  };

  const loadDeals = async () => setDeals(await fetchDeals());

  useEffect(() => {
    loadDeals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDeal = {
      ...newDeal,
      terms: newDeal.terms.split(";"), 
    };

    await addDeal(formattedDeal);
    setNewDeal({
      title: "",
      bannerUrl: "",
      description: "",
      terms: "",
      active: true,
      validFrom: "",
      validTo: "",
    });
    loadDeals();
  };

  const handleDelete = async (id) => {
    await deleteDeal(id);
    loadDeals();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Deals & Exclusives</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Deal Title"
          value={newDeal.title}
          onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Banner Image URL"
          value={newDeal.bannerUrl}
          onChange={(e) => setNewDeal({ ...newDeal, bannerUrl: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

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
          placeholder="Terms (separate by semicolon ;) Example: Term1;Term2;Term3"
          value={newDeal.terms}
          onChange={(e) => setNewDeal({ ...newDeal, terms: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={newDeal.validFrom}
            onChange={(e) => setNewDeal({ ...newDeal, validFrom: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            value={newDeal.validTo}
            onChange={(e) => setNewDeal({ ...newDeal, validTo: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newDeal.active}
            onChange={(e) => setNewDeal({ ...newDeal, active: e.target.checked })}
          />
          Active Deal
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Deal
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Existing Deals</h3>

      {deals.length === 0 ? (
        <p className="text-gray-500">No deals found.</p>
      ) : (
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Validity</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td className="border p-2">{deal.title}</td>

                <td className="border p-2">
                  {deal.validFrom} – {deal.validTo}
                </td>

                <td className="border p-2">
                  {deal.active ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </td>

                <td className="border p-2 text-center">
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(deal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
