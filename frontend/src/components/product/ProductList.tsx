import React from 'react';
import type { Product } from '../../types';
import ProductItem from './ProductItem';
import { useI18n } from '../../hooks/useI18n';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

/**
* Renders the product list.
* Handles loading and empty states.
*/
const ProductList: React.FC<ProductListProps> = ({ products, isLoading, onDelete }) => {
  const { t } = useI18n();
  
  if (isLoading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">{t('loading_products')}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">{t('no_products_found')}</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;

