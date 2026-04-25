function ComplaintsPage() {
  const complaints = [
    {
      id: "CMP-1001",
      type: "Hotel Complaint",
      subject: "Incorrect room information",
      submittedBy: "Nuwan Perera",
      relatedTo: "Blue Ocean Resort",
      date: "Apr 21, 2026",
      priority: "High",
      status: "Open",
      message:
        "The room shown in the listing was different from the room provided at check-in.",
    },
    {
      id: "CMP-1002",
      type: "Review Report",
      subject: "Fake review submitted",
      submittedBy: "Hotel Partner",
      relatedTo: "Kandy Lake View",
      date: "Apr 20, 2026",
      priority: "Medium",
      status: "In Progress",
      message:
        "The reported review appears to be fake and may have been posted by a competitor.",
    },
    {
      id: "CMP-1003",
      type: "Booking Issue",
      subject: "Overbooking issue",
      submittedBy: "Sarah Miller",
      relatedTo: "Colombo City Hotel",
      date: "Apr 19, 2026",
      priority: "High",
      status: "Resolved",
      message:
        "The guest arrived at the hotel, but the room was not available due to overbooking.",
    },
  ];

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
            <h3>8</h3>
            <p>Open Complaints</p>
            <span>Need admin attention</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="partner-stat-icon">⏳</div>
          <div>
            <h3>5</h3>
            <p>In Progress</p>
            <span>Currently under review</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="partner-stat-icon">✅</div>
          <div>
            <h3>21</h3>
            <p>Resolved</p>
            <span>This month</span>
          </div>
        </div>
      </section>

      <section className="partner-filter-bar complaints-filter-bar">
        <select>
          <option>All complaints</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>

        <select>
          <option>All priority levels</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input type="text" placeholder="Search complaint ID, hotel, or subject..." />
      </section>

      <section className="complaint-list">
        {complaints.map((complaint) => (
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
      </section>
    </div>
  );
}

export default ComplaintsPage;