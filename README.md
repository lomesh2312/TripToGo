# 🌍 TripToGo

**TripToGo** is a custom travel planner that builds 3-day itineraries for any destination. It uses generative AI to suggest local landmarks, stays, and food options based on user preferences.

## 🚀 Deployed Links
- **Frontend**: [https://triptogo-frontend.vercel.app](https://triptogo-frontend.vercel.app)
- **Backend**: [https://triptogo-backend-production.up.railway.app](https://triptogo-backend-production.up.railway.app)

## ✨ Core Features
- **Smart Itineraries**: Daily schedule with landmarks, accommodation, and food.
- **Auth**: Secure sign-up/login with JWT.
- **Dashboard**: Track and view all your generated trips.
- **Clean Design**: Minimalist, responsive UI built for speed.

## 🛠️ Tech Stack
### Frontend
- React.js (Vite)
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js & Express
- MongoDB (Mongoose)
- Google Gemini API

## 🏁 Running Locally
1. Clone the repo.
2. Install dependencies in both root and `/backend` folders.
3. Set up `.env` with `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
4. Run `npm run dev` for frontend and `node server.js` for backend.
