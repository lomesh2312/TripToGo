const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const tripRoutes = require('./routes/tripRoutes');
app.use('/api/trips', tripRoutes);

// Basic Health Check
app.get('/', (req, res) => {
    res.send('TripToGo Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
