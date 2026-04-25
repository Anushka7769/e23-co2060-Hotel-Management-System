import { Link } from "react-router-dom";

function PartnerLandingPage() {
  return (
    <div className="partner-landing-page">
      <section className="partner-hero">
        <div className="partner-hero-content">
          <h1>Partner with TourismHub LK</h1>
          <p>
            List your hotel, guesthouse, resort, or unique property with Sri Lanka’s
            tourism platform and reach more travelers.
          </p>

          <div className="partner-hero-actions">
            <Link to="/partner/register" className="partner-primary-button">
              Register Your Property
            </Link>
            <Link to="/partner/dashboard" className="partner-secondary-button">
              Partner Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="partner-section">
        <h2>Why list with TourismHub LK?</h2>

        <div className="partner-benefit-grid">
          <div className="partner-benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>Grow Your Business</h3>
            <p>Get more bookings and improve your hotel occupancy.</p>
          </div>

          <div className="partner-benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Reach More Travelers</h3>
            <p>Connect with local and foreign tourists exploring Sri Lanka.</p>
          </div>

          <div className="partner-benefit-card">
            <div className="benefit-icon">🛎️</div>
            <h3>Easy Management</h3>
            <p>Manage rooms, pricing, bookings, and hotel content in one place.</p>
          </div>

          <div className="partner-benefit-card">
            <div className="benefit-icon">⭐</div>
            <h3>Build Trust</h3>
            <p>Admin verification helps your hotel appear trusted to tourists.</p>
          </div>
        </div>
      </section>

      <section className="partner-cta-card">
        <h2>Ready to join TourismHub LK?</h2>
        <p>Start by creating your partner account and submitting your hotel details.</p>
        <Link to="/partner/register" className="partner-primary-button">
          Register Your Property
        </Link>
      </section>
    </div>
  );
}

export default PartnerLandingPage;