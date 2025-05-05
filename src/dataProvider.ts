import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { getJWTToken } from './authProvider';
import outputs from "../amplify_outputs.json";

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
const backendUrl = 
    import.meta.env.VITE_AMPLIFY_ENV !== "" ||
    import.meta.env.VITE_AMPLIFY_SANDBOX ? outputs.custom.API.ExpressAPI.endpoint : import.meta.env.VITE_BACKEND_API_URL;

export default simpleRestProvider(backendUrl, httpClient, 'X-Total-Count');
