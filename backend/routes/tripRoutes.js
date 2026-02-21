const express = require('express');
const router = express.Router();
const { createTrip, getTripById, getUserTrips } = require('../controllers/tripController');

router.post('/generate', createTrip);
router.get('/:id', getTripById);
router.get('/user/:userId', getUserTrips);

module.exports = router;
