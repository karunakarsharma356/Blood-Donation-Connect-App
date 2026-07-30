import { useEffect, useState } from "react";
import api from "../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data.requests);
      setFilteredRequests(res.data.requests);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const data = requests.filter(
      (request) =>
        request.patientName.toLowerCase().includes(search.toLowerCase()) ||
        request.city.toLowerCase().includes(search.toLowerCase()) ||
        request.bloodGroup.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredRequests(data);
  }, [search, requests]);

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await api.delete(`/requests/${id}`);

      setRequests(requests.filter((r) => r._id !== id));
      alert("Request Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to delete request");
    }
  };

  const toggleStatus = async (request) => {
    const newStatus =
      request.status === "Pending" ? "Fulfilled" : "Pending";

    try {
      const res = await api.put(`/requests/${request._id}`, {
        status: newStatus,
      });

      setRequests(
        requests.map((r) =>
          r._id === request._id ? res.data.request : r
        )
      );
    } catch (err) {
      console.log(err);
      alert("Unable to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading Requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-red-600 mb-6">
          Blood Requests
        </h1>

        <input
          type="text"
          placeholder="Search by patient, city or blood group..."
          className="w-full border rounded-lg p-3 mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No Blood Requests Found
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full bg-white rounded-xl shadow">

              <thead className="bg-red-600 text-white">

                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Blood</th>
                  <th className="p-3">Units</th>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Urgency</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Requested By</th>
                  <th className="p-3">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredRequests.map((request) => (

                  <tr
                    key={request._id}
                    className="border-b text-center hover:bg-gray-50"
                  >
                    <td className="p-3">{request.patientName}</td>

                    <td className="p-3 font-bold text-red-600">
                      {request.bloodGroup}
                    </td>

                    <td className="p-3">
                      {request.unitsRequired}
                    </td>

                    <td className="p-3">
                      {request.hospital}
                    </td>

                    <td className="p-3">
                      {request.city}
                    </td>

                    <td className="p-3">
                      {request.contactNumber}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          request.urgency === "High"
                            ? "bg-red-600"
                            : request.urgency === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {request.urgency}
                      </span>
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() => toggleStatus(request)}
                        className={`px-4 py-2 rounded-lg text-white ${
                          request.status === "Pending"
                            ? "bg-orange-500"
                            : "bg-green-600"
                        }`}
                      >
                        {request.status}
                      </button>

                    </td>

                    <td className="p-3">
                      {request.requestedBy?.name || "N/A"}
                    </td>

                    <td className="p-3 space-x-2">

                      <button
                        onClick={() => deleteRequest(request._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Requests;