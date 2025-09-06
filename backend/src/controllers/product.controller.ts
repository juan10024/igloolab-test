import type { Request, Response } from 'express'; 
import { AppDataSource } from '../data-source'; 
import { Product } from '../entities/Product'; 
import { validate } from 'class-validator';

const productRepository = AppDataSource.getRepository(Product);

/**
 * Retrieves all products from the database.
 */
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const products = await productRepository.find();
        return res.status(200).json(products);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};

/**
 * Creates a new product and saves it to the database.
 */
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const { name, description, price } = req.body;
    console.log('Incoming create product request body:', req.body);

    try {
        const product = new Product();
        product.name = name;
        product.description = description;
        product.price = parseFloat(price);

        const errors = await validate(product);
        if (errors.length > 0) {
            const formattedErrors = errors.map(err => ({
                field: err.property,
                message: Object.values(err.constraints || {}).join(', '),
            }));
            return res.status(400).json({ message: "Validation failed", errors: formattedErrors });
        }

        await productRepository.save(product);
        return res.status(201).json(product);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};

/**
 * Deletes a product by its ID.
 */
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const result = await productRepository.delete(id);

        if (result.affected === 0) {
            return res.status(404).json({ message: `Product with ID ${id} not found` });
        }

        return res.status(204).send();

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};