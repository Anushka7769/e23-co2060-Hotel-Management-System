function HotelContentPage() {
  const photos = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
  ];

  return (
    <div className="hotel-content-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Hotel Content Management</h1>
          <p>Edit hotel profile content shown to tourists.</p>
        </div>

        <button className="partner-small-button">Save Changes</button>
      </div>

      <div className="content-management-layout">
        <section className="content-form-card">
          <h2>Basic Hotel Information</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Hotel Name</label>
              <input type="text" defaultValue="Heeran Gardens House" />
            </div>

            <div className="form-group">
              <label>Property Type</label>
              <select defaultValue="Hotel">
                <option>Hotel</option>
                <option>Resort</option>
                <option>Guesthouse</option>
                <option>Villa</option>
              </select>
            </div>
          </div>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>City</label>
              <input type="text" defaultValue="Kandy" />
            </div>

            <div className="form-group">
              <label>District</label>
              <input type="text" defaultValue="Kandy District" />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" defaultValue="Kandy Lake Area, Kandy" />
          </div>

          <div className="form-group">
            <label>Hotel Description</label>
            <textarea defaultValue="A serene hotel experience in Sri Lanka with comfortable rooms, beautiful surroundings, helpful staff, and easy access to nearby attractions." />
          </div>
        </section>

        <section className="content-form-card">
          <h2>Facilities</h2>

          <div className="facility-checkbox-grid">
            <label><input type="checkbox" defaultChecked /> Free Wi-Fi</label>
            <label><input type="checkbox" defaultChecked /> Breakfast included</label>
            <label><input type="checkbox" defaultChecked /> Pool</label>
            <label><input type="checkbox" /> Parking</label>
            <label><input type="checkbox" defaultChecked /> Restaurant</label>
            <label><input type="checkbox" /> Spa</label>
            <label><input type="checkbox" defaultChecked /> Air conditioning</label>
            <label><input type="checkbox" /> Airport shuttle</label>
          </div>
        </section>

        <section className="content-form-card">
          <h2>Policies</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Check-in Time</label>
              <input type="time" defaultValue="14:00" />
            </div>

            <div className="form-group">
              <label>Check-out Time</label>
              <input type="time" defaultValue="11:00" />
            </div>
          </div>

          <div className="form-group">
            <label>Cancellation Policy</label>
            <textarea defaultValue="Free cancellation until 48 hours before check-in. After that, one night charge may apply." />
          </div>

          <div className="form-group">
            <label>House Rules</label>
            <textarea defaultValue="No smoking inside rooms. Pets are not allowed. Guests must show valid identification at check-in." />
          </div>
        </section>

        <section className="content-form-card">
          <h2>Contact Information</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" defaultValue="contact@heerangardens.lk" />
            </div>

            <div className="form-group">
              <label>Contact Phone</label>
              <input type="text" defaultValue="+94 77 123 4567" />
            </div>
          </div>
        </section>
      </div>

      <section className="photo-management-card">
        <div className="table-header-row">
          <div>
            <h2>Hotel Photos</h2>
            <p>Manage images shown on the hotel details page.</p>
          </div>

          <button className="partner-small-button">Upload Photos</button>
        </div>

        <div className="hotel-photo-grid">
          {photos.map((photo) => (
            <div className="hotel-photo-card" key={photo}>
              <img src={photo} alt="Hotel preview" />
              <div className="photo-actions">
                <button className="view-action">Set Cover</button>
                <button className="cancel-action-small">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HotelContentPage;