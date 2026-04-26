import { useEffect, useState } from "react";
import { fetchPartnerBookings } from "../../services/partnerApi";

function PartnerBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All bookings");
  const [roomFilter, setRoomFilter] = useState("All rooms");
  const [searchText, setSearchText] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetchPartnerBookings(1);

        const formattedBookings = response.data.map((booking) => ({
          id: booking.booking_reference,
          guest: booking.guest_name,
          room: booking.room_type,
          dates: formatDateRange(booking.check_in, booking.check_out),
          guests: `${booking.guests} guests`,
          amount: Number(booking.total_amount),
          status: formatStatus(booking.booking_status),
          paymentStatus: booking.payment_status,
        }));

        setBookings(formattedBookings);
        setFilteredBookings(formattedBookings);

        const uniqueRooms = [
          ...new Set(formattedBookings.map((booking) => booking.room)),
        ];

        setRoomTypes(uniqueRooms);
      } catch (err) {
        setError("Could not load partner bookings from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  useEffect(() => {
    let updatedBookings = [...bookings];

    if (statusFilter !== "All bookings") {
      updatedBookings = updatedBookings.filter(
        (booking) => booking.status === statusFilter
      );
    }

    if (roomFilter !== "All rooms") {
      updatedBookings = updatedBookings.filter(
        (booking) => booking.room === roomFilter
      );
    }

    if (searchText.trim() !== "") {
      updatedBookings = updatedBookings.filter(
        (booking) =>
          booking.id.toLowerCase().includes(searchText.toLowerCase()) ||
          booking.guest.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredBookings(updatedBookings);
  }, [statusFilter, roomFilter, searchText, bookings]);

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
    <div className="partner-bookings-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Booking Management</h1>
          <p>Manage and update your guest bookings below.</p>
        </div>

        <button className="partner-small-button">Export Bookings</button>
      </div>

      <section className="partner-filter-bar">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All bookings</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
          <option>Completed</option>
        </select>

        <select
          value={roomFilter}
          onChange={(event) => setRoomFilter(event.target.value)}
        >
          <option>All rooms</option>
          {roomTypes.map((roomType) => (
            <option key={roomType}>{roomType}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search booking or guest..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      {loading && <p>Loading partner bookings...</p>}
      {error && <p className="form-note">{error}</p>}

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
            {!loading && filteredBookings.map((booking) => (
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

        {!loading && filteredBookings.length === 0 && (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
}

export default PartnerBookingsPage;