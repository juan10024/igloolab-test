import type { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

/**
 * Get a repository instance for Product.
 * If the AppDataSource is not initialized, try to initialize it once.
 */
async function getProductRepository(): Promise<Repository<Product>> {
  try {
    if (!AppDataSource.isInitialized) {
      // Attempt to initialize if not already initialized.
      // This is defensive: in normal flow your index.ts should already initialize.
      await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Product);
  } catch (err) {
    // Re-throw after logging so handlers can return a 500 to the client.
    console.error('Failed to obtain Product repository:', err instanceof Error ? err.stack ?? err.message : err);
    throw err;
  }
}

/**
 * GET /api/products
 * Returns all products.
 */
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const productRepository = await getProductRepository();
    const products = await productRepository.find();
    return res.status(200).json(products);
  } catch (error: unknown) {
    // Safe logging: print stack if it's an Error, otherwise log the raw object.
    if (error instanceof Error) {
      console.error('Error in getProducts:', error.stack ?? error.message);
      return res.status(500).json({ message: error.message });
    }
    console.error('Unknown error in getProducts:', error);
    return res.status(500).json({ message: 'Unknown server error' });
  }
};

/**
 * POST /api/products
 * Create a product.
 *
 * Expected JSON body: { name: string, description?: string, price: number }
 */
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  console.log('Incoming create product request body:', req.body);

  try {
    const { name, description, price } = req.body;

    // Basic request validation: required fields
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing "name" field' });
    }

    // Ensure price is a finite number
    const parsedPrice = typeof price === 'number' ? price : Number.parseFloat(String(price));
    if (!Number.isFinite(parsedPrice)) {
      return res.status(400).json({ message: 'Invalid or missing "price" field. Must be a number.' });
    }

    const productRepository = await getProductRepository();

    // Create entity instance and assign values
    const product = new Product();
    product.name = name;
    product.description = typeof description === 'string' ? description : '';
    product.price = parsedPrice;

    // Validate entity using class-validator - returns array of validation errors if any
    const errors = await validate(product);
    if (errors.length > 0) {
      const formatted = errors.map(e => ({
        field: e.property,
        constraints: e.constraints
      }));
      console.warn('Validation failed for createProduct:', formatted);
      return res.status(400).json({ message: 'Validation failed', errors: formatted });
    }

    const saved = await productRepository.save(product);
    return res.status(201).json(saved);
  } catch (error: unknown) {
    // Log full stack if possible; otherwise log the raw object
    if (error instanceof Error) {
      console.error('Error saving product:', error.stack ?? error.message);
      return res.status(500).json({ message: error.message });
    }
    console.error('Unknown error saving product:', error);
    return res.status(500).json({ message: 'Unknown server error' });
  }
};

/**
 * DELETE /api/products/:id
 * Delete specific product by id.
 */
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const productRepository = await getProductRepository();
    const result = await productRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    return res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting product:', error.stack ?? error.message);
      return res.status(500).json({ message: error.message });
    }
    console.error('Unknown error deleting product:', error);
    return res.status(500).json({ message: 'Unknown server error' });
  }
};