import { Link, useParams } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function BookingConfirmationPage() {
  const { bookingRef } = useParams();
  const hotel = sampleHotels[0];
  const room = sampleRooms[0];

  return (
    <div className="confirmation-page">
      <section className="confirmation-hero">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>
          Your reservation is complete. A confirmation email has been sent to your email address.
        </p>
        <h2>Booking Reference: {bookingRef}</h2>
      </section>

      <section className="confirmation-card">
        <h2>Booking Details</h2>

        <div className="confirmation-details">
          <img src={hotel.image} alt={hotel.name} />

          <div className="confirmation-info">
            <div className="summary-title-row">
              <div>
                <h3>{hotel.name}</h3>
                <p>{hotel.area}, {hotel.city}</p>
              </div>

              {hotel.verified && <span className="verified-badge">Verified</span>}
            </div>

            <div className="summary-line">
              <span>Room</span>
              <strong>{room.name}</strong>
            </div>

            <div className="summary-line">
              <span>Dates</span>
              <strong>May 18 - May 19</strong>
            </div>

            <div className="summary-line">
              <span>Guests</span>
              <strong>2 adults · 1 room</strong>
            </div>

            <div className="summary-line">
              <span>Payment Status</span>
              <strong className="paid-status">Pending Payment</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>LKR {room.totalPrice.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/account/bookings" className="primary-action">
            Go to My Bookings
          </Link>

          <Link to="/" className="secondary-action">
            Back to Home
          </Link>
        </div>

        <button className="invoice-button">Download Invoice</button>
      </section>
    </div>
  );
}

export default BookingConfirmationPage;