const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/trips', tripRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('TripToGo Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
