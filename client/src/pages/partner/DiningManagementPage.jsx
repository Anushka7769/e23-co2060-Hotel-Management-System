import { useEffect, useState } from "react";
import {
  fetchPartnerRestaurants,
  fetchPartnerTableReservations,
} from "../../services/partnerExtraApi";

function DiningManagementPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All restaurants");
  const [searchText, setSearchText] = useState("");
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDiningData() {
      try {
        const [restaurantResponse, reservationResponse] = await Promise.all([
          fetchPartnerRestaurants(1),
          fetchPartnerTableReservations(1),
        ]);

        const formattedRestaurants = restaurantResponse.data.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.name,
          cuisine: restaurant.cuisine,
          hours: `${formatTime(restaurant.opening_time)} - ${formatTime(
            restaurant.closing_time
          )}`,
          status: restaurant.status === "open" ? "Open" : "Closed",
          image: restaurant.image_url,
        }));

        const formattedReservations = reservationResponse.data.map((reservation) => ({
          id: `TR-${reservation.id.toString().padStart(5, "0")}`,
          guest: reservation.guest_name,
          restaurant: reservation.restaurant_name,
          time: `${formatDate(reservation.reservation_date)} · ${formatTime(
            reservation.reservation_time
          )}`,
          guests: `${reservation.guests} guests`,
          status: formatStatus(reservation.status),
        }));

        setRestaurants(formattedRestaurants);
        setFilteredRestaurants(formattedRestaurants);
        setReservations(formattedReservations);
      } catch (err) {
        setError("Could not load dining data from backend.");
      } finally {
        setLoadingRestaurants(false);
        setLoadingReservations(false);
      }
    }

    loadDiningData();
  }, []);

  useEffect(() => {
    let updatedRestaurants = [...restaurants];

    if (statusFilter !== "All restaurants") {
      updatedRestaurants = updatedRestaurants.filter(
        (restaurant) => restaurant.status === statusFilter
      );
    }

    if (searchText.trim() !== "") {
      updatedRestaurants = updatedRestaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredRestaurants(updatedRestaurants);
  }, [statusFilter, searchText, restaurants]);

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  function formatTime(timeValue) {
    if (!timeValue) {
      return "Time not set";
    }

    const [hours, minutes] = timeValue.split(":");
    const date = new Date();
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatStatus(status) {
    if (status === "confirmed") return "Confirmed";
    if (status === "cancelled") return "Cancelled";
    return "Pending";
  }

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
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All restaurants</option>
          <option>Open</option>
          <option>Closed</option>
        </select>

        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      {error && <p className="form-note">{error}</p>}
      {loadingRestaurants && <p>Loading restaurants...</p>}

      <section className="restaurant-list">
        {!loadingRestaurants &&
          filteredRestaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} />

              <div className="restaurant-info">
                <div className="summary-title-row">
                  <div>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.cuisine}</p>
                    <p>{restaurant.hours}</p>
                  </div>

                  <span
                    className={
                      restaurant.status === "Open"
                        ? "table-status confirmed"
                        : "table-status pending"
                    }
                  >
                    {restaurant.status}
                  </span>
                </div>

                <div className="event-action-row">
                  <button className="view-action">Edit</button>
                  <button className="confirm-action">Upload Menu</button>
                  <button className="cancel-action-small">Delete</button>
                </div>
              </div>
            </div>
          ))}

        {!loadingRestaurants && filteredRestaurants.length === 0 && (
          <p>No restaurants found.</p>
        )}
      </section>

      <section className="partner-table-card dining-table-card">
        <div className="table-header-row">
          <div>
            <h2>Table Reservations</h2>
            <p>Upcoming restaurant reservations from hotel guests.</p>
          </div>

          <button className="partner-small-button">+ Add Reservation</button>
        </div>

        {loadingReservations && <p>Loading table reservations...</p>}

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
            {!loadingReservations &&
              reservations.map((reservation) => (
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

        {!loadingReservations && reservations.length === 0 && (
          <p>No table reservations found.</p>
        )}
      </section>
    </div>
  );
}

export default DiningManagementPage;