import { Link } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function PaymentChoicePage() {
  const hotel = sampleHotels[0];
  const room = sampleRooms[0];

  return (
    <div className="payment-page">
      <div className="breadcrumb">
        Home / Kandy / {hotel.name} / Payment Choice
      </div>

      <section className="booking-header">
        <h1>Choose your payment method</h1>
        <p>Select how you want to complete your reservation.</p>
      </section>

      <div className="payment-layout">
        <section className="payment-options">
          <Link to="/booking/confirmation/TH25861473" className="payment-card">
            <div className="payment-icon">🏨</div>
            <div>
              <h2>Pay at Hotel</h2>
              <p>
                Reserve your room now and pay when you arrive at the hotel.
                Your payment status will be marked as Pending Payment.
              </p>
              <span className="recommended-badge">Recommended for MVP</span>
            </div>
          </Link>

          <Link to="/booking/confirmation/TH25861473" className="payment-card">
            <div className="payment-icon">💳</div>
            <div>
              <h2>Mock Online Payment</h2>
              <p>
                Demo payment option for presentation. No real money will be processed.
                Your payment status will be marked as Paid.
              </p>
              <span className="mock-badge">Demo only</span>
            </div>
          </Link>
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
            <strong>May 18 - May 19</strong>
          </div>

          <div className="summary-line">
            <span>Guests</span>
            <strong>2 adults · 1 room</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>LKR {room.totalPrice.toLocaleString()}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default PaymentChoicePage;