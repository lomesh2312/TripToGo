const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        destination: {
            type: String,
            required: true,
        },
        days: {
            type: Number,
            required: true,
        },
        budget: {
            type: String,
            required: true,
        },
        travel_with: {
            type: String,
            required: true,
        },
        trip_plan: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        originalRequest: {
            type: mongoose.Schema.Types.Mixed,
        },
    },
    { timestamps: true }
);

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
