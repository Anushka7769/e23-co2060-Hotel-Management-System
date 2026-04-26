import API_BASE_URL from "./api";

export async function fetchAdminDashboard() {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin dashboard");
  }

  return response.json();
}

export async function fetchAdminHotels() {
  const response = await fetch(`${API_BASE_URL}/admin/hotels`);

  if (!response.ok) {
    throw new Error("Failed to fetch admin hotels");
  }

  return response.json();
}

export async function fetchPendingHotels() {
  const response = await fetch(`${API_BASE_URL}/admin/hotels/pending`);

  if (!response.ok) {
    throw new Error("Failed to fetch pending hotels");
  }

  return response.json();
}

export async function approveHotel(hotelId) {
  const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}/approve`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to approve hotel");
  }

  return response.json();
}

export async function rejectHotel(hotelId) {
  const response = await fetch(`${API_BASE_URL}/admin/hotels/${hotelId}/reject`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to reject hotel");
  }

  return response.json();
}