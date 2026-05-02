# TourismHub LK - Smart Hotel and Tourism Management System

TourismHub LK is a smart hotel and tourism management system developed as a semester project. The system supports tourist hotel booking, partner hotel management, and admin platform management using a React frontend, Express backend, and MySQL database.

## Project Overview

This project is designed to help tourists search hotels, view room availability, create bookings, choose payment options, and manage their reservations. Hotel partners can view bookings, manage rooms, dining, and events. Admin users can monitor platform activity, review hotel listings, manage complaints, and handle hotel approval workflows.

## Main User Roles

### Tourist

Tourists can:

- View hotels
- View hotel details
- Check room availability
- Submit booking details
- Choose payment method
- Receive booking confirmation
- View bookings in My Bookings page

### Partner

Hotel partners can:

- View partner dashboard statistics
- View hotel bookings
- Manage rooms and pricing
- Manage dining/restaurants
- Manage table reservations
- Manage hotel events

### Admin

Admins can:

- View admin dashboard statistics
- Review hotel approval information
- Approve or reject hotel listings
- Manage hotel listings
- View and filter complaints/reports

## Technologies Used

### Frontend

- React
- React Router
- CSS
- Vite

### Backend

- Node.js
- Express.js
- CORS
- dotenv
- mysql2

### Database

- MySQL
- MySQL Workbench

### Version Control

- Git
- GitHub

## Project Structure

```text
TourismHub-LK/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── partner/
│   │   │   └── public/
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── .env.example
│   └── package.json
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
├── README.md
└── .gitignore
