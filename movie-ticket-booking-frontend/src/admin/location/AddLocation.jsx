import React, { useState } from "react";
import axios from "axios";

export default function AddLocation() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const ALL_FEATURES = ["DIGITAL 2D", "DIGITAL 3D", "5.1", "7.1"];

  const [formData, setFormData] = useState({
    theater_name: "",
    location_name: "",
    imageUrl: "",
    features: [],
    link: "",
    address: "",
    email: "",
    phone: "",
    googleMap: "",
    imageFile: null
  });

  // Handle all field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "location_name") {
      // Auto generate link based on location name
      const autoLink = "/location/" + value.trim().toLowerCase().replace(/\s+/g, "_");
      setFormData(prev => ({
        ...prev,
        location_name: value,
        link: autoLink
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Toggle selected features
  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl, imageFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const multipartFormData = new FormData();

      // Prepare location JSON blob
      const locationPayload = {
        theater_name: formData.theater_name,
        location_name: formData.location_name,
        address: formData.address,
        email: formData.email,
        phone_no: formData.phone,
        google_map_link: formData.googleMap,
      };

      const locationJson = JSON.stringify(locationPayload);
      const locationBlob = new Blob([locationJson], { type: "application/json" });
      multipartFormData.append("location", locationBlob, "location.json");

      // Append features as multiple fields with the same name "features"
      const featuresJson = JSON.stringify(formData.features);
      multipartFormData.append("features", featuresJson);


      // Append image file if present
      if (formData.imageFile) {
        multipartFormData.append("imageFile", formData.imageFile);
      }

      await axios.post("http://localhost:8080/api/location/save", multipartFormData, {
        headers: {
        },
      });

      setMessage("Location added successfully!");
    } catch (error) {
      console.error("Error saving location:", error);
      setMessage("Failed to add location.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Location</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="theater_name"
          placeholder="Theater Name"
          value={formData.theater_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="text"
          name="location_name"
          placeholder="Location Name"
          value={formData.location_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />

        <div>
          <label className="block mb-1 font-semibold">Upload Location Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block border rounded px-3 py-2"
          />

          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Location Preview"
              className="w-32 rounded shadow mt-2"
            />
          )}
        </div>

        <input
          type="hidden"
          name="link"
          readOnly
          placeholder="Link"
          value={formData.link}
          className="w-full border rounded px-3 py-2 bg-gray-100"
        />

        <div>
          <label className="block font-semibold mb-2">Select Features</label>
          <div className="flex flex-wrap gap-3">
            {ALL_FEATURES.map((feature) => (
              <button
                type="button"
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                className={`px-3 py-1 rounded border ${formData.features.includes(feature)
                    ? "bg-blue-600 text-white border-green-700"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <h3 className="font-semibold mt-6 mb-2">Contact Information</h3>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          name="googleMap"
          placeholder="Google Map Link"
          value={formData.googleMap}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Saving..." : "Submit Location"}
        </button>
      </form>

      {message && (
        <p className="mt-4 font-semibold text-center text-green-600">
          {message}
        </p>
      )}
    </div>
  );
}
