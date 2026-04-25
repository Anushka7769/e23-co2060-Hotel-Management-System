function RoomsPricingPage() {
  const rooms = [
    {
      id: 1,
      name: "Deluxe Suite",
      guests: "1-3 guests",
      capacity: 3,
      priceRange: "LKR 20,000 - 25,000",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Standard Room",
      guests: "1-2 guests",
      capacity: 2,
      priceRange: "LKR 12,000 - 15,000",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Family Room",
      guests: "1-4 guests",
      capacity: 4,
      priceRange: "LKR 18,000 - 20,000",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      name: "Single Room",
      guests: "1 guest",
      capacity: 1,
      priceRange: "LKR 8,000 - 10,000",
      status: "Limited",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80",
    },
  ];

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
        <select>
          <option>All rooms</option>
          <option>Active</option>
          <option>Limited</option>
          <option>Unavailable</option>
        </select>

        <input type="text" placeholder="Search room type..." />
      </section>

      <section className="partner-table-card">
        <table className="partner-table rooms-table">
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Guests</th>
              <th>Capacity</th>
              <th>Price Range / Night</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>
                  <div className="room-type-cell">
                    <img src={room.image} alt={room.name} />
                    <div>
                      <strong>{room.name}</strong>
                      <p>{room.status === "Limited" ? "Few rooms left" : "Available"}</p>
                    </div>
                  </div>
                </td>
                <td>{room.guests}</td>
                <td>{room.capacity}</td>
                <td>{room.priceRange}</td>
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