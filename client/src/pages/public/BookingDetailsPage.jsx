import { Link } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function BookingDetailsPage() {
  const hotel = sampleHotels[0];
  const room = sampleRooms[0];

  return (
    <div className="booking-page">
      <div className="breadcrumb">
        Home / Kandy / {hotel.name} / Booking Details
      </div>

      <section className="booking-header">
        <h1>Review your details</h1>
        <p>Almost done. Fill in your guest details to complete your booking.</p>
      </section>

      <div className="booking-layout">
        <form className="guest-form">
          <h2>Guest Information</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="John" />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john.doe@example.com" />
          </div>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+94 71 234 5678" />
            </div>

            <div className="form-group">
              <label>Country</label>
              <select defaultValue="Sri Lanka">
                <option>Sri Lanka</option>
                <option>India</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Arrival Time optional</label>
            <select defaultValue="10:00 AM - 12:00 PM">
              <option>10:00 AM - 12:00 PM</option>
              <option>12:00 PM - 2:00 PM</option>
              <option>2:00 PM - 4:00 PM</option>
              <option>After 6:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea placeholder="Please let us know if you have any special preferences." />
          </div>

          <Link to="/booking/payment" className="confirm-booking-button">
            Continue to Payment
          </Link>

          <p className="terms-text">
            By continuing, you agree to our Terms & Conditions and Privacy Policy.
          </p>
        </form>

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

          <div className="summary-line">
            <span>Room price</span>
            <strong>LKR {room.totalPrice.toLocaleString()}</strong>
          </div>

          <div className="summary-line">
            <span>Taxes & service charges</span>
            <strong>Included</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>LKR {room.totalPrice.toLocaleString()}</strong>
          </div>

          <div className="policy-note">
            Free cancellation until May 16. After that, cancellation charges may apply.
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BookingDetailsPage;