const express = require('express');
const router = express.Router();
const { createTrip, getTripById, getUserTrips } = require('../controllers/tripController');
const { protect } = require('../middleware/auth');

router.post('/generate', protect, createTrip);
router.get('/:id', protect, getTripById);
router.get('/user/:userId', protect, getUserTrips);

module.exports = router;
