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
### **User Roles:** `Artist`, `Organizer`, `Attendee`

### **Authentication Routes**
#### **Register User**
**Endpoint:** `POST /api/auth/register`
**Request Body:**
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "role": "organizer"
}
```

#### **Login User**
**Endpoint:** `POST /api/auth/login`
**Request Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

#### **Refresh Token**
**Endpoint:** `POST /api/auth/refresh-token`

#### **Logout**
**Endpoint:** `POST /api/auth/logout`

## 📌 API Routes & Structure
### **User Management**
#### **Get All Users**
**Endpoint:** `GET /api/users`

#### **Get User Profile**
**Endpoint:** `GET /api/users/:id`

#### **Follow a User**
**Endpoint:** `POST /api/users/follow`
**Request Body:**
```json
{
    "userId": "65cfd7a8b25a4e4a7c123456", 
    "followerId": "65cfd7a8b25a4e4a7c987654"
}
```

### **Event Management**
#### **Create an Event**
**Endpoint:** `POST /api/events`
**Request Body:**
```json
{
    "name": "Live Rock Show",
    "date_time": "2025-06-15T19:00:00Z",
    "venue_id": "65cfd7a8b25a4e4a7c123456",
    "genre_id": "65cfd7a8b25a4e4a7c654321",
    "ticket_price": 20.00
}
```

#### **Get All Events**
**Endpoint:** `GET /api/events`

#### **RSVP to an Event**
**Endpoint:** `POST /api/rsvp`
**Request Body:**
```json
{
    "event_id": "65cfd7a8b25a4e4a7c567890",
    "user_id": "65cfd7a8b25a4e4a7c123456",
    "status": "Going"
}
```

### **Artist Management**
#### **Get All Artists**
**Endpoint:** `GET /api/artists`

#### **Create an Artist Profile**
**Endpoint:** `POST /api/artists`
**Request Body:**
```json
{
    "name": "The Indie Band",
    "bio": "A group of indie musicians performing across the country.",
    "genre_id": "65cfd7a8b25a4e4a7c654321",
    "user_id": "65cfd7a8b25a4e4a7c987654"
}
```

## 📜 License
This project is licensed under the **MIT License**.

## 💡 Contributing
Feel free to submit a PR or open an issue if you find a bug or have feature suggestions!

## 📬 Contact
- **Author:** Naledi
- **Email:** Naledisandamela@gmail.com
