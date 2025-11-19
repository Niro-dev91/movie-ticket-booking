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
    value: 0,
  });

  const addDeal = async (deal) => {
    try {
      const formData = new FormData();
      formData.append("title", deal.title);
      formData.append("description", deal.description);
      formData.append("active", deal.active);
      formData.append("validFrom", deal.validFrom);
      formData.append("validTo", deal.validTo);
      formData.append("type", deal.type);
      formData.append("value", deal.value);
      formData.append("banner", deal.bannerFile);
      formData.append("terms", JSON.stringify(deal.terms));

      const res = await fetch("http://localhost:8080/api/deals/add", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add deal");
      return await res.json();
    } catch (error) {
      console.error("Error adding deal:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDeal = { ...newDeal, terms: newDeal.terms.split(";").map(t => t.trim()) };
    await addDeal(formattedDeal);
    setNewDeal({ title: "", bannerFile: null, description: "", terms: "", active: true, validFrom: "", validTo: "", type: "PERCENTAGE", value: 0 });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Deals & Exclusives</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input type="text" placeholder="Deal Title" value={newDeal.title} onChange={(e)=>setNewDeal({...newDeal,title:e.target.value})} className="w-full border p-2 rounded" required />
        <input key={newDeal.bannerFile?.name||""} type="file" accept="image/*" onChange={(e)=>setNewDeal({...newDeal,bannerFile:e.target.files[0]})} className="w-full border p-2 rounded" required />
        <textarea placeholder="Description" value={newDeal.description} onChange={(e)=>setNewDeal({...newDeal,description:e.target.value})} className="w-full border p-2 rounded" required />
        <textarea placeholder="Terms (Term1;Term2;Term3)" value={newDeal.terms} onChange={(e)=>setNewDeal({...newDeal,terms:e.target.value})} className="w-full border p-2 rounded" required />
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={newDeal.validFrom} onChange={(e)=>setNewDeal({...newDeal,validFrom:e.target.value})} className="border p-2 rounded" required />
          <input type="date" value={newDeal.validTo} onChange={(e)=>setNewDeal({...newDeal,validTo:e.target.value})} className="border p-2 rounded" required />
        </div>
        <div className="flex gap-4 items-center">
          <label>Type:</label>
          <select value={newDeal.type} onChange={(e)=>setNewDeal({...newDeal,type:e.target.value})} className="border p-2 rounded" required>
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat</option>
            <option value="BOGO">Buy 1 Get 1</option>
          </select>
          <input type="number" placeholder="Value" value={newDeal.value} onChange={(e)=>setNewDeal({...newDeal,value:parseFloat(e.target.value)})} className="border p-2 rounded w-24" disabled={newDeal.type==="BOGO"} required={newDeal.type!=="BOGO"} />
        </div>
        <label className="flex items-center gap-2"><input type="checkbox" checked={newDeal.active} onChange={(e)=>setNewDeal({...newDeal,active:e.target.checked})} /> Active Deal</label>
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Add Deal</button>
      </form>
    </div>
  );
}
