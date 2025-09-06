"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const Product_1 = require("./entities/Product");
/**
 * TypeORM Data Source configuration.
 *
 * This configuration sets up the connection to the PostgreSQL database
 * using environment variables for security and flexibility.
 */
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [Product_1.Product],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=data-source.js.map