function DiningManagementPage() {
  const restaurants = [
    {
      id: 1,
      name: "Ocean Breeze Restaurant",
      cuisine: "Sri Lankan · Seafood",
      hours: "7:00 AM - 10:00 PM",
      status: "Open",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Sunset Bar & Grill",
      cuisine: "BBQ · Cocktails · Western",
      hours: "5:00 PM - 11:00 PM",
      status: "Open",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const reservations = [
    {
      id: "TR-20457",
      guest: "Alex Silva",
      restaurant: "Ocean Breeze Restaurant",
      time: "May 18 · 7:30 PM",
      guests: "2 guests",
      status: "Confirmed",
    },
    {
      id: "TR-20431",
      guest: "Kumar Family",
      restaurant: "Sunset Bar & Grill",
      time: "May 19 · 8:00 PM",
      guests: "5 guests",
      status: "Confirmed",
    },
    {
      id: "TR-20412",
      guest: "Nimal Perera",
      restaurant: "Ocean Breeze Restaurant",
      time: "May 20 · 6:30 PM",
      guests: "3 guests",
      status: "Pending",
    },
  ];

  return (
    <div className="dining-management-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Dining Management</h1>
          <p>Manage hotel restaurants, menus, and table reservations.</p>
        </div>

        <button className="partner-small-button">+ Add Restaurant</button>
      </div>

      <section className="partner-filter-bar rooms-filter-bar">
        <select>
          <option>All restaurants</option>
          <option>Open</option>
          <option>Closed</option>
        </select>

        <input type="text" placeholder="Search restaurants..." />
      </section>

      <section className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <img src={restaurant.image} alt={restaurant.name} />

            <div className="restaurant-info">
              <div className="summary-title-row">
                <div>
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.cuisine}</p>
                  <p>{restaurant.hours}</p>
                </div>

                <span className="table-status confirmed">{restaurant.status}</span>
              </div>

              <div className="event-action-row">
                <button className="view-action">Edit</button>
                <button className="confirm-action">Upload Menu</button>
                <button className="cancel-action-small">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="partner-table-card dining-table-card">
        <div className="table-header-row">
          <div>
            <h2>Table Reservations</h2>
            <p>Upcoming restaurant reservations from hotel guests.</p>
          </div>

          <button className="partner-small-button">+ Add Reservation</button>
        </div>

        <table className="partner-table">
          <thead>
            <tr>
              <th>Reservation ID</th>
              <th>Guest</th>
              <th>Restaurant</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.guest}</td>
                <td>{reservation.restaurant}</td>
                <td>{reservation.time}</td>
                <td>{reservation.guests}</td>
                <td>
                  <span
                    className={
                      reservation.status === "Confirmed"
                        ? "table-status confirmed"
                        : "table-status pending"
                    }
                  >
                    {reservation.status}
                  </span>
                </td>
                <td>
                  <div className="table-action-buttons">
                    <button className="view-action">View</button>
                    {reservation.status === "Pending" && (
                      <button className="confirm-action">Confirm</button>
                    )}
                    <button className="cancel-action-small">Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default DiningManagementPage;