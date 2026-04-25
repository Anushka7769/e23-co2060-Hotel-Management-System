USE tourismhub_lk;

INSERT INTO users (full_name, email, phone, password_hash, role) VALUES
('Admin User', 'admin@tourismhub.lk', '+94 77 000 0000', 'demo_hash', 'admin'),
('R. Perera', 'partner@hotel.lk', '+94 77 123 4567', 'demo_hash', 'partner'),
('John Doe', 'john@example.com', '+94 71 234 5678', 'demo_hash', 'tourist');

INSERT INTO hotels (
  partner_id,
  name,
  city,
  district,
  address,
  description,
  property_type,
  status,
  is_verified
) VALUES (
  2,
  'Heeran Gardens House',
  'Kandy',
  'Kandy District',
  'Kandy Lake Area, Kandy',
  'A serene hotel experience in Sri Lanka with comfortable rooms, beautiful surroundings, helpful staff, and easy access to nearby attractions.',
  'Hotel',
  'approved',
  TRUE
);

INSERT INTO rooms (
  hotel_id,
  room_type,
  capacity,
  price_per_night,
  total_rooms,
  available_rooms
) VALUES
(1, 'Standard Room', 2, 17950.00, 10, 6),
(1, 'Deluxe Room', 2, 24450.00, 8, 4),
(1, 'Junior Suite', 3, 32900.00, 4, 2);

INSERT INTO bookings (
  tourist_id,
  hotel_id,
  room_id,
  check_in,
  check_out,
  guests,
  total_amount,
  payment_status,
  booking_status,
  booking_reference
) VALUES (
  3,
  1,
  1,
  '2026-05-18',
  '2026-05-19',
  2,
  35900.00,
  'pending',
  'confirmed',
  'TH25861473'
);