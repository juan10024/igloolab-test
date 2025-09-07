import axios from 'axios';

// --- Environment Variable Setup ---
const apiUrl = import.meta.env.VITE_REACT_APP_URL;

/**
 * Axios instance configured to communicate with the backend API.
 * Centralizing this allows for easy configuration of headers (e.g., for authentication),
 * interceptors, and other middleware for all API requests.
 */
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;