import API_BASE_URL from "./api";

export async function fetchPartnerEvents(hotelId = 1) {
  const response = await fetch(`${API_BASE_URL}/partner/events/${hotelId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch partner events");
  }

  return response.json();
}

export async function fetchPartnerRestaurants(hotelId = 1) {
  const response = await fetch(`${API_BASE_URL}/partner/dining/restaurants/${hotelId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch partner restaurants");
  }

  return response.json();
}

export async function fetchPartnerTableReservations(hotelId = 1) {
  const response = await fetch(`${API_BASE_URL}/partner/dining/table-reservations/${hotelId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch table reservations");
  }

  return response.json();
}

export async function fetchAdminComplaints() {
  const response = await fetch(`${API_BASE_URL}/admin/complaints`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin complaints");
  }

  return response.json();
}