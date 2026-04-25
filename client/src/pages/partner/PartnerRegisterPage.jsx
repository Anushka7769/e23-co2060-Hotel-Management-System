import { Link } from "react-router-dom";

function PartnerRegisterPage() {
  return (
    <div className="partner-register-page">
      <div className="breadcrumb">Partner / Register Your Property</div>

      <section className="partner-register-header">
        <h1>Register Your Property</h1>
        <p>Create your partner account and submit your hotel for admin approval.</p>
      </section>

      <div className="wizard-steps">
        <span className="active">1 Partner Account</span>
        <span>2 Hotel Info</span>
        <span>3 Contact & Location</span>
        <span>4 Room Setup</span>
        <span>5 Photos</span>
      </div>

      <form className="partner-register-form">
        <section className="form-section">
          <h2>Step 1: Partner Account</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter owner or manager name" />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="partner@example.com" />
            </div>
          </div>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+94 77 123 4567" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create password" />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Step 2: Hotel Information</h2>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Hotel Name</label>
              <input type="text" placeholder="Blue Ocean Resort" />
            </div>

            <div className="form-group">
              <label>Property Type</label>
              <select defaultValue="">
                <option value="" disabled>Select type</option>
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
              <input type="text" placeholder="Kandy" />
            </div>

            <div className="form-group">
              <label>District</label>
              <input type="text" placeholder="Kandy District" />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Hotel street address" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Write a short description about your hotel." />
          </div>
        </section>

        <section className="form-section">
          <h2>Step 3: Room Setup</h2>

          <div className="form-grid three-columns">
            <div className="form-group">
              <label>Room Type</label>
              <input type="text" placeholder="Standard Room" />
            </div>

            <div className="form-group">
              <label>Capacity</label>
              <input type="number" placeholder="2" />
            </div>

            <div className="form-group">
              <label>Price Per Night</label>
              <input type="number" placeholder="17950" />
            </div>
          </div>

          <div className="form-group">
            <label>Total Rooms</label>
            <input type="number" placeholder="10" />
          </div>
        </section>

        <section className="form-section">
          <h2>Step 4: Photos & Policies</h2>

          <div className="form-group">
            <label>Hotel Photos</label>
            <input type="file" multiple />
          </div>

          <div className="form-grid two-columns">
            <div className="form-group">
              <label>Check-in Time</label>
              <input type="time" />
            </div>

            <div className="form-group">
              <label>Check-out Time</label>
              <input type="time" />
            </div>
          </div>

          <div className="form-group">
            <label>Cancellation Policy</label>
            <textarea placeholder="Example: Free cancellation until 48 hours before check-in." />
          </div>
        </section>

        <div className="partner-register-actions">
          <Link to="/partner" className="secondary-action">
            Back
          </Link>

          <Link to="/partner/dashboard" className="partner-primary-button">
            Submit for Approval
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PartnerRegisterPage;