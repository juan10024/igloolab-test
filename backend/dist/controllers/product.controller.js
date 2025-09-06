"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.getProducts = void 0;
const data_source_1 = require("../data-source");
const Product_1 = require("../entities/Product");
const class_validator_1 = require("class-validator");
const productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
/**
 * Retrieves all products from the database.
 */
const getProducts = async (req, res) => {
    try {
        const products = await productRepository.find();
        return res.status(200).json(products);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};
exports.getProducts = getProducts;
/**
 * Creates a new product and saves it to the database.
 */
const createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = new Product_1.Product();
        product.name = name;
        product.description = description;
        product.price = parseFloat(price);
        const errors = await (0, class_validator_1.validate)(product);
        if (errors.length > 0) {
            const formattedErrors = errors.map(err => ({
                field: err.property,
                message: Object.values(err.constraints || {}).join(', '),
            }));
            return res.status(400).json({ message: "Validation failed", errors: formattedErrors });
        }
        await productRepository.save(product);
        return res.status(201).json(product);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};
exports.createProduct = createProduct;
/**
 * Deletes a product by its ID.
 */
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await productRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: `Product with ID ${id} not found` });
        }
        return res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map