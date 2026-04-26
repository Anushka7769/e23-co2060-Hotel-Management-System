import { useEffect, useState } from "react";
import { fetchPartnerEvents } from "../../services/partnerExtraApi";

function HotelEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All events");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetchPartnerEvents(1);

        const formattedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          date: formatDate(event.event_date),
          time: formatTime(event.event_time),
          description: event.description,
          status: event.status === "published" ? "Published" : "Unpublished",
          image: event.image_url,
        }));

        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (err) {
        setError("Could not load hotel events from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  useEffect(() => {
    let updatedEvents = [...events];

    if (statusFilter !== "All events") {
      updatedEvents = updatedEvents.filter(
        (event) => event.status === statusFilter
      );
    }

    if (searchText.trim() !== "") {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredEvents(updatedEvents);
  }, [statusFilter, searchText, events]);

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
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

  return (
    <div className="hotel-events-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Hotel Events Management</h1>
          <p>Create, edit, publish, and unpublish hotel events and activities.</p>
        </div>

        <button className="partner-small-button">+ Create Event</button>
      </div>

      <section className="partner-filter-bar rooms-filter-bar">
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All events</option>
          <option>Published</option>
          <option>Unpublished</option>
        </select>

        <input
          type="text"
          placeholder="Search events..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      {loading && <p>Loading hotel events...</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="event-management-list">
        {!loading && filteredEvents.map((event) => (
          <div className="partner-event-card" key={event.id}>
            <img src={event.image} alt={event.title} />

            <div className="partner-event-info">
              <div className="summary-title-row">
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.date} · {event.time}</p>
                </div>

                <span
                  className={
                    event.status === "Published"
                      ? "table-status confirmed"
                      : "table-status pending"
                  }
                >
                  {event.status}
                </span>
              </div>

              <p>{event.description}</p>

              <div className="event-action-row">
                <button className="view-action">Edit</button>
                <button className="confirm-action">
                  {event.status === "Published" ? "Unpublish" : "Publish"}
                </button>
                <button className="cancel-action-small">Delete</button>
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredEvents.length === 0 && (
          <p>No hotel events found.</p>
        )}
      </section>

      <section className="room-management-cards">
        <div className="management-card">
          <h3>Upcoming Hotel Activities</h3>
          <p>Promote dining nights, cultural events, pool parties, and hotel experiences.</p>
          <button className="partner-small-button">View Calendar</button>
        </div>

        <div className="management-card">
          <h3>Event Visibility</h3>
          <p>Published events can appear on the tourist Events & Experiences page after approval.</p>
          <button className="partner-small-button">Check Status</button>
        </div>
      </section>
    </div>
  );
}

export default HotelEventsPage;