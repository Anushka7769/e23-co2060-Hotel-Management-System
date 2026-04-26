const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function fetchBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch bookings");
  }

  return data;
}

export async function createBooking(bookingData) {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data;
}

export async function getBookingsByTouristId(touristId) {
  const response = await fetch(`${API_BASE_URL}/bookings/user/${touristId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tourist bookings");
  }

  return data;
}

export async function getBookingByReference(bookingRef) {
  const response = await fetch(`${API_BASE_URL}/bookings/reference/${bookingRef}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch booking by reference");
  }

  return data;
}