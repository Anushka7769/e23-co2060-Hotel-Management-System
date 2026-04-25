import { Link, Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>🌴 TourismHub LK</div>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/hotels" style={styles.link}>Hotels</Link>
          <Link to="/events" style={styles.link}>Events</Link>
          <Link to="/transport" style={styles.link}>Transport</Link>
          <Link to="/partner" style={styles.link}>List your property</Link>
          <Link to="/account/bookings" style={styles.button}>My Account</Link>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  header: {
    height: "70px",
    padding: "0 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f766e",
  },
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#1f2937",
    fontWeight: "500",
  },
  button: {
    textDecoration: "none",
    background: "#2563eb",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: "600",
  },
  main: {
    padding: "0 40px 40px",
  },
};

export default PublicLayout;