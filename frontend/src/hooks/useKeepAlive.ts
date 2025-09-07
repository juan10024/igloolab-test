import { useEffect } from 'react';

/**
 * Custom hook that makes a GET request to a backend endpoint
 * at a defined time interval to keep the service active.
 * @param {string} url - The full URL of the health check endpoint
 * @param {number} interval - The interval in milliseconds to execute requests.
 */
export const useKeepAlive = (url: string, interval = 45000) => { // 45 seconds by default

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        // Asynchronous function to make the call to the server.
        const pingServer = async () => {
            try {
                await fetch(url);
                // We don't need to process the response; we only care that the request is completed.
                console.log(`Keep-alive ping sent to ${url} at ${new Date().toLocaleTimeString()}`);
            } catch (error) {
                // Error handling in case the server doesn't respond.
                console.error('Keep-alive ping failed:', error);
            }
        };

        // Start ping immediately upon component installation.
        pingServer();

        // Set the interval for subsequent pings.
        intervalId = setInterval(pingServer, interval);

        // Cleanup function for the effect.
        // when the component is unmounted.
        return () => {
            clearInterval(intervalId);
        };

    }, [url, interval]); // The effect will be re-executed if the URL or interval changes.
};
