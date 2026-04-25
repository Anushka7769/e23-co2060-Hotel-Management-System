function HotelApprovalPage() {
  const hotel = {
    name: "Blue Ocean Resort",
    owner: "R. Perera",
    email: "owner@blueocean.lk",
    phone: "+94 77 123 4567",
    submitted: "April 21, 2026",
    address: "123 Ocean Drive, Colombo, Sri Lanka",
    type: "Resort",
    rooms: 45,
    status: "Pending",
    description:
      "Blue Ocean Resort is a luxury beachfront property offering comfortable rooms, ocean views, restaurants, and event spaces for tourists.",
    amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Spa", "Parking"],
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    ],
  };

  return (
    <div className="hotel-approval-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Hotel Verification / Approval</h1>
          <p>Review hotel submissions and approve, reject, or verify listings.</p>
        </div>

        <span className="table-status pending">{hotel.status}</span>
      </div>

      <section className="approval-main-card">
        <div className="approval-title-row">
          <div>
            <h2>{hotel.name}</h2>
            <p>
              Submitted by {hotel.owner} · {hotel.submitted}
            </p>
          </div>

          <span className="table-status pending">Verification Pending</span>
        </div>

        <div className="approval-photo-grid">
          {hotel.photos.map((photo) => (
            <img src={photo} alt={hotel.name} key={photo} />
          ))}
        </div>

        <div className="approval-content-grid">
          <section className="approval-info-box">
            <h3>Hotel Details</h3>

            <div className="approval-line">
              <span>Type</span>
              <strong>{hotel.type}</strong>
            </div>

            <div className="approval-line">
              <span>Address</span>
              <strong>{hotel.address}</strong>
            </div>

            <div className="approval-line">
              <span>Total Rooms</span>
              <strong>{hotel.rooms}</strong>
            </div>

            <div className="approval-line">
              <span>Amenities</span>
              <strong>{hotel.amenities.join(", ")}</strong>
            </div>

            <div className="approval-description">
              <h4>Description</h4>
              <p>{hotel.description}</p>
            </div>
          </section>

          <section className="approval-info-box">
            <h3>Owner & Documents</h3>

            <div className="approval-line">
              <span>Owner</span>
              <strong>{hotel.owner}</strong>
            </div>

            <div className="approval-line">
              <span>Email</span>
              <strong>{hotel.email}</strong>
            </div>

            <div className="approval-line">
              <span>Phone</span>
              <strong>{hotel.phone}</strong>
            </div>

            <div className="document-list">
              <div className="document-item">
                <span>Hotel Business License</span>
                <button className="view-action">View</button>
              </div>

              <div className="document-item">
                <span>Ownership Document</span>
                <button className="view-action">View</button>
              </div>

              <div className="document-item">
                <span>Tax Registration</span>
                <button className="view-action">View</button>
              </div>
            </div>
          </section>
        </div>

        <section className="admin-review-section">
          <h3>Admin Review</h3>

          <label className="verify-checkbox">
            <input type="checkbox" /> Mark hotel as verified after approval
          </label>

          <textarea placeholder="Leave approval or rejection comments..." />

          <div className="approval-actions">
            <button className="approve-button">Approve Hotel</button>
            <button className="reject-button">Reject Hotel</button>
            <button className="secondary-action-button">Request More Info</button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default HotelApprovalPage;