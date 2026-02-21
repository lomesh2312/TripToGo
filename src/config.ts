/**
 * Central configuration for the API base URL.
 * Handles production fallbacks to prevent localhost issues in deployed environments.
 */

const getApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    const productionUrl = 'https://triptogo-backend-production.up.railway.app';
    const localUrl = 'http://localhost:5001';

    // If we're in a production-like environment
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        if (!envUrl || envUrl.includes('localhost')) {
            return productionUrl;
        }
        return envUrl;
    }

    // Local environment
    return envUrl || localUrl;
};

export const API_BASE_URL = getApiBaseUrl();
