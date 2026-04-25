import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-card-image" />

      <div className="hotel-card-content">
        <div className="hotel-card-header">
          <div>
            <h3>{hotel.name}</h3>
            <p>{hotel.area}</p>
          </div>

          {hotel.verified && <span className="verified-badge">Verified</span>}
        </div>

        <div className="rating-row">
          <span className="rating-box">{hotel.rating}</span>
          <span>{hotel.reviewText}</span>
          <span>· {hotel.reviews} reviews</span>
        </div>

        <div className="facility-row">
          {hotel.facilities.map((facility) => (
            <span key={facility}>{facility}</span>
          ))}
        </div>
      </div>

      <div className="hotel-card-price">
        <p>2 nights · 2 adults</p>
        <h3>LKR {hotel.pricePerNight.toLocaleString()}</h3>
        <span>Total: LKR {hotel.totalPrice.toLocaleString()}</span>

        <Link to={`/hotels/${hotel.id}`} className="details-button">
          View details
        </Link>
      </div>
    </div>
  );
}

export default HotelCard;