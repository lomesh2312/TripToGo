# 🌍 TripToGo – AI Powered Trip Planner

TripToGo is a full-stack AI-based travel planning web application that generates personalized trip itineraries using Google Gemini AI. Users can sign up, log in, plan trips based on preferences, and save their travel plans securely.

---

## 🚀 Live Demo

- 🌐 Frontend: https://triptogo-frontend.vercel.app  
- 🔗 Backend API: https://triptogo-backend-production.up.railway.app

---

## 📌 Features

### 🔐 Authentication System
- User Signup
- User Login
- JWT-based Authentication
- Protected Routes
- Password hashing using bcrypt

### 🤖 AI Trip Planner
- Generates personalized trip itineraries
- Uses Google Gemini AI API
- Custom trip preferences:
  - Destination
  - Number of days
  - Budget
  - Travel companions

### 🗂 Trip Management
- Save generated trip plans
- View trip details
- Secure trip storage per user
- Retrieve previous trips

### 🎨 Modern UI
- Responsive design
- Tailwind CSS styling
- Clean and minimal layout
- Protected dashboard routes

---

## 🛠 Tech Stack

### 💻 Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React Icons

### 🖥 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- Google Generative AI (Gemini API)
- dotenv
- CORS

### ☁ Deployment
- Frontend: Vercel
- Backend: Railway 
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
TripToGo/
│
├── frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── contexts/
│   │   └── types/
│
├── backend (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── config/
```

---

## 🧑‍💻 User Input

Users provide:

- 📍 Destination (location)
- 📅 Number of days
- 💰 Budget type (low / standard / luxury)
- 👨‍👩‍👧 Travel with (alone / friends / family / partner)

---

## 📤 Output

- AI-generated detailed trip itinerary
- Day-wise travel plan
- Activities & recommendations
- Saved trip with unique Trip ID
- Trip details page

---

## 🔄 API Endpoints

### 🔐 Auth Routes
- `POST /api/auth/signup` → Register new user  
- `POST /api/auth/login` → Login user  

### ✈ Trip Routes (Protected)
- `POST /api/trips` → Generate and save new trip  
- `GET /api/trips/:id` → Get trip details  

---

## ⚙ Installation & Setup

### 1️⃣ Clone Repository
```
git clone https://github.com/lomesh2312/TripToGo.git
cd TripToGo
```

### 2️⃣ Setup Backend
```
cd backend
npm install
npm run dev
```

### 3️⃣ Setup Frontend
```
cd ..
npm install
npm run dev
```

---

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes middleware
- User-specific trip data access

---

## 📈 Future Improvements

- Edit/Delete trips
- Trip sharing feature
- PDF itinerary export
- Hotel & flight integration APIs
- Map integration (Google Maps)
- User profile management

---
