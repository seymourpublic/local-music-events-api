# Local Music Events API

## 📌 Overview
This project is a **Local Music Events API** designed to help users **discover**, **organize**, and **participate** in local music events. The API allows for event creation, artist management, user authentication, social interactions, and real-time notifications.

## 🚀 Features
- **User Authentication (JWT & Refresh Tokens)**
- **Role-Based Access Control (Artist, Organizer, Attendee)**
- **Create, Update, Delete Events & Artists**
- **Follow Artists & Organizers**
- **RSVP to Events**
- **Real-Time Notifications (Socket.io)**
- **Event & Artist Search by Location & Genre**
- **User Dashboards & Profiles**
- **Secure API with Rate Limiting**

## 🏗️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT, Bcrypt.js, Refresh Tokens
- **Real-Time Updates:** Socket.io
- **File Storage:** Firedrop API (for profile pictures)
- **Deployment:** Docker, AWS/Vercel

## 📂 Folder Structure
```
📦 local-music-events-api
├── 📂 config         # Database & Environment Configurations
├── 📂 controllers    # API Route Controllers
├── 📂 middleware     # Authentication & Authorization Middleware
├── 📂 models         # Mongoose Models
├── 📂 routes         # Express Routes
├── 📂 utils          # Utility Functions (JWT, Email, etc.)
├── server.js        # Main Entry Point
├── .env             # Environment Variables
├── .gitignore       # Git Ignore File
├── README.md        # Project Documentation
```

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/local-music-events-api.git
cd local-music-events-api
```
### **2️⃣ Install Dependencies**
```bash
npm install
```
### **3️⃣ Configure Environment Variables**
Create a `.env` file and set the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/local-music-events
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```
### **4️⃣ Run the Server**
```bash
npm start  # Production Mode
npm run dev  # Development Mode (Nodemon)
```

## 🔐 Authentication & Authorization
- **User Roles:** `Artist`, `Organizer`, `Attendee`
- **Login & Register:**
```bash
POST /api/auth/register  # Create Account
POST /api/auth/login  # Login and get tokens
POST /api/auth/refresh-token  # Refresh Access Token
POST /api/auth/logout  # Logout
```
- **Protected Routes (Require Bearer Token)**:
```bash
GET /api/users/me  # Get Current User Profile
POST /api/events  # Create Event (Organizer Only)
```

## 📡 Real-Time Features (Socket.io)
- **User receives a real-time notification when followed**
- **Event organizers get live RSVP updates**
- **Socket.io handles real-time messaging and event updates**

## 📌 API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login user and get JWT |
| `POST` | `/api/auth/refresh-token` | Refresh access token |
| `GET` | `/api/users/:id` | Get user profile |
| `POST` | `/api/users/follow` | Follow a user |
| `POST` | `/api/events` | Create an event (Organizer Only) |
| `GET` | `/api/events` | Fetch all events |
| `GET` | `/api/artists` | Fetch all artists |
| `POST` | `/api/rsvp` | RSVP to an event |

## 📜 License
This project is licensed under the **MIT License**.

## 💡 Contributing
Feel free to submit a PR or open an issue if you find a bug or have feature suggestions!

## 📬 Contact
- **Author:** Naledi
- **Email:** naledisandamela@gmail.com
