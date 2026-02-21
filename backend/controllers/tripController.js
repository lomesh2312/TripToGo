const { generateTripPlan } = require('../services/geminiService');
const Trip = require('../models/Trip');

const createTrip = async (req, res) => {
    try {
        const tripDetails = req.body;

        if (!tripDetails.location || !tripDetails.days) {
            return res.status(400).json({ error: 'Location and days are required' });
        }

        const tripPlan = await generateTripPlan(tripDetails);

        const trip = new Trip({
            user: req.user._id,
            destination: tripDetails.location,
            days: tripDetails.days,
            budget: tripDetails.budget || 'standard',
            travel_with: tripDetails.travelWith || 'alone',
            trip_plan: tripPlan,
            originalRequest: tripDetails
        });

        const createdTrip = await trip.save();
        res.status(201).json({ success: true, tripId: createdTrip._id, plan: tripPlan });

    } catch (error) {
        console.error("Trip creation failure:", error);
        res.status(500).json({ error: 'Request failed', details: error.message });
    }
};

const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json({ id: trip._id, ...trip._doc });
    } catch (error) {
        res.status(500).json({ error: 'Fetch failed' });
    }
};

const getUserTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
        const formatted = trips.map(t => ({ id: t._id, ...t._doc }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: 'Fetch failed' });
    }
};

module.exports = { createTrip, getTripById, getUserTrips };
