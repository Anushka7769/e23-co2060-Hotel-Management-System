import { Link, useParams } from "react-router-dom";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function RoomsAvailabilityPage() {
  const { hotelId } = useParams();
  const hotel = sampleHotels.find((item) => item.id === Number(hotelId)) || sampleHotels[0];

  return (
    <div className="rooms-page">
      <div className="breadcrumb">
        Home / Kandy / {hotel.name} / Rooms & Availability
      </div>

      <section className="rooms-header">
        <div>
          <h1>Rooms & Availability</h1>
          <p>{hotel.name} · {hotel.area}, {hotel.city}</p>
        </div>

        {hotel.verified && <span className="verified-badge">Verified</span>}
      </section>

      <section className="room-search-panel">
        <input type="date" defaultValue="2026-05-18" />
        <input type="date" defaultValue="2026-05-19" />
        <input type="text" placeholder="Promo code optional" />
        <button>Update</button>
      </section>

      <div className="availability-note">
        Select dates to see available rooms and pricing. LKR prices are shown for 2 nights.
      </div>

      <section className="room-tabs">
        <button>All rooms</button>
        <button>Standard Room</button>
        <button>Deluxe Room</button>
        <button>Junior Suite</button>
      </section>

      <section className="room-list">
        {sampleRooms.map((room) => (
          <div className="room-card" key={room.id}>
            <img src={room.image} alt={room.name} className="room-image" />

            <div className="room-info">
              <h3>{room.name}</h3>
              <p>{room.guests} · {room.bed} · {room.size}</p>

              <div className="facility-row">
                {room.facilities.map((facility) => (
                  <span key={facility}>{facility}</span>
                ))}
              </div>

              <p className="availability-text">
                {room.available ? "Available for selected dates" : "Sold out"}
              </p>
            </div>

            <div className="room-price">
              <p>From</p>
              <h3>LKR {room.pricePerNight.toLocaleString()}</h3>
              <span>Total: LKR {room.totalPrice.toLocaleString()} / 2 nights</span>

              <div className="room-quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              <Link to="/booking/details" className="reserve-button">
                Reserve
              </Link>
            </div>
          </div>
        ))}
      </section>

      <div className="change-search-box">
        Search results are based on your dates. Want to change your search?
        <Link to="/hotels"> Back to results</Link>
      </div>
    </div>
  );
}

export default RoomsAvailabilityPage;