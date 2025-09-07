import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { Product, NotificationType } from '../../types';
import { useI18n } from '../../hooks/useI18n';

interface AddProductFormProps {
    onAdd: (product: Omit<Product, 'id'>) => void;
    isLoading: boolean;
    showNotification: (message: string, type: NotificationType['type']) => void;
}

/**
* A form for adding a new product.
* Now manages its own form state and calls parent functions on submit.
*/
const AddProductForm: React.FC<AddProductFormProps> = ({ onAdd, isLoading, showNotification }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const { t } = useI18n();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price) {
      showNotification(t('form_error_fill_fields'), "error");
      return;
    }
    onAdd({ name, description, price: parseFloat(price) });
    setName('');
    setDescription('');
    setPrice('');
  };

  const inputClasses = "w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('form_title')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={t('product_name_placeholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
          required
        />
        <textarea
          placeholder={t('description_placeholder')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputClasses} h-24 resize-none`}
          required
        />
        <input
          type="number"
          placeholder={t('price_placeholder')}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0.01"
          className={inputClasses}
          required
        />
        <button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
          {isLoading ? t('adding_product_button') : t('add_product_button')}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;

