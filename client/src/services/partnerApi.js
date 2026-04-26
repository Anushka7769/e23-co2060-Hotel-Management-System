import API_BASE_URL from "./api";

export async function fetchPartnerDashboard(hotelId = 1) {
  const response = await fetch(`${API_BASE_URL}/partner/dashboard/${hotelId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch partner dashboard");
  }

  return response.json();
}

export async function fetchPartnerBookings(hotelId = 1) {
  const response = await fetch(`${API_BASE_URL}/partner/bookings/${hotelId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch partner bookings");
  }

  return response.json();
}

export async function fetchPartnerRooms(hotelId = 1) {
  const response = await fetch(`${API_BASE_URL}/partner/rooms/${hotelId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch partner rooms");
  }

  return response.json();
}