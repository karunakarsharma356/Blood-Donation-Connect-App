import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BloodRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    hospital: "",
    city: "",
    contactNumber: "",
    urgency: "Medium",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/requests", formData);

      alert("Blood Request Created Successfully ❤️");

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Create Blood Request
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
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
            type="number"
            name="unitsRequired"
            placeholder="Units Required"
            value={formData.unitsRequired}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital Name"
            value={formData.hospital}
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

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {error && (
            <p className="text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Creating..."
              : "Create Blood Request"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default BloodRequest;