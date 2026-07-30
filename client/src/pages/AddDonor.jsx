import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddDonor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
    city: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await api.post("/donors", formData);

      alert("Donor Added Successfully ✅");

      navigate("/donors");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to Add Donor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Add New Donor
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="">Select Blood Group</option>

            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>

          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
                    <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label
              htmlFor="available"
              className="font-medium text-gray-700"
            >
              Available for Donation
            </label>
          </div>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {loading ? "Adding Donor..." : "Add Donor"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddDonor;