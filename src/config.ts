/**
 * Central configuration for the API base URL.
 * Handles production fallbacks to prevent localhost issues in deployed environments.
 */

const getApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    const productionUrl = 'https://triptogo-backend-production.up.railway.app';

    // If we're in a production-like environment (Vercel) but VITE_API_URL is missing or points to localhost
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        if (!envUrl || envUrl.includes('localhost')) {
            return productionUrl;
        }
    }

    return envUrl || productionUrl;
};

export const API_BASE_URL = getApiBaseUrl();
