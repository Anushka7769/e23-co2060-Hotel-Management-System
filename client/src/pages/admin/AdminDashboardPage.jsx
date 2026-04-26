import { useEffect, useState } from "react";
import {
  fetchAdminDashboard,
  fetchPendingHotels,
} from "../../services/adminApi";
import { fetchAdminComplaints } from "../../services/partnerExtraApi";

function AdminDashboardPage() {
  const [stats, setStats] = useState([]);
  const [pendingHotels, setPendingHotels] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAdminDashboard() {
      try {
        const [dashboardResponse, pendingHotelsResponse, complaintsResponse] =
          await Promise.all([
            fetchAdminDashboard(),
            fetchPendingHotels(),
            fetchAdminComplaints(),
          ]);

        const dashboard = dashboardResponse.data;

        setStats([
          {
            title: "Total Users",
            value: dashboard.userStats.total_users || 0,
            text: `${dashboard.userStats.tourists || 0} tourists, ${
              dashboard.userStats.partners || 0
            } partners`,
            icon: "👥",
          },
          {
            title: "Total Hotels",
            value: dashboard.hotelStats.total_hotels || 0,
            text: `${dashboard.hotelStats.approved_hotels || 0} approved, ${
              dashboard.hotelStats.pending_hotels || 0
            } pending`,
            icon: "🏨",
          },
          {
            title: "Total Bookings",
            value: dashboard.bookingStats.total_bookings || 0,
            text: `Revenue: LKR ${Number(
              dashboard.bookingStats.total_revenue || 0
            ).toLocaleString()}`,
            icon: "📘",
          },
        ]);

        const formattedHotels = pendingHotelsResponse.data.map((hotel) => ({
          id: hotel.id,
          name: hotel.name,
          owner: hotel.partner_name,
          submitted: formatDate(hotel.created_at),
          status: formatStatus(hotel.status),
        }));

        setPendingHotels(formattedHotels);

        const formattedComplaints = complaintsResponse.data.slice(0, 3).map((item) => ({
          id: item.id,
          type: formatComplaintType(item.complaint_type),
          subject: item.subject,
          date: formatDate(item.created_at),
          status: formatComplaintStatus(item.status),
        }));

        setComplaints(formattedComplaints);
      } catch (err) {
        setError("Could not load admin dashboard from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadAdminDashboard();
  }, []);

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatStatus(status) {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending";
  }

  function formatComplaintType(type) {
    if (type === "hotel_complaint") return "Complaint";
    if (type === "review_report") return "Report";
    if (type === "booking_issue") return "Booking Issue";
    if (type === "fake_listing") return "Fake Listing";
    return "Complaint";
  }

  function formatComplaintStatus(status) {
    if (status === "resolved") return "Resolved";
    if (status === "in_progress") return "In Progress";
    return "Open";
  }

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of platform activity, approvals, reports, and complaints.</p>
        </div>

        <button className="partner-small-button">Save Changes</button>
      </div>

      {loading && <p>Loading admin dashboard...</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.title}>
            <div className="partner-stat-icon">{stat.icon}</div>
            <div>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span>{stat.text}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-dashboard-grid">
        <div className="admin-panel-card">
          <div className="table-header-row">
            <div>
              <h2>Pending Hotel Approvals</h2>
              <p>Review newly submitted hotels.</p>
            </div>

            <button className="partner-small-button">View All</button>
          </div>

          <table className="partner-table">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Owner</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                pendingHotels.map((hotel) => (
                  <tr key={hotel.id}>
                    <td>{hotel.name}</td>
                    <td>{hotel.owner}</td>
                    <td>{hotel.submitted}</td>
                    <td>
                      <a
                        href={`/admin/hotels/${hotel.id}/approval`}
                        className="admin-review-link"
                      >
                        Review
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && pendingHotels.length === 0 && (
            <p>No pending hotels found.</p>
          )}
        </div>

        <div className="admin-panel-card">
          <div className="table-header-row">
            <div>
              <h2>Reports & Complaints</h2>
              <p>Recently reported platform issues.</p>
            </div>

            <button className="partner-small-button">View All</button>
          </div>

          <table className="partner-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                complaints.map((item) => (
                  <tr key={item.id}>
                    <td>{item.type}</td>
                    <td>{item.subject}</td>
                    <td>{item.date}</td>
                    <td>
                      <span
                        className={
                          item.status === "Resolved"
                            ? "table-status confirmed"
                            : item.status === "In Progress"
                            ? "table-status pending"
                            : "table-status cancelled"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="quick-reports-card">
        <h2>Quick Reports</h2>
        <p>Generate platform reports for admin review.</p>

        <div className="quick-report-grid">
          <button>Monthly Analytics</button>
          <button>Financial Summary</button>
          <button>User Activity Log</button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;