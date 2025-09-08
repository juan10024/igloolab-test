/**
 * @fileoverview Main entry point for the Express application.
 * @module index
 * @requires reflect-metadata
 * @requires express
 * @requires cors
 * @requires dotenv
 * @requires ./data-source
 * @requires ./routes/product.routes
 * @requires ./routes/ping.router
 */

import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import productRoutes from './routes/product.routes';
import pingRouter from './routes/ping.router';

/**
 * The main server function.
 * Initializes the database connection, configures the Express server middlewares and routes,
 * and starts listening for incoming requests on the specified port.
 */
const main = async () => {
    // --- Database Initialization ---
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized successfully.");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1); // Exit process with a failure code.
    }

    const app = express();

    // --- Core Middlewares ---
    // Enable Cross-Origin Resource Sharing (CORS) for all origins.
    app.use(cors());
    // Parse incoming request bodies in JSON format.
    app.use(express.json());

    // --- Application Routes ---
    // Health check and keep-alive route, mounted at the root.
    app.use('/', pingRouter);
    // API-specific routes, prefixed with '/api'.
    app.use('/api/products', productRoutes);

    // --- Global Error Handling Middleware ---
    // This final middleware catches any unhandled errors from the routing pipeline.
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Unhandled Application Error:', err.stack);
        const isProduction = process.env.NODE_ENV === 'production';
        
        res.status(500).json({
            message: isProduction ? 'An unexpected server error occurred.' : err.message,
            stack: isProduction ? undefined : err.stack
        });
    });
    
    // --- Server Activation ---
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`);
    });
};

// Execute the main function to start the server.
main();