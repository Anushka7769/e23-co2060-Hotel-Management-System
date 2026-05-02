# TourismHub LK  
## Smart Hotel & Tourism Management System

TourismHub LK is a **mobile-responsive web-based platform** designed to improve the tourism experience in Sri Lanka by connecting **tourists**, **hotel partners** and **administrators** in one integrated system.

The platform allows tourists to search and book hotels, compare options, explore nearby events and experiences and manage their bookings. Hotel partners can register and manage their hotel listings, rooms, pricing and bookings through a dedicated dashboard. Administrators can approve hotels, verify listings and moderate content to maintain platform trust and quality.

---

## Project Overview

Sri Lanka’s tourism sector is an important part of the national economy. However, many tourism services such as hotel booking, local event discovery and service coordination are still fragmented across different platforms. This leads to wasted time for tourists and management difficulties for hotel owners.

**TourismHub LK** is proposed as a centralized digital solution to simplify hotel discovery, booking, hotel management and tourism-related experiences.

---

## Main Objectives

- Build a mobile-responsive hotel search and booking platform for Sri Lanka
- Allow hotel partners to register and manage their hotel information
- Provide an admin verification process to improve trust and authenticity
- Help tourists save time by combining hotel booking and local experiences
- Maintain booking consistency and reduce double-booking risks

---

## Main Users

### 1. Tourist / User
- Register and log in
- Search hotels by destination or hotel name
- Filter and compare hotel results
- View hotel details and room availability
- Book rooms and choose payment option
- View upcoming and past bookings
- Explore events and experiences near hotels

### 2. Hotel Partner
- Register hotel property
- Manage rooms, pricing and hotel content
- View and manage customer bookings
- Add hotel-related events
- Access partner dashboard analytics

### 3. Admin
- Review hotel submissions
- Approve or reject hotels
- Mark hotels as verified
- Moderate reviews, events and complaints
- Maintain system trust and quality

---

## Key Features

- User authentication and role-based access
- Hotel search and filtering
- Hotel details and room availability
- Booking management
- Partner hotel management dashboard
- Admin approval and verification system
- Events and experiences module
- Responsive design for desktop and mobile devices

---

## Technology Stack

### Frontend
- React

### Backend
- Node.js
- Express.js

### Database
- MySQL Community Edition

### Authentication & Security
- JWT (JSON Web Token)
- bcrypt

### Development Tools
- Git & GitHub
- VS Code
- Postman
- Nodemon
- ESLint
- Prettier

---

## Why We Chose This Stack

- **React** helps build reusable and dynamic user interfaces.
- **Node.js + Express** allows us to create a modular REST API backend efficiently.
- **MySQL** is suitable because our system contains strongly related data such as hotels, rooms, bookings, users and reviews.
- **JWT** supports stateless authentication for protected routes.
- **bcrypt** secures user passwords through hashing.

---

## Project Scope

### In Scope
- Tourist registration and login
- Hotel search, filtering, and booking
- Hotel partner registration and dashboard
- Admin login and hotel approval
- Events & experiences browsing
- Basic booking and payment selection flow

### Out of Scope (MVP)
- Real payment gateway integration
- Full transport booking
- Advanced AI recommendation engine
- OTA channel synchronization
- Complex refund automation

---

## Repository Structure

```bash
e23-co2060-Hotel-Management-System/
│
├── code/
│   ├── client/        # React frontend
│   ├── server/        # Node.js + Express backend
│   └── database/      # SQL schema, seed data, DB scripts
│
├── docs/              # Project reports, diagrams, documentation
└── README.md
