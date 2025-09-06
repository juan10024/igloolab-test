import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, Min, MaxLength, IsPositive } from 'class-validator';

/**
 * Represents the Product entity for the database.
 * Each property is mapped to a column in the 'products' table.
 * Decorators from class-validator are used to enforce validation rules.
 */
@Entity('products')
export class Product {
    /**
     * The unique identifier for the product.
     * @example 1
     */
    @PrimaryGeneratedColumn()
    id!: number; // Added '!' for definite assignment assertion

    /**
     * The name of the product.
     * @example "Laptop Pro X"
     */
    @Column({ type: 'varchar', length: 255 })
    @IsNotEmpty({ message: 'Product name is required' })
    @IsString()
    @MaxLength(255)
    name!: string; // Added '!' for definite assignment assertion

    /**
     * A detailed description of the product.
     * @example "A powerful laptop for creative professionals."
     */
    @Column({ type: 'text' })
    @IsNotEmpty({ message: 'Product description is required' })
    @IsString()
    description!: string; // Added '!' for definite assignment assertion

    /**
     * The price of the product.
     * Stored with a precision of 10 and a scale of 2.
     * @example 1499.99
     */
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNotEmpty({ message: 'Product price is required' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must have at most 2 decimal places' })
    @IsPositive({ message: 'Price must be a positive number' })
    price!: number; // Added '!' for definite assignment assertion
}