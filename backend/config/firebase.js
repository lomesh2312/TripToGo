const admin = require('firebase-admin');
require('dotenv').config();

// Check if GOOGLE_APPLICATION_CREDENTIALS is set automatically by the environment
// or manually initialize if using specific credentials in .env distinct from standard Google Auth
// For this setup, we'll assume the user might provide the path in .env or we initialize with default if available.

try {
    const serviceAccountContent = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (serviceAccountContent) {
        // If the variable starts with '{', it's the JSON content
        const serviceAccount = serviceAccountContent.startsWith('{')
            ? JSON.parse(serviceAccountContent)
            : serviceAccountContent;

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin Initialized from Environment Variable');
    } else {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log('Firebase Admin Initialized from Application Default');
    }
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
