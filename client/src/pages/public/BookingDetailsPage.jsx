import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function BookingDetailsPage() {
  const navigate = useNavigate();

  const hotel = sampleHotels[0];
  const room = sampleRooms[0];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Sri Lanka",
    arrivalTime: "10:00 AM - 12:00 PM",
    specialRequests: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const bookingDraft = {
      guest: formData,
      booking: {
        tourist_id: 3,
        hotel_id: 1,
        room_id: 1,
        check_in: "2026-05-18",
        check_out: "2026-05-19",
        guests: 2,
        total_amount: room.totalPrice,
      },
      display: {
        hotelName: hotel.name,
        hotelArea: hotel.area,
        hotelCity: hotel.city,
        hotelImage: hotel.image,
        hotelVerified: hotel.verified,
        roomName: room.name,
        dateText: "May 18 - May 19",
        guestText: "2 adults · 1 room",
        totalText: `LKR ${room.totalPrice.toLocaleString()}`,
      },
    };

    localStorage.setItem("tourismhub_booking_draft", JSON.stringify(bookingDraft));

    navigate("/booking/payment");
  }

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
        <form className="guest-form" onSubmit={handleSubmit}>
          <h2>Guest Information</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+94 71 234 5678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option>Sri Lanka</option>
                <option>India</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Arrival Time optional</label>
            <select
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
            >
              <option>10:00 AM - 12:00 PM</option>
              <option>12:00 PM - 2:00 PM</option>
              <option>2:00 PM - 4:00 PM</option>
              <option>After 6:00 PM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Special Requests</label>
            <textarea
              name="specialRequests"
              placeholder="Please let us know if you have any special preferences."
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="confirm-booking-button">
            Continue to Payment
          </button>

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