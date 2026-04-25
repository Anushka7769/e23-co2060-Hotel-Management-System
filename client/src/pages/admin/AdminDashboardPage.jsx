function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      text: "8.5% increase this month",
      icon: "👥",
    },
    {
      title: "Total Hotels",
      value: "1,235",
      text: "Verified and pending hotels",
      icon: "🏨",
    },
    {
      title: "Total Bookings",
      value: "8,907",
      text: "1,250 bookings this month",
      icon: "📘",
    },
  ];

  const pendingHotels = [
    {
      id: 1,
      name: "Blue Ocean Resort",
      owner: "R. Perera",
      submitted: "2 days ago",
      status: "Pending",
    },
    {
      id: 2,
      name: "Kandy Lake View",
      owner: "M. Fernando",
      submitted: "1 week ago",
      status: "Pending",
    },
    {
      id: 3,
      name: "Colombo City Hotel",
      owner: "A. Wijesinghe",
      submitted: "5 days ago",
      status: "Pending",
    },
  ];

  const complaints = [
    {
      id: 1,
      type: "Complaint",
      subject: "Incorrect room info",
      date: "Apr 21, 2026",
      status: "Open",
    },
    {
      id: 2,
      type: "Report",
      subject: "Fake review submitted",
      date: "Apr 20, 2026",
      status: "In Progress",
    },
    {
      id: 3,
      type: "Complaint",
      subject: "Overbooking issue",
      date: "Apr 19, 2026",
      status: "Resolved",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of platform activity, approvals, reports, and complaints.</p>
        </div>

        <button className="partner-small-button">Save Changes</button>
      </div>

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
              {pendingHotels.map((hotel) => (
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
              {complaints.map((item) => (
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