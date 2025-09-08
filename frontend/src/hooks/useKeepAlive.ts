/**
 * @fileoverview Custom React hook to keep a backend service alive.
 * @module useKeepAlive
 * @requires react
 */

import { useEffect } from 'react';

/**
 * A custom hook that periodically sends a GET request to a backend endpoint 
 * to prevent the service from becoming idle on free hosting platforms.
 *
 * @param {string} url - The full URL of the backend's health check or "ping" endpoint.
 * @param {number} [interval=45000] - The interval in milliseconds to send requests. 
 * Defaults to 45 seconds
 * @returns {void} This hook does not return a value.
 */
export const useKeepAlive = (url: string, interval = 45000): void => {

    useEffect(() => {
        // Validate that the provided URL is valid before proceeding.
        if (!url) {
            console.error('useKeepAlive: The provided URL is not valid.');
            return;
        }

        let intervalId: NodeJS.Timeout;

        /**
         * Asynchronously sends a fetch request to the server.
         * Designed to be robust and handle potential network errors.
         */
        const pingServer = async () => {
            try {
                await fetch(url, { method: 'GET', mode: 'no-cors' });
                
                // Log a success message to the console for easier debugging.
                console.log(`Keep-alive ping sent to ${url} at ${new Date().toLocaleTimeString()}`);

            } catch (error) {
                // Handle errors in case the server does not respond or a network issue occurs.
                console.error(`Keep-alive ping to ${url} failed:`, error);
            }
        };

        // Perform an initial ping immediately after the component mounts
        // to wake up the server as soon as possible.
        pingServer();

        // Set the interval for subsequent pings.
        intervalId = setInterval(pingServer, interval);

        return () => {
            clearInterval(intervalId);
        };

    }, [url, interval]); 
};