const { generateTripPlan } = require('../services/geminiService');
const { db } = require('../config/firebase');

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

        // Save to Firebase (if db is initialized)
        // Note: This relies on proper Firebase setup. If db is not connected, this might fail or we should skip.
        // required to handle the case where DB might not be fully configured yet by user.
        let tripId = 'temp-id-' + Date.now();

        try {
            if (db) {
                const docRef = await db.collection('trips').add({
                    user_id: tripDetails.userId || 'anonymous',
                    destination: tripDetails.location,
                    days: tripDetails.days,
                    budget: tripDetails.budget,
                    travel_with: tripDetails.travelWith || 'alone',
                    trip_plan: tripPlan,
                    created_at: new Date().toISOString(),
                    originalRequest: tripDetails
                });
                tripId = docRef.id;
                console.log("Trip saved to Firestore with ID:", tripId);
            } else {
                console.warn("Firestore not initialized, skipping save.");
            }
        } catch (dbError) {
            console.error("Error saving to Firestore:", dbError);
            // Continue to return the plan even if save fails, but maybe warn
        }

        res.status(201).json({ success: true, tripId, plan: tripPlan });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ error: 'Failed to generate trip plan', details: error.message });
    }
};

const getTripById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!db) {
            return res.status(503).json({ error: 'Database not initialized' });
        }

        const doc = await db.collection('trips').doc(id).get();
        if (!doc.exists) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Return data with ID included
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Error fetching trip:", error);
        res.status(500).json({ error: 'Failed to fetch trip' });
    }
};

const getUserTrips = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!db) {
            return res.status(503).json({ error: 'Database not initialized' });
        }

        const snapshot = await db.collection('trips')
            .where('user_id', '==', userId)
            // .orderBy('createdAt', 'desc') // Requires index in Firestore, might fail initially
            .get();

        const trips = [];
        snapshot.forEach(doc => {
            trips.push({ id: doc.id, ...doc.data() });
        });

        // Manual sort in memory to avoid index requirement for now
        trips.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(trips);
    } catch (error) {
        console.error("Error fetching user trips:", error);
        res.status(500).json({ error: 'Failed to fetch user trips' });
    }
};

module.exports = { createTrip, getTripById, getUserTrips };
