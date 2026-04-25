function PartnerBookingsPage() {
  const bookings = [
    {
      id: "BKG-15782",
      guest: "Mohammed S.",
      room: "Deluxe Suite",
      dates: "May 4 - May 6",
      guests: "2 adults",
      amount: 48900,
      status: "Confirmed",
    },
    {
      id: "BKG-15780",
      guest: "Sarah M.",
      room: "Standard Room",
      dates: "May 5 - May 7",
      guests: "2 adults",
      amount: 35900,
      status: "Confirmed",
    },
    {
      id: "BKG-15743",
      guest: "Jessica L.",
      room: "Deluxe Suite",
      dates: "May 6 - May 8",
      guests: "1 adult",
      amount: 48900,
      status: "Pending",
    },
    {
      id: "BKG-15701",
      guest: "Tom & Jane W.",
      room: "Family Room",
      dates: "May 6 - May 10",
      guests: "4 guests",
      amount: 65900,
      status: "Cancelled",
    },
  ];

  return (
    <div className="partner-bookings-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Booking Management</h1>
          <p>Manage and update your guest bookings below.</p>
        </div>

        <button className="partner-small-button">Export Bookings</button>
      </div>

      <section className="partner-filter-bar">
        <select>
          <option>All bookings</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>

        <select>
          <option>All rooms</option>
          <option>Standard Room</option>
          <option>Deluxe Suite</option>
          <option>Family Room</option>
        </select>

        <input type="text" placeholder="Search booking or guest..." />
      </section>

      <section className="partner-table-card">
        <table className="partner-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.guest}</td>
                <td>{booking.room}</td>
                <td>{booking.dates}</td>
                <td>{booking.guests}</td>
                <td>LKR {booking.amount.toLocaleString()}</td>
                <td>
                  <span className={`table-status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <div className="table-action-buttons">
                    <button className="view-action">View</button>
                    {booking.status === "Pending" && (
                      <button className="confirm-action">Confirm</button>
                    )}
                    {booking.status !== "Cancelled" && (
                      <button className="cancel-action-small">Cancel</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PartnerBookingsPage;