const { generateTripPlan } = require('../services/geminiService');
const Trip = require('../models/Trip');

const createTrip = async (req, res) => {
    try {
        const tripDetails = req.body;

        // Basic validation
        if (!tripDetails.location || !tripDetails.days) {
            return res.status(400).json({ error: 'Location and days are required' });
        }

        console.log("Generating trip for:", tripDetails);

        // Call Gemini API
        const tripPlan = await generateTripPlan(tripDetails);

        // Save to MongoDB
        const trip = new Trip({
            user: req.user._id, // Assuming protected route sets req.user
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
        console.error("Controller Error:", error);
        res.status(500).json({ error: 'Failed to generate trip plan', details: error.message });
    }
};

const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Return data ensuring ID is properly formatted strings usually expected by frontend
        res.json({ id: trip._id, ...trip._doc });
    } catch (error) {
        console.error("Error fetching trip:", error);
        res.status(500).json({ error: 'Failed to fetch trip' });
    }
};

const getUserTrips = async (req, res) => {
    try {
        // Only return trips belonging to the authenticated user
        const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });

        const formattedTrips = trips.map(trip => ({
            id: trip._id,
            ...trip._doc
        }));

        res.json(formattedTrips);
    } catch (error) {
        console.error("Error fetching user trips:", error);
        res.status(500).json({ error: 'Failed to fetch user trips' });
    }
};

module.exports = { createTrip, getTripById, getUserTrips };
