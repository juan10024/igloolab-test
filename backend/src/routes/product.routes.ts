/**
 * @fileoverview This file contains the API routes for managing products.
 * @module routes/product.routes
 * @requires express
 * @requires ../controllers/product.controller
 */

import { Router } from 'express';
import {
    getProducts,
    createProduct,
    deleteProduct
} from '../controllers/product.controller';

/**
 * Express router to mount product-related functions.
 * @type {object}
 * @const
 */
const router = Router();

/**
 * Route serving the list of all products.
 * @name GET /
 * @function
 * @memberof module:routes/product.routes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', getProducts);

/**
 * Route to create a new product.
 * @name POST /
 * @function
 * @memberof module:routes/product.routes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/', createProduct);

/**
 * Route to delete a product by its ID.
 * @name DELETE /:id
 * @function
 * @memberof module:routes/product.routes
 * @inner
 * @param {string} path - Express path with a dynamic ID parameter.
 * @param {callback} middleware - Express middleware.
 */
router.delete('/:id', deleteProduct);

export default router;