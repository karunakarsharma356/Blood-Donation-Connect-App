import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import DonorCard from "../components/DonorCard";
import "./Donors.css";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const fetchDonors = async () => {
    try {
      setLoading(true);

      const res = await api.get("/donors");

      setDonors(res.data.donors || res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this donor?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/donors/${id}`);

      setDonors((prev) => prev.filter((donor) => donor._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  const handleEdit = (donor) => {
    alert(`Edit feature for ${donor.name} will be added next.`);
  };

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchName = donor.name.toLowerCase().includes(search.toLowerCase());

      const matchBlood = bloodGroup === "" || donor.bloodGroup === bloodGroup;

      return matchName && matchBlood;
    });
  }, [donors, search, bloodGroup]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="donors-page">

      <div className="donors-body">

        <div className="donors-toolbar">

          <input
            type="text"
            placeholder="Search donor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="filter-select"
          >
            <option value="">All Blood Groups</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="donors-grid">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <DonorCard
                key={donor._id}
                donor={donor}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="empty-wrap">
              <div>
                <h2 className="empty-title">No Donors Found</h2>
                <p className="empty-sub">
                  Try changing the search or blood group filter.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default Donors;