import { Link, useParams } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";

function HotelDetailsPage() {
  const { hotelId } = useParams();
  const hotel = sampleHotels.find((item) => item.id === Number(hotelId)) || sampleHotels[0];

  return (
    <div className="hotel-details-page">
      <section className="details-gallery">
        <img src={hotel.image} alt={hotel.name} className="main-gallery-image" />
        <div className="gallery-side">
          <img src={hotel.image} alt="Hotel view" />
          <img src={hotel.image} alt="Hotel room" />
        </div>
      </section>

      <section className="hotel-info-section">
        <div className="hotel-main-info">
          <div className="title-row">
            <div>
              <h1>{hotel.name}</h1>
              <p>{hotel.area}, {hotel.city}</p>
            </div>

            {hotel.verified && <span className="verified-badge">Verified</span>}
          </div>

          <div className="rating-row">
            <span className="rating-box">{hotel.rating}</span>
            <span>{hotel.reviewText}</span>
            <span>· {hotel.reviews} reviews</span>
          </div>

          <p className="hotel-description">
            A serene hotel experience in Sri Lanka with comfortable rooms, beautiful surroundings,
            helpful staff, and easy access to nearby attractions. Perfect for tourists who want a
            relaxing stay with convenient booking and clear hotel information.
          </p>

          <div className="hotel-tabs">
            <span>Overview</span>
            <span>Rooms</span>
            <span>Dine</span>
            <span>Events</span>
            <span>Reviews</span>
            <span>Policies</span>
            <span>Contact</span>
          </div>
        </div>

        <aside className="availability-card">
          <h3>Check availability</h3>
          <input type="date" defaultValue="2026-05-18" />
          <input type="date" defaultValue="2026-05-19" />
          <select defaultValue="2 adults · 1 room">
            <option>2 adults · 1 room</option>
            <option>1 adult · 1 room</option>
            <option>Family · 2 rooms</option>
          </select>

          <Link to={`/hotels/${hotel.id}/rooms`} className="details-button">
            Check Availability
          </Link>
        </aside>
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <h2>Experiences Near This Hotel</h2>
          <Link to="/events">View all</Link>
        </div>

        <div className="experience-grid">
          <div className="experience-card">
            <h3>Kandy Esala Perahera</h3>
            <p>Traditional cultural festival experience nearby.</p>
            <Link to="/events">Get directions</Link>
          </div>

          <div className="experience-card">
            <h3>Royal Botanic Gardens</h3>
            <p>Nature attraction located near Kandy.</p>
            <Link to="/events">Get directions</Link>
          </div>

          <div className="experience-card">
            <h3>Lake Kandy Boat Rides</h3>
            <p>Relaxing lake activity for tourists.</p>
            <Link to="/events">View details</Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>Facilities</h2>
        <div className="facility-row large">
          {hotel.facilities.map((facility) => (
            <span key={facility}>{facility}</span>
          ))}
          <span>Air conditioning</span>
          <span>Restaurant</span>
          <span>Room service</span>
        </div>
      </section>
    </div>
  );
}

export default HotelDetailsPage;