import { Link } from "react-router-dom";
import sampleBookings from "../../data/sampleBookings";

function MyBookingsPage() {
  return (
    <div className="my-bookings-page">
      <div className="breadcrumb">Home / My Account / My Bookings</div>

      <section className="booking-header">
        <h1>My Bookings</h1>
        <p>Manage your reservations, view invoices, and check booking status.</p>
      </section>

      <div className="dashboard-tabs">
        <button className="active">Upcoming Bookings</button>
        <button>Past Bookings</button>
        <button>Saved Hotels</button>
        <button>Reviews</button>
      </div>

      <div className="booking-alert">
        Here are your bookings. You can view details, download invoices, or cancel if allowed.
      </div>

      <section className="user-booking-list">
        {sampleBookings.map((booking) => (
          <div className="user-booking-card" key={booking.id}>
            <img src={booking.hotel.image} alt={booking.hotel.name} />

            <div className="user-booking-info">
              <div className="summary-title-row">
                <div>
                  <h3>{booking.hotel.name}</h3>
                  <p>{booking.room.name}</p>
                </div>

                {booking.hotel.verified && <span className="verified-badge">Verified</span>}
              </div>

              <p>{booking.dates} · {booking.guests}</p>
              <p>Booking Ref: <strong>{booking.bookingRef}</strong></p>

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

              <Link to={`/booking/confirmation/${booking.bookingRef}`} className="view-booking-button">
                View Booking
              </Link>

              <button className="invoice-outline-button">Download Invoice</button>

              {booking.paymentStatus === "Pending Payment" && (
                <button className="cancel-button">Cancel Booking</button>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MyBookingsPage;