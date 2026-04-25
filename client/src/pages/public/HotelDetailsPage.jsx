import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchHotelById } from "../../services/hotelApi";
import sampleHotels from "../../data/sampleHotels";

function HotelDetailsPage() {
  const { hotelId } = useParams();

  const fallbackHotel =
    sampleHotels.find((item) => item.id === Number(hotelId)) || sampleHotels[0];

  const [hotel, setHotel] = useState(fallbackHotel);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHotel() {
      try {
        const response = await fetchHotelById(hotelId);
        const apiHotel = response.data;

        setHotel({
          ...fallbackHotel,
          ...apiHotel,
          image: fallbackHotel.image,
          area: apiHotel.address || fallbackHotel.area,
          verified: Boolean(apiHotel.is_verified),
          rating: fallbackHotel.rating,
          reviewText: fallbackHotel.reviewText,
          reviews: fallbackHotel.reviews,
          facilities: fallbackHotel.facilities,
          description: apiHotel.description || fallbackHotel.description,
        });
      } catch (err) {
        setError("Could not load hotel details from backend. Showing sample details.");
        setHotel(fallbackHotel);
      } finally {
        setLoading(false);
      }
    }

    loadHotel();
  }, [hotelId]);

  return (
    <div className="hotel-details-page">
      {loading && <p>Loading hotel details...</p>}
      {error && <p className="form-note">{error}</p>}

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
            {hotel.description}
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