const getBase = () => {
    const env = import.meta.env.VITE_API_URL;
    const prod = 'https://triptogo-backend-production.up.railway.app';
    const dev = 'http://localhost:5001';

    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
        return (!env || env.includes('localhost')) ? prod : env;
    }
    return env || dev;
};

export const API_BASE_URL = getBase();
