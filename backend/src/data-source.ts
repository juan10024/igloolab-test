import 'dotenv/config';
import { DataSource } from "typeorm";
import { Product } from './entities/Product';

/**
 * TypeORM Data Source configuration.
 *
 * This configuration sets up the connection to the PostgreSQL database
 * using environment variables for security and flexibility.
 */
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    /**
     * synchronize: true should NOT be used in production.
     */
    synchronize: true,
    logging: false,
    entities: [Product],
    subscribers: [],
    migrations: [],
});