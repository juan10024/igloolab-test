"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
/**
 * Represents the Product entity for the database.
 * Each property is mapped to a column in the 'products' table.
 * Decorators from class-validator are used to enforce validation rules.
 */
let Product = class Product {
    /**
     * The unique identifier for the product.
     * @example 1
     */
    id; // Added '!' for definite assignment assertion
    /**
     * The name of the product.
     * @example "Laptop Pro X"
     */
    name; // Added '!' for definite assignment assertion
    /**
     * A detailed description of the product.
     * @example "A powerful laptop for creative professionals."
     */
    description; // Added '!' for definite assignment assertion
    /**
     * The price of the product.
     * Stored with a precision of 10 and a scale of 2.
     * @example 1499.99
     */
    price; // Added '!' for definite assignment assertion
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product name is required' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product description is required' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Product price is required' }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Price must have at most 2 decimal places' }),
    (0, class_validator_1.IsPositive)({ message: 'Price must be a positive number' }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=Product.js.map