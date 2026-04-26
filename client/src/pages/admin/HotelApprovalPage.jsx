import { useEffect, useState } from "react";
import {
  approveHotel,
  fetchAdminHotels,
  fetchPendingHotels,
  rejectHotel,
} from "../../services/adminApi";

const hotelPhotos = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
];

function HotelApprovalPage() {
  const [hotel, setHotel] = useState(null);
  const [verifiedAfterApproval, setVerifiedAfterApproval] = useState(true);
  const [reviewComment, setReviewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHotelForReview() {
      try {
        const pendingResponse = await fetchPendingHotels();

        if (pendingResponse.data.length > 0) {
          setHotel(formatHotel(pendingResponse.data[0]));
          return;
        }

        const allHotelsResponse = await fetchAdminHotels();

        if (allHotelsResponse.data.length > 0) {
          setHotel(formatHotel(allHotelsResponse.data[0]));
          setActionMessage(
            "No pending hotels found. Showing existing hotel record for review demo."
          );
        }
      } catch (err) {
        setError("Could not load hotel approval data from backend.");
      } finally {
        setLoading(false);
      }
    }

    loadHotelForReview();
  }, []);

  function formatHotel(item) {
    return {
      id: item.id,
      name: item.name,
      owner: item.partner_name,
      email: item.partner_email,
      phone: "Not available",
      submitted: formatDate(item.created_at),
      address: item.address,
      type: item.property_type,
      rooms: "Managed in Rooms table",
      status: formatStatus(item.status),
      description: item.description,
      amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Parking"],
      photos: hotelPhotos,
    };
  }

  function formatDate(dateValue) {
    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatStatus(status) {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending";
  }

  async function handleApprove() {
    if (!hotel) return;

    try {
      setActionMessage("");
      setError("");

      await approveHotel(hotel.id);

      setHotel((currentHotel) => ({
        ...currentHotel,
        status: "Approved",
      }));

      setActionMessage("Hotel approved successfully.");
    } catch (err) {
      setError("Could not approve hotel.");
    }
  }

  async function handleReject() {
    if (!hotel) return;

    try {
      setActionMessage("");
      setError("");

      await rejectHotel(hotel.id);

      setHotel((currentHotel) => ({
        ...currentHotel,
        status: "Rejected",
      }));

      setActionMessage("Hotel rejected successfully.");
    } catch (err) {
      setError("Could not reject hotel.");
    }
  }

  if (loading) {
    return (
      <div className="hotel-approval-page">
        <p>Loading hotel approval data...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="hotel-approval-page">
        <div className="dashboard-top-row">
          <div>
            <h1>Hotel Verification / Approval</h1>
            <p>No hotel records found for review.</p>
          </div>
        </div>

        {error && <p className="form-note">{error}</p>}
      </div>
    );
  }

  return (
    <div className="hotel-approval-page">
      <div className="dashboard-top-row">
        <div>
          <h1>Hotel Verification / Approval</h1>
          <p>Review hotel submissions and approve, reject, or verify listings.</p>
        </div>

        <span
          className={
            hotel.status === "Approved"
              ? "table-status confirmed"
              : hotel.status === "Rejected"
              ? "table-status cancelled"
              : "table-status pending"
          }
        >
          {hotel.status}
        </span>
      </div>

      {actionMessage && <p className="form-note">{actionMessage}</p>}
      {error && <p className="form-note">{error}</p>}

      <section className="approval-main-card">
        <div className="approval-title-row">
          <div>
            <h2>{hotel.name}</h2>
            <p>
              Submitted by {hotel.owner} · {hotel.submitted}
            </p>
          </div>

          <span
            className={
              hotel.status === "Approved"
                ? "table-status confirmed"
                : hotel.status === "Rejected"
                ? "table-status cancelled"
                : "table-status pending"
            }
          >
            {hotel.status === "Pending" ? "Verification Pending" : hotel.status}
          </span>
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
            <input
              type="checkbox"
              checked={verifiedAfterApproval}
              onChange={(event) => setVerifiedAfterApproval(event.target.checked)}
            />
            Mark hotel as verified after approval
          </label>

          <textarea
            placeholder="Leave approval or rejection comments..."
            value={reviewComment}
            onChange={(event) => setReviewComment(event.target.value)}
          />

          <div className="approval-actions">
            <button className="approve-button" onClick={handleApprove}>
              Approve Hotel
            </button>
            <button className="reject-button" onClick={handleReject}>
              Reject Hotel
            </button>
            <button className="secondary-action-button">Request More Info</button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default HotelApprovalPage;