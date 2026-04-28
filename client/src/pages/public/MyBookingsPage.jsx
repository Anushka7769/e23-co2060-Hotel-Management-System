import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  cancelBookingById,
  getBookingsByTouristId,
} from "../../services/bookingApi";
import { useAuth } from "../../context/AuthContext";
import sampleBookings from "../../data/sampleBookings";

function MyBookingsPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoadingId, setCancelLoadingId] = useState(null);
  const [error, setError] = useState("");

  function formatDateRange(checkIn, checkOut) {
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const options = {
      month: "short",
      day: "numeric",
    };

    return `${startDate.toLocaleDateString(
      "en-US",
      options
    )} - ${endDate.toLocaleDateString("en-US", options)}`;
  }

  function mapBookingData(apiBookings) {
    return apiBookings.map((booking, index) => {
      const fallbackBooking = sampleBookings[index] || sampleBookings[0];

      return {
        id: booking.id,
        bookingRef: booking.booking_reference,
        dates: formatDateRange(booking.check_in, booking.check_out),
        guests: `${booking.guests} guest${booking.guests > 1 ? "s" : ""}`,
        paymentStatus:
          booking.payment_status === "paid" ? "Paid" : "Pending Payment",
        bookingStatus: booking.booking_status,
        total: Number(booking.total_amount),
        hotel: {
          ...fallbackBooking.hotel,
          name: booking.hotel_name,
        },
        room: {
          ...fallbackBooking.room,
          name: booking.room_type,
        },
      };
    });
  }

  async function loadBookings() {
    try {
      setLoading(true);
      setError("");

      const response = await getBookingsByTouristId(user.id);
      setBookings(mapBookingData(response.data));
    } catch (err) {
      setError("Could not load your bookings from backend.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      alert("Please login to view your bookings.");
      navigate("/login");
      return;
    }

    loadBookings();
  }, [isLoggedIn, navigate, user]);

  async function handleCancelBooking(bookingId) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancelLoadingId(bookingId);
      setError("");

      await cancelBookingById(bookingId);
      await loadBookings();

      alert("Booking cancelled successfully.");
    } catch (err) {
      setError("Could not cancel booking. Please try again.");
    } finally {
      setCancelLoadingId(null);
    }
  }

  return (
    <div className="my-bookings-page">
      <div className="breadcrumb">Home / My Account / My Bookings</div>

      <section className="booking-header">
        <h1>My Bookings</h1>
        <p>
          Manage your reservations, view invoices, and check booking status.
        </p>
      </section>

      <div className="dashboard-tabs">
        <button className="active">Upcoming Bookings</button>
        <button>Past Bookings</button>
        <button>Saved Hotels</button>
        <button>Reviews</button>
      </div>

      <div className="booking-alert">
        Here are your bookings. You can view details, download invoices, or
        cancel if allowed.
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="form-note">{error}</p>}

      {!loading && bookings.length === 0 && !error && (
        <div className="booking-alert">
          You do not have any bookings yet.{" "}
          <Link to="/hotels">Explore hotels</Link> to make your first booking.
        </div>
      )}

      <section className="user-booking-list">
        {!loading &&
          bookings.map((booking) => (
            <div className="user-booking-card" key={booking.id}>
              <img src={booking.hotel.image} alt={booking.hotel.name} />

              <div className="user-booking-info">
                <div className="summary-title-row">
                  <div>
                    <h3>{booking.hotel.name}</h3>
                    <p>{booking.room.name}</p>
                  </div>

                  {booking.hotel.verified && (
                    <span className="verified-badge">Verified</span>
                  )}
                </div>

                <p>
                  {booking.dates} · {booking.guests}
                </p>

                <p>
                  Booking Ref: <strong>{booking.bookingRef}</strong>
                </p>

                <p>
                  Booking Status:{" "}
                  <strong
                    style={{
                      color:
                        booking.bookingStatus === "cancelled"
                          ? "#dc2626"
                          : "#166534",
                    }}
                  >
                    {booking.bookingStatus}
                  </strong>
                </p>

                <span
                  className={
                    booking.paymentStatus === "Paid"
                      ? "booking-status paid"
                      : "booking-status pending"
                  }
                >
                  {booking.paymentStatus}
                </span>
              </div>

              <div className="user-booking-actions">
                <h3>LKR {booking.total.toLocaleString()}</h3>

                <Link
                  to={`/booking/confirmation/${booking.bookingRef}`}
                  className="view-booking-button"
                >
                  View Booking
                </Link>

                <button type="button" className="invoice-outline-button">
                  Download Invoice
                </button>

                {booking.bookingStatus !== "cancelled" && (
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={cancelLoadingId === booking.id}
                  >
                    {cancelLoadingId === booking.id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </button>
                )}
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default MyBookingsPage;