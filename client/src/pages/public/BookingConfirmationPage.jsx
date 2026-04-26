import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookingByReference } from "../../services/bookingApi";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function BookingConfirmationPage() {
  const { bookingRef } = useParams();

  const fallbackHotel = sampleHotels[0];
  const fallbackRoom = sampleRooms[0];

  const [booking, setBooking] = useState(null);
  const [display, setDisplay] = useState({
    hotelName: fallbackHotel.name,
    hotelArea: fallbackHotel.area,
    hotelCity: fallbackHotel.city,
    hotelImage: fallbackHotel.image,
    hotelVerified: fallbackHotel.verified,
    roomName: fallbackRoom.name,
    dateText: "May 18 - May 19",
    guestText: "2 adults · 1 room",
    totalText: `LKR ${fallbackRoom.totalPrice.toLocaleString()}`,
  });
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function loadBooking() {
      try {
        setLoading(true);
        setError("");

        const response = await getBookingByReference(bookingRef);
        const bookingData = response.data;

        setBooking(bookingData);

        setDisplay({
          hotelName: bookingData.hotel_name || fallbackHotel.name,
          hotelArea: bookingData.hotel_area || fallbackHotel.area,
          hotelCity: bookingData.hotel_city || fallbackHotel.city,
          hotelImage: fallbackHotel.image,
          hotelVerified: Boolean(bookingData.hotel_verified),
          roomName: bookingData.room_type || fallbackRoom.name,
          dateText: formatDateRange(bookingData.check_in, bookingData.check_out),
          guestText: `${bookingData.guests} guest${
            bookingData.guests > 1 ? "s" : ""
          }`,
          totalText: `LKR ${Number(bookingData.total_amount).toLocaleString()}`,
        });
      } catch (err) {
        const savedBooking = localStorage.getItem("tourismhub_completed_booking");

        if (savedBooking) {
          const parsedBooking = JSON.parse(savedBooking);

          if (parsedBooking.booking_reference === bookingRef) {
            setBooking({
              booking_reference: parsedBooking.booking_reference,
              payment_status: parsedBooking.payment_status,
              booking_status: "confirmed",
            });
            setDisplay(parsedBooking.display);
            setError("");
            return;
          }
        }

        setError("Could not load booking details from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [bookingRef]);

  const paymentStatusText =
    booking?.payment_status === "paid" ? "Paid" : "Pending Payment";

  return (
    <div className="confirmation-page">
      <section className="confirmation-hero">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p>
          Your reservation is complete. Please save your booking reference for
          future use.
        </p>
        <h2>Booking Reference: {bookingRef}</h2>
      </section>

      {loading && <p>Loading booking details...</p>}
      {error && <p className="form-note">{error}</p>}

      {!loading && !error && (
        <section className="confirmation-card">
          <h2>Booking Details</h2>

          <div className="confirmation-details">
            <img src={display.hotelImage} alt={display.hotelName} />

            <div className="confirmation-info">
              <div className="summary-title-row">
                <div>
                  <h3>{display.hotelName}</h3>
                  <p>
                    {display.hotelArea}, {display.hotelCity}
                  </p>
                </div>

                {display.hotelVerified && (
                  <span className="verified-badge">Verified</span>
                )}
              </div>

              <div className="summary-line">
                <span>Room</span>
                <strong>{display.roomName}</strong>
              </div>

              <div className="summary-line">
                <span>Dates</span>
                <strong>{display.dateText}</strong>
              </div>

              <div className="summary-line">
                <span>Guests</span>
                <strong>{display.guestText}</strong>
              </div>

              <div className="summary-line">
                <span>Booking Status</span>
                <strong>{booking?.booking_status || "confirmed"}</strong>
              </div>

              <div className="summary-line">
                <span>Payment Status</span>
                <strong
                  className={
                    booking?.payment_status === "paid"
                      ? "paid-status"
                      : "pending-status"
                  }
                >
                  {paymentStatusText}
                </strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>{display.totalText}</strong>
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

          <button type="button" className="invoice-button">
            Download Invoice
          </button>
        </section>
      )}
    </div>
  );
}

export default BookingConfirmationPage;