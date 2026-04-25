function ManageListingsPage() {
  const reportedEvents = [
    {
      id: 1,
      title: "Free Wine Tasting",
      submittedBy: "Hotel User",
      reportedBy: "S. Kumar",
      reports: 3,
      status: "Fake Event",
    },
    {
      id: 2,
      title: "Yoga by the Beach",
      submittedBy: "Sunset Hotel",
      reportedBy: "A. Wijesinghe",
      reports: 1,
      status: "Needs Review",
    },
  ];

  const reportedReviews = [
    {
      id: 1,
      review:
        "Awful experience. This hotel should shut down. Dirty rooms, rude staff and the food made me sick.",
      user: "Roshini L.",
      hotel: "Blue Ocean Resort",
      date: "Apr 21, 2026",
      reports: 2,
    },
    {
      id: 2,
      review:
        "Great stay. This is the best hotel in town. You must book now. Such an amazing place!",
      user: "Nathan S.",
      hotel: "Kandy Lake View",
      date: "Apr 20, 2026",
      reports: 1,
    },
  ];

  return (
    <div className="manage-listings-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Manage Listings</h1>
          <p>Review reported events and user reviews for platform quality.</p>
        </div>

        <span className="table-status pending">2 New Reports</span>
      </div>

      <section className="partner-filter-bar rooms-filter-bar">
        <select>
          <option>New reports</option>
          <option>Resolved reports</option>
          <option>High risk reports</option>
        </select>

        <input type="text" placeholder="Search reports..." />
      </section>

      <section className="admin-panel-card listings-section">
        <div className="table-header-row">
          <div>
            <h2>Reported Events</h2>
            <p>Events reported by users or flagged by the system.</p>
          </div>
        </div>

        <table className="partner-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Submitted By</th>
              <th>Reported By</th>
              <th>Reports</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reportedEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.submittedBy}</td>
                <td>{event.reportedBy}</td>
                <td>{event.reports}</td>
                <td>
                  <span className="table-status pending">{event.status}</span>
                </td>
                <td>
                  <div className="table-action-buttons">
                    <button className="view-action">View</button>
                    <button className="cancel-action-small">Remove</button>
                    <button className="confirm-action">Keep</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-panel-card listings-section">
        <div className="table-header-row">
          <div>
            <h2>Reported Reviews</h2>
            <p>Moderate reviews reported as fake, abusive, or misleading.</p>
          </div>
        </div>

        <div className="reported-review-list">
          {reportedReviews.map((review) => (
            <div className="reported-review-card" key={review.id}>
              <div>
                <h3>{review.hotel}</h3>
                <p className="review-meta">
                  {review.user} · {review.date} · Reports: {review.reports}
                </p>
                <p>{review.review}</p>
              </div>

              <div className="table-action-buttons">
                <button className="view-action">View</button>
                <button className="cancel-action-small">Remove</button>
                <button className="confirm-action">Keep</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ManageListingsPage;