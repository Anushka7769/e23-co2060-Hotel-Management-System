import { Link } from "react-router-dom";

function AdminLoginPage() {
  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">🌴 TourismHub LK</div>

        <h1>Admin Login</h1>
        <p>Secure access for platform administrators.</p>

        <form className="admin-login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="admin@tourismhub.lk" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <Link to="/admin/dashboard" className="admin-login-button">
            Sign In
          </Link>
        </form>

        <div className="admin-login-footer">
          Need help? Contact support@tourismhub.lk
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;