/**
 * @fileoverview A form for adding a new product, featuring intuitive, real-time input validation.
 * @module components/product/AddProductForm
 * @requires react
 * @requires ../../types
 * @requires ../../hooks/useI18n
 */

import React, { useState } from 'react';
import type { FocusEvent, FormEvent } from 'react';
import type { Product, NotificationType } from '../../types';
import { useI18n } from '../../hooks/useI18n';

interface AddProductFormProps {
    onAdd: (product: Omit<Product, 'id'>) => void;
    isLoading: boolean;
    showNotification: (message: string, type: NotificationType['type']) => void;
}

// Type to handle validation errors in a structured way
type FormFields = 'name' | 'description' | 'price';
type FormErrors = Partial<Record<FormFields, string>>;


const AddProductForm: React.FC<AddProductFormProps> = ({ onAdd, isLoading }) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const { t } = useI18n();

  // Validates a single field based on its name and value
  const validateField = (name: FormFields, value: string): string | undefined => {
    switch (name) {
        case 'name':
            if (!value.trim()) return t('validation_name_required');
           
            if (value.trim().length < 4) return t('validation_name_invalid');
            break;
        case 'description':
            if (!value.trim()) return t('validation_description_required');
            break;
        case 'price':
            if (!value) return t('validation_price_required');
            if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return t('validation_price_invalid');
            break;
        default:
            return undefined;
    }
  };
  
  // This function is triggered when a user clicks away from an input field
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: FormFields, value: string };
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Updates the form state as the user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: FormFields, value: string };
    setFormData(prev => ({...prev, [name]: value}));
    
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  // Handles the form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate all fields one last time before submitting
    const formValidationErrors: FormErrors = {};
    (Object.keys(formData) as FormFields[]).forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) {
            formValidationErrors[key] = error;
        }
    });

    if (Object.keys(formValidationErrors).length > 0) {
        setErrors(formValidationErrors);
        return; // Stop submission if there are errors
    }

    onAdd({ 
        name: formData.name, 
        description: formData.description, 
        price: parseFloat(formData.price) 
    });

    // Reset form after successful submission
    setFormData({ name: '', description: '', price: '' });
    setErrors({});
  };
  
  // Tailwind CSS classes for styling
  const inputClasses = "w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500";
  const errorBorderClasses = "border-red-500";
  const errorTextClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('form_title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
            <input
              type="text"
              name="name"
              placeholder={t('product_name_placeholder')}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClasses} ${errors.name ? errorBorderClasses : ''}`}
            />
            {errors.name && <p className={errorTextClasses}>{errors.name}</p>}
        </div>
        <div>
            <textarea
              name="description"
              placeholder={t('description_placeholder')}
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClasses} h-24 resize-none ${errors.description ? errorBorderClasses : ''}`}
            />
            {errors.description && <p className={errorTextClasses}>{errors.description}</p>}
        </div>
        <div>
            <input
              type="number"
              name="price"
              placeholder={`${t('price_placeholder')} (USD)`}
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              step="0.01"
              min="0.01"
              className={`${inputClasses} ${errors.price ? errorBorderClasses : ''}`}
            />
            {errors.price && <p className={errorTextClasses}>{errors.price}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
          {isLoading ? t('adding_product_button') : t('add_product_button')}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;