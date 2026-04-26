import { useEffect, useState } from "react";
import { fetchPartnerRooms } from "../../services/partnerApi";

const roomImages = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
];

function RoomsPricingPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All rooms");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        const response = await fetchPartnerRooms(1);

        const formattedRooms = response.data.map((room, index) => {
          const availableRooms = Number(room.available_rooms);
          const totalRooms = Number(room.total_rooms);
          const price = Number(room.price_per_night);

          return {
            id: room.id,
            name: room.room_type,
            guests: `1-${room.capacity} guests`,
            capacity: room.capacity,
            priceRange: `LKR ${price.toLocaleString()}`,
            status: availableRooms === 0 ? "Unavailable" : availableRooms <= 2 ? "Limited" : "Active",
            availableRooms,
            totalRooms,
            image: roomImages[index] || roomImages[0],
          };
        });

        setRooms(formattedRooms);
        setFilteredRooms(formattedRooms);
      } catch (err) {
        setError("Could not load partner rooms from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, []);

  useEffect(() => {
    let updatedRooms = [...rooms];

    if (statusFilter !== "All rooms") {
      updatedRooms = updatedRooms.filter((room) => room.status === statusFilter);
    }

    if (searchText.trim() !== "") {
      updatedRooms = updatedRooms.filter((room) =>
        room.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredRooms(updatedRooms);
  }, [statusFilter, searchText, rooms]);

  return (
    <div className="rooms-pricing-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Rooms & Pricing Management</h1>
          <p>Manage your hotel rooms, prices, availability, and room details.</p>
        </div>

        <button className="partner-small-button">+ Add Room Type</button>
      </div>

      <section className="partner-filter-bar rooms-filter-bar">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All rooms</option>
          <option>Active</option>
          <option>Limited</option>
          <option>Unavailable</option>
        </select>

        <input
          type="text"
          placeholder="Search room type..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      {loading && <p>Loading partner rooms...</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="partner-table-card">
        <table className="partner-table rooms-table">
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Guests</th>
              <th>Capacity</th>
              <th>Price / Night</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>
                  <div className="room-type-cell">
                    <img src={room.image} alt={room.name} />
                    <div>
                      <strong>{room.name}</strong>
                      <p>
                        {room.availableRooms} of {room.totalRooms} rooms available
                      </p>
                    </div>
                  </div>
                </td>
                <td>{room.guests}</td>
                <td>{room.capacity}</td>
                <td>{room.priceRange}</td>
                <td>{room.availableRooms} / {room.totalRooms}</td>
                <td>
                  <span
                    className={
                      room.status === "Active"
                        ? "table-status confirmed"
                        : "table-status pending"
                    }
                  >
                    {room.status}
                  </span>
                </td>
                <td>
                  <div className="table-action-buttons">
                    <button className="view-action">Edit</button>
                    <button className="confirm-action">Price</button>
                    <button className="cancel-action-small">Block Dates</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && filteredRooms.length === 0 && (
          <p>No rooms found.</p>
        )}
      </section>

      <section className="room-management-cards">
        <div className="management-card">
          <h3>Availability Updates</h3>
          <p>Block unavailable dates for maintenance, holidays, or private bookings.</p>
          <button className="partner-small-button">Manage Availability</button>
        </div>

        <div className="management-card">
          <h3>Pricing Rules</h3>
          <p>Update room prices for weekdays, weekends, and seasonal offers.</p>
          <button className="partner-small-button">Update Pricing</button>
        </div>
      </section>
    </div>
  );
}

export default RoomsPricingPage;