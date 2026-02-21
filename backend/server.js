const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes);

// Basic Health Check
app.get('/', (req, res) => {
    res.send('TripToGo Backend is running! (v2 MongoDB deployed)');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
