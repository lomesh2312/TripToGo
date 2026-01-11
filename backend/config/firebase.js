const admin = require('firebase-admin');
require('dotenv').config();

// Check if GOOGLE_APPLICATION_CREDENTIALS is set automatically by the environment
// or manually initialize if using specific credentials in .env distinct from standard Google Auth
// For this setup, we'll assume the user might provide the path in .env or we initialize with default if available.

try {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
        // This looks for GOOGLE_APPLICATION_CREDENTIALS env var
    });
    console.log('Firebase Admin Initialized');
} catch (error) {
    console.warn('Firebase Admin Initialization Warning: Failed to initialize. DB features will not work until credentials are provided.');
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
