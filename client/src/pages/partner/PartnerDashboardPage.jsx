function PartnerDashboardPage() {
  const stats = [
    { title: "New Bookings", value: "12", text: "4 upcoming", icon: "📅" },
    { title: "Today Check-ins", value: "14", text: "5 remaining", icon: "✅" },
    { title: "Today Check-outs", value: "8", text: "All scheduled", icon: "🚪" },
    { title: "Average Rating", value: "8.8", text: "Very good", icon: "⭐" },
  ];

  const latestBookings = [
    {
      id: "BKG-15782",
      guest: "Mohammed S.",
      room: "Deluxe Suite",
      dates: "May 4 - May 6",
      status: "Confirmed",
    },
    {
      id: "BKG-15780",
      guest: "Sarah M.",
      room: "Standard Room",
      dates: "May 5 - May 7",
      status: "Confirmed",
    },
    {
      id: "BKG-15743",
      guest: "Jessica L.",
      room: "Deluxe Suite",
      dates: "May 6 - May 8",
      status: "Pending",
    },
    {
      id: "BKG-15701",
      guest: "Tom & Jane W.",
      room: "Family Room",
      dates: "May 6 - May 10",
      status: "Cancelled",
    },
  ];

  return (
    <div className="partner-dashboard-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Welcome back, Partner!</h1>
          <p>Here’s what is happening with your hotel today.</p>
        </div>

        <button className="partner-small-button">View Reports</button>
      </div>

      <section className="partner-stats-grid">
        {stats.map((item) => (
          <div className="partner-stat-card" key={item.title}>
            <div className="partner-stat-icon">{item.icon}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="partner-alert-card">
        <div>
          <h3>Availability Alert</h3>
          <p>2 rooms need attention for this weekend.</p>
        </div>
        <button className="partner-small-button">Manage Rooms</button>
      </section>

      <section className="partner-table-card">
        <div className="table-header-row">
          <div>
            <h2>Latest Bookings</h2>
            <p>Recent reservations from tourists.</p>
          </div>

          <select>
            <option>All bookings</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>

        <table className="partner-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {latestBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.guest}</td>
                <td>{booking.room}</td>
                <td>{booking.dates}</td>
                <td>
                  <span className={`table-status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PartnerDashboardPage;