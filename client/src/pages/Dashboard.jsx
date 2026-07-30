import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Droplets,
  ClipboardList,
  Activity,
  Plus,
  LogOut,
} from "lucide-react";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [stats, setStats] = useState({
    donors: 0,
    requests: 0,
    pending: 0,
    fulfilled: 0,
  });

  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(storedUser);

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const donorRes = await api.get("/donors");
      const requestRes = await api.get("/requests");

      const donors = donorRes.data.donors || [];
      const requests = requestRes.data.requests || [];

      setStats({
        donors: donors.length,
        requests: requests.length,
        pending: requests.filter((r) => r.status === "Pending").length,
        fulfilled: requests.filter((r) => r.status === "Fulfilled").length,
      });

      setRecentRequests(requests.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dash-page">

      {/* Header */}
      <div className="dash-header">
        <div className="dash-header-inner">
          <div>
            <h1 className="dash-title">BloodConnect Dashboard</h1>
            <p className="dash-subtitle">
              Welcome back, <strong>{user.name}</strong>
            </p>
          </div>

          <button onClick={logout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="dash-body">

        {/* Stats */}
        <div className="stats-row">

          <div className="stat-box">
            <div>
              <p className="stat-label">Total Donors</p>
              <h2 className="stat-value">{stats.donors}</h2>
            </div>
            <div className="stat-icon icon-red">
              <Users color="#dc2626" />
            </div>
          </div>

          <div className="stat-box">
            <div>
              <p className="stat-label">Blood Requests</p>
              <h2 className="stat-value">{stats.requests}</h2>
            </div>
            <div className="stat-icon icon-red">
              <ClipboardList color="#dc2626" />
            </div>
          </div>

          <div className="stat-box">
            <div>
              <p className="stat-label">Pending Requests</p>
              <h2 className="stat-value">{stats.pending}</h2>
            </div>
            <div className="stat-icon icon-yellow">
              <Droplets color="#ca8a04" />
            </div>
          </div>

          <div className="stat-box">
            <div>
              <p className="stat-label">Fulfilled Requests</p>
              <h2 className="stat-value">{stats.fulfilled}</h2>
            </div>
            <div className="stat-icon icon-green">
              <Activity color="#16a34a" />
            </div>
          </div>

        </div>

        {/* Recent Requests & Quick Actions */}
        <div className="main-grid">

          {/* Recent Requests */}
          <div className="card">
            <h2 className="card-title">Recent Blood Requests</h2>

            {recentRequests.length === 0 ? (
              <div className="empty-state">No Blood Requests Found</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="req-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Blood</th>
                      <th>City</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRequests.map((request) => (
                      <tr key={request._id}>
                        <td>{request.patientName}</td>
                        <td>
                          <span className="blood-pill">{request.bloodGroup}</span>
                        </td>
                        <td>{request.city}</td>
                        <td>
                          <span
                            className={`status-pill ${
                              request.status === "Fulfilled"
                                ? "status-fulfilled"
                                : "status-pending"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="card-title">Quick Actions</h2>

            <div className="actions-list">
              <button
                onClick={() => navigate("/add-donor")}
                className="action-btn action-red"
              >
                <Plus size={18} />
                Add Donor
              </button>

              <button
                onClick={() => navigate("/donors")}
                className="action-btn action-blue"
              >
                View Donors
              </button>

              <button
                onClick={() => navigate("/blood-request")}
                className="action-btn action-green"
              >
                Create Blood Request
              </button>

              <button
                onClick={() => navigate("/requests")}
                className="action-btn action-purple"
              >
                View Requests
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;