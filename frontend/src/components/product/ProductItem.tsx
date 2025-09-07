import React from 'react';
import type { Product } from '../../types';
import { useI18n } from '../../hooks/useI18n';
import { useCurrency } from '../../hooks/useCurrency';

interface ProductItemProps {
  product: Product;
  onDelete: (id: number) => void;
}

/**
 * Renderiza una única tarjeta de producto, mostrando el precio en la moneda seleccionada.
 */
const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
    const { t } = useI18n();
    const { formatPrice } = useCurrency();

    return(
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105">
            <div>
                {/*
                  Seguridad XSS: React escapa automáticamente los valores de `product.name` y `product.description`.
                  Esto previene ataques de Cross-Site Scripting (XSS), ya que si un atacante
                  inyecta código HTML o script en estos campos, será renderizado como texto plano y no ejecutado.
                */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{product.description}</p>
                <p className="text-teal-600 dark:text-teal-400 font-semibold text-lg mt-4">
                    {formatPrice(product.price)}
                </p>
            </div>
            <button
                onClick={() => onDelete(product.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg self-start transition-colors duration-300"
            >
                {t('delete_button')}
            </button>
        </div>
    );
};


export default ProductItem;
