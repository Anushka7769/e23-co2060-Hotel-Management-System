import { useEffect, useState } from "react";
import {
  fetchPartnerDashboard,
  fetchPartnerBookings,
} from "../../services/partnerApi";

function PartnerDashboardPage() {
  const [stats, setStats] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);
  const [hotelName, setHotelName] = useState("Partner");
  const [availabilityAlert, setAvailabilityAlert] = useState("Checking room availability...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPartnerDashboard() {
      try {
        const [dashboardResponse, bookingsResponse] = await Promise.all([
          fetchPartnerDashboard(1),
          fetchPartnerBookings(1),
        ]);

        const dashboard = dashboardResponse.data;
        const bookings = bookingsResponse.data;

        setHotelName(dashboard.hotel?.name || "Partner");

        setStats([
          {
            title: "Total Bookings",
            value: dashboard.bookingStats.total_bookings || 0,
            text: `${dashboard.bookingStats.confirmed_bookings || 0} confirmed`,
            icon: "📅",
          },
          {
            title: "Paid Bookings",
            value: dashboard.bookingStats.paid_bookings || 0,
            text: "Payments completed",
            icon: "✅",
          },
          {
            title: "Available Rooms",
            value: dashboard.roomStats.available_rooms || 0,
            text: `${dashboard.roomStats.total_rooms || 0} total rooms`,
            icon: "🚪",
          },
          {
            title: "Total Revenue",
            value: `LKR ${Number(dashboard.bookingStats.total_revenue || 0).toLocaleString()}`,
            text: "From bookings",
            icon: "⭐",
          },
        ]);

        setAvailabilityAlert(
          `${dashboard.roomStats.available_rooms || 0} rooms available from ${dashboard.roomStats.total_rooms || 0} total rooms.`
        );

        const formattedBookings = bookings.slice(0, 5).map((booking) => ({
          id: booking.booking_reference,
          guest: booking.guest_name,
          room: booking.room_type,
          dates: formatDateRange(booking.check_in, booking.check_out),
          status: formatStatus(booking.booking_status),
        }));

        setLatestBookings(formattedBookings);
      } catch (err) {
        setError("Could not load partner dashboard from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadPartnerDashboard();
  }, []);

  function formatDateRange(checkIn, checkOut) {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const options = {
      month: "short",
      day: "numeric",
    };

    return `${startDate.toLocaleDateString("en-US", options)} - ${endDate.toLocaleDateString("en-US", options)}`;
  }

  function formatStatus(status) {
    if (status === "confirmed") return "Confirmed";
    if (status === "cancelled") return "Cancelled";
    if (status === "completed") return "Completed";
    return "Pending";
  }

  return (
    <div className="partner-dashboard-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Welcome back, {hotelName}!</h1>
          <p>Here’s what is happening with your hotel today.</p>
        </div>

        <button className="partner-small-button">View Reports</button>
      </div>

      {loading && <p>Loading partner dashboard...</p>}
      {error && <p className="form-note">{error}</p>}

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
          <p>{availabilityAlert}</p>
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
            {!loading && latestBookings.map((booking) => (
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

        {!loading && latestBookings.length === 0 && (
          <p>No bookings found for this hotel.</p>
        )}
      </section>
    </div>
  );
}

export default PartnerDashboardPage;