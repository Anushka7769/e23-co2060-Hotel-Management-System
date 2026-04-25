import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function BookingConfirmationPage() {
  const { bookingRef } = useParams();

  const fallbackHotel = sampleHotels[0];
  const fallbackRoom = sampleRooms[0];

  const [booking, setBooking] = useState({
    booking_reference: bookingRef,
    payment_status: "pending",
    display: {
      hotelName: fallbackHotel.name,
      hotelArea: fallbackHotel.area,
      hotelCity: fallbackHotel.city,
      hotelImage: fallbackHotel.image,
      hotelVerified: fallbackHotel.verified,
      roomName: fallbackRoom.name,
      dateText: "May 18 - May 19",
      guestText: "2 adults · 1 room",
      totalText: `LKR ${fallbackRoom.totalPrice.toLocaleString()}`,
    },
  });

  useEffect(() => {
    const savedBooking = localStorage.getItem("tourismhub_completed_booking");

    if (!savedBooking) {
      return;
    }

    const parsedBooking = JSON.parse(savedBooking);

    if (parsedBooking.booking_reference === bookingRef) {
      setBooking(parsedBooking);
    }
  }, [bookingRef]);

  const paymentStatusText =
    booking.payment_status === "paid" ? "Paid" : "Pending Payment";

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
          <img
            src={booking.display.hotelImage}
            alt={booking.display.hotelName}
          />

          <div className="confirmation-info">
            <div className="summary-title-row">
              <div>
                <h3>{booking.display.hotelName}</h3>
                <p>
                  {booking.display.hotelArea}, {booking.display.hotelCity}
                </p>
              </div>

              {booking.display.hotelVerified && (
                <span className="verified-badge">Verified</span>
              )}
            </div>

            <div className="summary-line">
              <span>Room</span>
              <strong>{booking.display.roomName}</strong>
            </div>

            <div className="summary-line">
              <span>Dates</span>
              <strong>{booking.display.dateText}</strong>
            </div>

            <div className="summary-line">
              <span>Guests</span>
              <strong>{booking.display.guestText}</strong>
            </div>

            <div className="summary-line">
              <span>Payment Status</span>
              <strong
                className={
                  booking.payment_status === "paid"
                    ? "paid-status"
                    : "pending-status"
                }
              >
                {paymentStatusText}
              </strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>{booking.display.totalText}</strong>
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