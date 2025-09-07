import 'dotenv/config';
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";

// Function to create a robust DataSource configuration
const getDataSourceOptions = () => {
    // Render and other platforms provide a single DATABASE_URL
    if (process.env.DATABASE_URL) {
        return {
            type: "postgres" as const,
            url: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false, // Required for Render's managed PostgreSQL
            },
            synchronize: true, // Cautious with this in production
            logging: false,
            entities: [Product],
        };
    }

    // Local development configuration using individual .env variables
    const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'];
    for (const varName of requiredEnvVars) {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is missing for local setup.`);
        }
    }

    return {
        type: "postgres" as const,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: false,
        entities: [Product],
    };
};

/**
 * TypeORM Data Source configuration.
 * Adapts to both production (DATABASE_URL) and local development environments.
 */
export const AppDataSource = new DataSource(getDataSourceOptions());