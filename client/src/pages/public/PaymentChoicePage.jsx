import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../services/bookingApi";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function PaymentChoicePage() {
  const navigate = useNavigate();

  const fallbackHotel = sampleHotels[0];
  const fallbackRoom = sampleRooms[0];

  const [bookingDraft, setBookingDraft] = useState(null);
  const [hotel, setHotel] = useState(fallbackHotel);
  const [room, setRoom] = useState(fallbackRoom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedDraft = localStorage.getItem("tourismhub_booking_draft");

    if (!savedDraft) {
      setError("Booking details were not found. Please complete booking details first.");
      return;
    }

    const parsedDraft = JSON.parse(savedDraft);
    setBookingDraft(parsedDraft);

    setHotel({
      ...fallbackHotel,
      name: parsedDraft.display.hotelName,
      area: parsedDraft.display.hotelArea,
      city: parsedDraft.display.hotelCity,
      image: parsedDraft.display.hotelImage,
      verified: parsedDraft.display.hotelVerified,
    });

    setRoom({
      ...fallbackRoom,
      name: parsedDraft.display.roomName,
      totalPrice: parsedDraft.booking.total_amount,
    });
  }, []);

  async function handlePaymentChoice(paymentStatus) {
    if (!bookingDraft) {
      setError("Booking draft is missing. Please go back and enter booking details.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await createBooking({
        ...bookingDraft.booking,
        payment_status: paymentStatus,
      });

      const completedBooking = {
        ...bookingDraft,
        booking_reference: response.data.booking_reference,
        payment_status: paymentStatus,
      };

      localStorage.setItem(
        "tourismhub_completed_booking",
        JSON.stringify(completedBooking)
      );

      localStorage.removeItem("tourismhub_booking_draft");

      navigate(`/booking/confirmation/${response.data.booking_reference}`);
    } catch (err) {
      setError("Could not create booking. Please check backend and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="payment-page">
      <div className="breadcrumb">
        Home / Kandy / {hotel.name} / Payment Choice
      </div>

      <section className="booking-header">
        <h1>Choose your payment method</h1>
        <p>Select how you want to complete your reservation.</p>
      </section>

      {error && <p className="form-note">{error}</p>}

      <div className="payment-layout">
        <section className="payment-options">
          <button
            type="button"
            className="payment-card"
            onClick={() => handlePaymentChoice("pending")}
            disabled={isSubmitting}
          >
            <div className="payment-icon">🏨</div>
            <div>
              <h2>Pay at Hotel</h2>
              <p>
                Reserve your room now and pay when you arrive at the hotel.
                Your payment status will be marked as Pending Payment.
              </p>
              <span className="recommended-badge">Recommended for MVP</span>
            </div>
          </button>

          <button
            type="button"
            className="payment-card"
            onClick={() => handlePaymentChoice("paid")}
            disabled={isSubmitting}
          >
            <div className="payment-icon">💳</div>
            <div>
              <h2>Mock Online Payment</h2>
              <p>
                Demo payment option for presentation. No real money will be processed.
                Your payment status will be marked as Paid.
              </p>
              <span className="mock-badge">Demo only</span>
            </div>
          </button>

          {isSubmitting && <p>Creating booking...</p>}
        </section>

        <aside className="booking-summary-card">
          <h2>Booking Summary</h2>

          <img src={hotel.image} alt={hotel.name} />

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
            <strong>
              {bookingDraft?.display?.dateText || "May 18 - May 19"}
            </strong>
          </div>

          <div className="summary-line">
            <span>Guests</span>
            <strong>
              {bookingDraft?.display?.guestText || "2 adults · 1 room"}
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>
              {bookingDraft?.display?.totalText ||
                `LKR ${room.totalPrice.toLocaleString()}`}
            </strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PaymentChoicePage;