import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { validate, isNumberString } from 'class-validator';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

/**
 * Retrieves the repository for the Product entity.
 * This function includes a defensive check to initialize the data source if it hasn't been already.
 *
 * @best_practice In a production application, the DataSource should be initialized once
 * at the application's startup 
 * to ensure a stable connection pool is ready before any requests are handled.
 *
 * @returns {Promise<Repository<Product>>} A promise that resolves to the Product repository.
 * @throws {Error} Throws an error if the repository cannot be obtained.
 */

const getProductRepository = async (): Promise<Repository<Product>> => {
  try {
    if (!AppDataSource.isInitialized) {
      console.warn('DataSource was not initialized. Attempting to initialize now...');
      await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Product);
  } catch (error) {
    console.error('Failed to get Product repository:', error);
    // Re-throw the error to be caught by the global error handler or the controller's catch block.
    throw new Error('Database connection error.');
  }
};

/**
 * A simple input sanitizer to remove potentially harmful HTML/JS characters.
 * @param {string} input The string to sanitize.
 * @returns {string} The sanitized string.
 */
const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>?/gm, ''); // Removes HTML tags
};


// --- Controller Functions ---

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 * @param   {Request} _req - Express request object (unused).
 * @param   {Response} res - Express response object.
 * @returns {Promise<Response>} A JSON response with all products or an error message.
 */
export const getProducts = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const productRepository = await getProductRepository();
    const products = await productRepository.find();

    return res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    return res.status(500).json({ message: 'An unexpected error occurred on the server.' });
  }
};

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public
 * @param   {Request} req - Express request object containing the product data in the body.
 * @param   {Response} res - Express response object.
 * @returns {Promise<Response>} A JSON response with the created product or a validation/error message.
 */
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, price } = req.body;

    // 1. Instantiate the entity
    const product = new Product();
    product.name = sanitizeInput(name); // Sanitize string inputs
    product.description = sanitizeInput(description);
    product.price = price;

    // 2. Validate the entity using class-validator decorators defined in your Product entity.
    // This centralizes validation rules on the entity itself.
    const errors = await validate(product);
    if (errors.length > 0) {
      // Map errors to a more client-friendly format
      const formattedErrors = errors.map(err => ({
        field: err.property,
        constraints: err.constraints,
      }));
      return res.status(400).json({ message: 'Validation failed', errors: formattedErrors });
    }

    // 3. Save the validated entity
    const productRepository = await getProductRepository();
    const newProduct = await productRepository.save(product);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error in createProduct:', error);
    return res.status(500).json({ message: 'An unexpected error occurred on the server.' });
  }
};

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by its ID
 * @access  Public
 * @param   {Request} req - Express request object containing the ID as a URL parameter.
 * @param   {Response} res - Express response object.
 * @returns {Promise<Response>} A 204 No Content response on success or an error message.
 */
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // --- Security & Validation ---
    // Validate that the ID is a numeric string before querying the database.
    // This prevents malformed requests from hitting the DB layer.
    if (!isNumberString(id)) {
      return res.status(400).json({ message: 'Invalid ID format. A numeric ID is required.' });
    }

    const productRepository = await getProductRepository();
    const deleteResult = await productRepository.delete(id);

    // Check if any record was actually deleted.
    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: `Product with ID ${id} not found.` });
    }

    // Standard practice for successful DELETE operations is to return 204 No Content.
    return res.status(204).send();
  } catch (error) {
    console.error(`Error in deleteProduct for ID ${req.params.id}:`, error);
    return res.status(500).json({ message: 'An unexpected error occurred on the server.' });
  }
};
