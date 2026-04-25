CREATE DATABASE IF NOT EXISTS tourismhub_lk;
USE tourismhub_lk;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('tourist', 'partner', 'admin') NOT NULL DEFAULT 'tourist',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partner_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100),
  address VARCHAR(255),
  description TEXT,
  property_type ENUM('Hotel', 'Resort', 'Guesthouse', 'Villa') DEFAULT 'Hotel',
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (partner_id) REFERENCES users(id)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT NOT NULL,
  room_type VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  total_rooms INT NOT NULL DEFAULT 1,
  available_rooms INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tourist_id INT NOT NULL,
  hotel_id INT NOT NULL,
  room_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status ENUM('pending', 'paid') DEFAULT 'pending',
  booking_status ENUM('confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
  booking_reference VARCHAR(30) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tourist_id) REFERENCES users(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);