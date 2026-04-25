import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Admin Panel</h2>

        <Link to="/admin/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/admin/hotels/1/approval" style={styles.link}>Hotel Approval</Link>
        <Link to="/admin/listings" style={styles.link}>Manage Listings</Link>
        <Link to="/admin/complaints" style={styles.link}>Complaints</Link>
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
    background: "#111827",
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
    background: "#1f2937",
  },
  backLink: {
    color: "#facc15",
    textDecoration: "none",
    marginTop: "auto",
  },
  main: {
    flex: 1,
    padding: "40px",
    background: "#f3f4f6",
  },
};

export default AdminLayout;