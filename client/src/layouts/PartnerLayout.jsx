import { Link, Outlet } from "react-router-dom";

function PartnerLayout() {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Partner Panel</h2>

        <Link to="/partner/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/partner/bookings" style={styles.link}>Bookings</Link>
        <Link to="/partner/rooms" style={styles.link}>Rooms & Pricing</Link>
        <Link to="/partner/content" style={styles.link}>Hotel Content</Link>
        <Link to="/partner/dining" style={styles.link}>Dining</Link>
        <Link to="/partner/events" style={styles.link}>Hotel Events</Link>
        <Link to="/" style={styles.backLink}>Back to Website</Link>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "250px",
    padding: "30px 20px",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  logo: {
    fontSize: "22px",
    marginBottom: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "8px",
    background: "#1e293b",
  },
  backLink: {
    color: "#93c5fd",
    textDecoration: "none",
    marginTop: "auto",
  },
  main: {
    flex: 1,
    padding: "40px",
    background: "#f8fafc",
  },
};

export default PartnerLayout;