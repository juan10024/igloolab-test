import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { AppDataSource } from './data-source'
import productRoutes from '../src/routes/product.routes';

/**
 * Main application function.
 * Initializes the database connection, configures the Express server,
 * and starts listening for incoming requests.
 */
const main = async () => {
    // Initialize database connection
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        process.exit(1); // Exit process with failure
    }

    const app = express();

    // --- Middlewares ---
    // Enable Cross-Origin Resource Sharing for all routes
    app.use(cors());
    // Enable the express.json middleware to parse JSON-formatted request bodies
    app.use(express.json());

    // --- Routes ---
    app.get('/api', (req, res) => {
        res.status(200).json({ message: 'API is running successfully!' });
    });
    app.use('/api/products', productRoutes);

    // --- Error Handling Middleware ---
    // This middleware catches any errors that occur in the route handlers
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Something went wrong on the server.' });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

main();