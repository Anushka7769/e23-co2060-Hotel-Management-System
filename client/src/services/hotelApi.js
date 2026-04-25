import { apiGet } from "./api";

export function fetchHotels() {
  return apiGet("/hotels");
}

export function fetchHotelById(id) {
  return apiGet(`/hotels/${id}`);
}

export function fetchHotelRooms(hotelId) {
  return apiGet(`/hotels/${hotelId}/rooms`);
}