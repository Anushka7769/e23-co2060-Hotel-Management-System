import { useEffect, useState } from "react";
import { fetchAdminComplaints } from "../../services/partnerExtraApi";

function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All complaints");
  const [priorityFilter, setPriorityFilter] = useState("All priority levels");
  const [searchText, setSearchText] = useState("");
  const [stats, setStats] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadComplaints() {
      try {
        const response = await fetchAdminComplaints();

        const formattedComplaints = response.data.map((complaint) => ({
          id: `CMP-${complaint.id.toString().padStart(4, "0")}`,
          type: formatComplaintType(complaint.complaint_type),
          subject: complaint.subject,
          submittedBy: complaint.submitted_by,
          relatedTo: complaint.hotel_name || "General Platform",
          date: formatDate(complaint.created_at),
          priority: formatPriority(complaint.priority),
          status: formatStatus(complaint.status),
          message: complaint.description,
        }));

        setComplaints(formattedComplaints);
        setFilteredComplaints(formattedComplaints);

        setStats({
          open: formattedComplaints.filter((item) => item.status === "Open").length,
          inProgress: formattedComplaints.filter(
            (item) => item.status === "In Progress"
          ).length,
          resolved: formattedComplaints.filter((item) => item.status === "Resolved")
            .length,
        });
      } catch (err) {
        setError("Could not load complaints from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadComplaints();
  }, []);

  useEffect(() => {
    let updatedComplaints = [...complaints];

    if (statusFilter !== "All complaints") {
      updatedComplaints = updatedComplaints.filter(
        (complaint) => complaint.status === statusFilter
      );
    }

    if (priorityFilter !== "All priority levels") {
      updatedComplaints = updatedComplaints.filter(
        (complaint) => complaint.priority === priorityFilter
      );
    }

    if (searchText.trim() !== "") {
      updatedComplaints = updatedComplaints.filter(
        (complaint) =>
          complaint.id.toLowerCase().includes(searchText.toLowerCase()) ||
          complaint.relatedTo.toLowerCase().includes(searchText.toLowerCase()) ||
          complaint.subject.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredComplaints(updatedComplaints);
  }, [statusFilter, priorityFilter, searchText, complaints]);

  function formatComplaintType(type) {
    if (type === "hotel_complaint") return "Hotel Complaint";
    if (type === "review_report") return "Review Report";
    if (type === "booking_issue") return "Booking Issue";
    if (type === "fake_listing") return "Fake Listing";
    return "Complaint";
  }

  function formatPriority(priority) {
    if (priority === "high") return "High";
    if (priority === "medium") return "Medium";
    return "Low";
  }

  function formatStatus(status) {
    if (status === "open") return "Open";
    if (status === "in_progress") return "In Progress";
    if (status === "resolved") return "Resolved";
    return "Open";
  }

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="complaints-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Complaints & Reports</h1>
          <p>Track user complaints, booking issues, fake listings, and review reports.</p>
        </div>

        <button className="partner-small-button">Export Report</button>
      </div>

      <section className="admin-complaint-stats">
        <div className="admin-stat-card">
          <div className="partner-stat-icon">🚨</div>
          <div>
            <h3>{stats.open}</h3>
            <p>Open Complaints</p>
            <span>Need admin attention</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="partner-stat-icon">⏳</div>
          <div>
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
            <span>Currently under review</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="partner-stat-icon">✅</div>
          <div>
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
            <span>Current records</span>
          </div>
        </div>
      </section>

      <section className="partner-filter-bar complaints-filter-bar">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All complaints</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option>All priority levels</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="text"
          placeholder="Search complaint ID, hotel, or subject..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      {loading && <p>Loading complaints...</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="complaint-list">
        {!loading &&
          filteredComplaints.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              <div className="complaint-main">
                <div className="summary-title-row">
                  <div>
                    <h3>{complaint.subject}</h3>
                    <p>
                      {complaint.id} · {complaint.type} · {complaint.date}
                    </p>
                  </div>

                  <span
                    className={
                      complaint.status === "Resolved"
                        ? "table-status confirmed"
                        : complaint.status === "In Progress"
                        ? "table-status pending"
                        : "table-status cancelled"
                    }
                  >
                    {complaint.status}
                  </span>
                </div>

                <p className="complaint-message">{complaint.message}</p>

                <div className="complaint-meta-grid">
                  <div>
                    <span>Submitted By</span>
                    <strong>{complaint.submittedBy}</strong>
                  </div>

                  <div>
                    <span>Related To</span>
                    <strong>{complaint.relatedTo}</strong>
                  </div>

                  <div>
                    <span>Priority</span>
                    <strong>{complaint.priority}</strong>
                  </div>
                </div>
              </div>

              <div className="complaint-actions">
                <button className="view-action">View Details</button>
                <button className="confirm-action">Mark Resolved</button>
                <button className="cancel-action-small">Escalate</button>
              </div>
            </div>
          ))}

        {!loading && filteredComplaints.length === 0 && (
          <p>No complaints found.</p>
        )}
      </section>
    </div>
  );
}

export default ComplaintsPage;