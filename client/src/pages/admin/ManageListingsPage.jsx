import { useEffect, useState } from "react";
import { fetchAdminHotels } from "../../services/adminApi";
import { fetchAdminComplaints } from "../../services/partnerExtraApi";

function ManageListingsPage() {
  const [hotelListings, setHotelListings] = useState([]);
  const [reportedIssues, setReportedIssues] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filter, setFilter] = useState("All listings");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadListings() {
      try {
        const [hotelsResponse, complaintsResponse] = await Promise.all([
          fetchAdminHotels(),
          fetchAdminComplaints(),
        ]);

        const formattedHotels = hotelsResponse.data.map((hotel) => ({
          id: hotel.id,
          name: hotel.name,
          submittedBy: hotel.partner_name,
          city: hotel.city,
          type: hotel.property_type,
          status: formatHotelStatus(hotel.status),
          verified: hotel.is_verified,
        }));

        const formattedComplaints = complaintsResponse.data.map((complaint) => ({
          id: `CMP-${complaint.id.toString().padStart(4, "0")}`,
          subject: complaint.subject,
          submittedBy: complaint.submitted_by,
          relatedTo: complaint.hotel_name || "General Platform",
          type: formatComplaintType(complaint.complaint_type),
          priority: formatPriority(complaint.priority),
          status: formatComplaintStatus(complaint.status),
          description: complaint.description,
          date: formatDate(complaint.created_at),
        }));

        setHotelListings(formattedHotels);
        setFilteredListings(formattedHotels);
        setReportedIssues(formattedComplaints);
      } catch (err) {
        setError("Could not load listings from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  useEffect(() => {
    let updatedListings = [...hotelListings];

    if (filter !== "All listings") {
      updatedListings = updatedListings.filter(
        (listing) => listing.status === filter
      );
    }

    if (searchText.trim() !== "") {
      updatedListings = updatedListings.filter(
        (listing) =>
          listing.name.toLowerCase().includes(searchText.toLowerCase()) ||
          listing.submittedBy.toLowerCase().includes(searchText.toLowerCase()) ||
          listing.city.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredListings(updatedListings);
  }, [filter, searchText, hotelListings]);

  function formatHotelStatus(status) {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending";
  }

  function formatComplaintType(type) {
    if (type === "hotel_complaint") return "Hotel Complaint";
    if (type === "review_report") return "Review Report";
    if (type === "booking_issue") return "Booking Issue";
    if (type === "fake_listing") return "Fake Listing";
    return "Report";
  }

  function formatPriority(priority) {
    if (priority === "high") return "High";
    if (priority === "medium") return "Medium";
    return "Low";
  }

  function formatComplaintStatus(status) {
    if (status === "resolved") return "Resolved";
    if (status === "in_progress") return "In Progress";
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
    <div className="manage-listings-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Manage Listings</h1>
          <p>Review hotel listings and reported platform issues for quality.</p>
        </div>

        <span className="table-status pending">
          {reportedIssues.length} Reports
        </span>
      </div>

      <section className="partner-filter-bar rooms-filter-bar">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option>All listings</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Search hotel, city, or partner..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      {loading && <p>Loading listings...</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="admin-panel-card listings-section">
        <div className="table-header-row">
          <div>
            <h2>Hotel Listings</h2>
            <p>Hotels submitted by partners and their approval status.</p>
          </div>
        </div>

        <table className="partner-table">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Partner</th>
              <th>City</th>
              <th>Type</th>
              <th>Verified</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              filteredListings.map((listing) => (
                <tr key={listing.id}>
                  <td>{listing.name}</td>
                  <td>{listing.submittedBy}</td>
                  <td>{listing.city}</td>
                  <td>{listing.type}</td>
                  <td>{listing.verified ? "Yes" : "No"}</td>
                  <td>
                    <span
                      className={
                        listing.status === "Approved"
                          ? "table-status confirmed"
                          : listing.status === "Rejected"
                          ? "table-status cancelled"
                          : "table-status pending"
                      }
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-action-buttons">
                      <button className="view-action">View</button>
                      <button className="confirm-action">Keep</button>
                      <button className="cancel-action-small">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && filteredListings.length === 0 && (
          <p>No hotel listings found.</p>
        )}
      </section>

      <section className="admin-panel-card listings-section">
        <div className="table-header-row">
          <div>
            <h2>Reported Issues</h2>
            <p>Complaints and reports connected to hotels, bookings, and reviews.</p>
          </div>
        </div>

        <div className="reported-review-list">
          {!loading &&
            reportedIssues.map((issue) => (
              <div className="reported-review-card" key={issue.id}>
                <div>
                  <h3>{issue.relatedTo}</h3>
                  <p className="review-meta">
                    {issue.id} · {issue.type} · {issue.date} · Priority:{" "}
                    {issue.priority}
                  </p>
                  <p>
                    <strong>{issue.subject}</strong>
                  </p>
                  <p>{issue.description}</p>
                  <p className="review-meta">Submitted by {issue.submittedBy}</p>
                </div>

                <div className="table-action-buttons">
                  <span
                    className={
                      issue.status === "Resolved"
                        ? "table-status confirmed"
                        : issue.status === "In Progress"
                        ? "table-status pending"
                        : "table-status cancelled"
                    }
                  >
                    {issue.status}
                  </span>
                  <button className="view-action">View</button>
                  <button className="cancel-action-small">Remove</button>
                  <button className="confirm-action">Keep</button>
                </div>
              </div>
            ))}

          {!loading && reportedIssues.length === 0 && (
            <p>No reported issues found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ManageListingsPage;