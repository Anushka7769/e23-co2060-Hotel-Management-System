import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchHotelById, fetchHotelRooms } from "../../services/hotelApi";
import sampleHotels from "../../data/sampleHotels";
import sampleRooms from "../../data/sampleRooms";

function RoomsAvailabilityPage() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const fallbackHotel =
    sampleHotels.find((item) => item.id === Number(hotelId)) || sampleHotels[0];

  const [hotel, setHotel] = useState(fallbackHotel);
  const [rooms, setRooms] = useState(sampleRooms);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchData, setSearchData] = useState({
    checkIn: "2026-05-18",
    checkOut: "2026-05-19",
    guests: 2,
    guestText: "2 adults · 1 room",
    dateText: "May 18 - May 19",
  });

  useEffect(() => {
    async function loadRoomsPage() {
      try {
        const [hotelResponse, roomsResponse] = await Promise.all([
          fetchHotelById(hotelId),
          fetchHotelRooms(hotelId),
        ]);

        const apiHotel = hotelResponse.data;

        setHotel({
          ...fallbackHotel,
          ...apiHotel,
          area: apiHotel.address || fallbackHotel.area,
          verified: Boolean(apiHotel.is_verified),
        });

        const roomsFromApi = roomsResponse.data.map((room, index) => {
          const fallbackRoom = sampleRooms[index] || sampleRooms[0];
          const pricePerNight = Number(room.price_per_night);

          return {
            ...fallbackRoom,
            id: room.id,
            hotel_id: Number(hotelId),
            name: room.room_type,
            room_type: room.room_type,
            guests: `${room.capacity} guests`,
            capacity: room.capacity,
            pricePerNight,
            totalPrice: pricePerNight * 2,
            available: room.available_rooms > 0,
            image: fallbackRoom.image,
            facilities: fallbackRoom.facilities,
          };
        });

        setRooms(roomsFromApi);
      } catch (err) {
        setError("Could not load rooms from backend. Showing sample rooms.");
        setRooms(
          sampleRooms.map((room) => ({
            ...room,
            hotel_id: Number(hotelId) || 1,
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    loadRoomsPage();
  }, [hotelId]);

  function formatDateText(checkIn, checkOut) {
    const options = {
      month: "short",
      day: "numeric",
    };

    const checkInText = new Date(checkIn).toLocaleDateString("en-US", options);
    const checkOutText = new Date(checkOut).toLocaleDateString("en-US", options);

    return `${checkInText} - ${checkOutText}`;
  }

  function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const nights = diffTime / (1000 * 60 * 60 * 24);

    return nights > 0 ? nights : 1;
  }

  function handleSearchChange(event) {
    const { name, value } = event.target;

    setSearchData((currentData) => {
      const updatedData = {
        ...currentData,
        [name]: value,
      };

      return {
        ...updatedData,
        dateText: formatDateText(updatedData.checkIn, updatedData.checkOut),
      };
    });
  }

  function handleReserve(room) {
    const nights = calculateNights(searchData.checkIn, searchData.checkOut);
    const updatedRoom = {
      ...room,
      totalPrice: room.pricePerNight * nights,
    };

    localStorage.setItem("tourismhub_selected_hotel", JSON.stringify(hotel));
    localStorage.setItem("tourismhub_selected_room", JSON.stringify(updatedRoom));
    localStorage.setItem("tourismhub_check_in", searchData.checkIn);
    localStorage.setItem("tourismhub_check_out", searchData.checkOut);
    localStorage.setItem("tourismhub_guests", String(searchData.guests));
    localStorage.setItem("tourismhub_guest_text", searchData.guestText);
    localStorage.setItem("tourismhub_date_text", searchData.dateText);

    navigate("/booking/details");
  }

  return (
    <div className="rooms-page">
      <div className="breadcrumb">
        Home / Kandy / {hotel.name} / Rooms & Availability
      </div>

      <section className="rooms-header">
        <div>
          <h1>Rooms & Availability</h1>
          <p>
            {hotel.name} · {hotel.area}, {hotel.city}
          </p>
        </div>

        {hotel.verified && <span className="verified-badge">Verified</span>}
      </section>

      <section className="room-search-panel">
        <input
          type="date"
          name="checkIn"
          value={searchData.checkIn}
          onChange={handleSearchChange}
        />

        <input
          type="date"
          name="checkOut"
          value={searchData.checkOut}
          onChange={handleSearchChange}
        />

        <select
          name="guests"
          value={searchData.guests}
          onChange={(event) => {
            const guests = Number(event.target.value);

            setSearchData((currentData) => ({
              ...currentData,
              guests,
              guestText: `${guests} adult${guests > 1 ? "s" : ""} · 1 room`,
            }));
          }}
        >
          <option value="1">1 adult · 1 room</option>
          <option value="2">2 adults · 1 room</option>
          <option value="3">3 adults · 1 room</option>
          <option value="4">4 adults · 1 room</option>
        </select>

        <button type="button">Update</button>
      </section>

      <div className="availability-note">
        Select dates to see available rooms and pricing. LKR prices are shown for
        your selected nights.
      </div>

      {loading && <p>Loading rooms...</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="room-tabs">
        <button>All rooms</button>
        {rooms.map((room) => (
          <button key={room.id}>{room.name}</button>
        ))}
      </section>

      <section className="room-list">
        {!loading &&
          rooms.map((room) => {
            const nights = calculateNights(searchData.checkIn, searchData.checkOut);
            const totalPrice = room.pricePerNight * nights;

            return (
              <div className="room-card" key={room.id}>
                <img src={room.image} alt={room.name} className="room-image" />

                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>
                    {room.guests} · {room.bed} · {room.size}
                  </p>

                  <div className="facility-row">
                    {room.facilities.map((facility) => (
                      <span key={facility}>{facility}</span>
                    ))}
                  </div>

                  <p className="availability-text">
                    {room.available
                      ? "Available for selected dates"
                      : "Sold out"}
                  </p>
                </div>

                <div className="room-price">
                  <p>From</p>
                  <h3>LKR {room.pricePerNight.toLocaleString()}</h3>
                  <span>
                    Total: LKR {totalPrice.toLocaleString()} / {nights} night
                    {nights > 1 ? "s" : ""}
                  </span>

                  <div className="room-quantity">
                    <button type="button">-</button>
                    <span>1</span>
                    <button type="button">+</button>
                  </div>

                  <button
                    type="button"
                    className="reserve-button"
                    onClick={() => handleReserve(room)}
                    disabled={!room.available}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            );
          })}
      </section>

      <div className="change-search-box">
        Search results are based on your dates. Want to change your search?
        <Link to="/hotels"> Back to results</Link>
      </div>
    </div>
  );
}

export default RoomsAvailabilityPage;