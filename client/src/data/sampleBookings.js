import sampleHotels from "./sampleHotels";
import sampleRooms from "./sampleRooms";

const sampleBookings = [
  {
    id: 1,
    bookingRef: "TH25861473",
    hotel: sampleHotels[0],
    room: sampleRooms[0],
    dates: "May 18 - May 19",
    guests: "2 adults · 1 room",
    total: 35900,
    status: "Upcoming",
    paymentStatus: "Pending Payment",
  },
  {
    id: 2,
    bookingRef: "TH25861474",
    hotel: sampleHotels[0],
    room: sampleRooms[1],
    dates: "May 25 - May 26",
    guests: "2 adults · 1 room",
    total: 48900,
    status: "Past",
    paymentStatus: "Paid",
  },
];

export default sampleBookings;