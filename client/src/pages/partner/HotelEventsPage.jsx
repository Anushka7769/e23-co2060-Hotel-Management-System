function HotelEventsPage() {
  const events = [
    {
      id: 1,
      title: "Beach BBQ Night",
      date: "Fri, May 10, 2026",
      time: "7:00 PM",
      description: "Join us for a beach BBQ evening with grilled seafood, music, and cocktails.",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "Live Jazz Night",
      date: "Sat, May 18, 2026",
      time: "8:00 PM",
      description: "Enjoy relaxing live jazz music with dinner specials near the pool area.",
      status: "Unpublished",
      image:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "Traditional Sri Lankan Dinner",
      date: "Sun, May 26, 2026",
      time: "6:30 PM",
      description: "Experience authentic Sri Lankan food, cultural music, and local hospitality.",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
    },
  ];

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
        <select>
          <option>All events</option>
          <option>Published</option>
          <option>Unpublished</option>
        </select>

        <input type="text" placeholder="Search events..." />
      </section>

      <section className="event-management-list">
        {events.map((event) => (
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