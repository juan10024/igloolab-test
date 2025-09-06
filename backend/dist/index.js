"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const data_source_1 = require("./data-source");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
/**
 * Main application function.
 * Initializes the database connection, configures the Express server,
 * and starts listening for incoming requests.
 */
const main = async () => {
    // Initialize database connection
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    }
    catch (err) {
        console.error("Error during Data Source initialization:", err);
        process.exit(1); // Exit process with failure
    }
    const app = (0, express_1.default)();
    // --- Middlewares ---
    // Enable Cross-Origin Resource Sharing for all routes
    app.use((0, cors_1.default)());
    // Enable the express.json middleware to parse JSON-formatted request bodies
    app.use(express_1.default.json());
    // --- Routes ---
    app.get('/api', (req, res) => {
        res.status(200).json({ message: 'API is running successfully!' });
    });
    app.use('/api/products', product_routes_1.default);
    // --- Error Handling Middleware ---
    // This middleware catches any errors that occur in the route handlers
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Something went wrong on the server.' });
    });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};
main();
//# sourceMappingURL=index.js.map