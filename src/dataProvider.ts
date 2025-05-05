import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { getJWTToken } from './authProvider';

const httpClient = async (url: string, options: RequestInit = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    } else if (!(options.headers instanceof Headers)) {
        options.headers = new Headers(options.headers);
    }

    try {
        const token = await getJWTToken();
        options.headers.set('Authorization', `Bearer ${token}`);
    } catch (error) {
        console.error('Failed to get JWT token', error);
    }

    return fetchUtils.fetchJson(url, options);
};

export default simpleRestProvider(import.meta.env.VITE_BACKEND_API_URL, httpClient);
