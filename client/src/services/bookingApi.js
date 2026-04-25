import API_BASE_URL from "./api";

export async function createBooking(bookingData) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.json();
}

export async function fetchBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings`);

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
}

export async function fetchBookingById(id) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch booking details");
  }

  return response.json();
}