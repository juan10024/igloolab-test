import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import type { Product, NotificationType } from '../types';
import { useI18n } from './useI18n';

/**
* Custom hook to handle all product logic.
*/
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const { t } = useI18n();

  const showNotification = (message: string, type: NotificationType['type']) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Product[]>('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification(t('error_loading_products'), "error");
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post<Product>('/products', newProduct);
      setProducts(prev => [...prev, response.data]);
      showNotification(t('product_added_success'), "success");
    } catch (error: any) {
      console.error("Error adding product:", error);
      const errorMsg = error.response?.data?.message || t('error_adding_product');
      showNotification(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const requestDelete = (id: number) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete === null) return;
    try {
      await apiClient.delete(`/products/${productIdToDelete}`);
      setProducts(prev => prev.filter(p => p.id !== productIdToDelete));
      showNotification(t('product_deleted_success'), "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification(t('error_deleting_product'), "error");
    } finally {
      setIsModalOpen(false);
      setProductIdToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  return {
    products,
    isLoading,
    isSubmitting,
    notification,
    isModalOpen,
    addProduct,
    requestDelete,
    confirmDelete,
    cancelDelete,
    showNotification,
  };
};