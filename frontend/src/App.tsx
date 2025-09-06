import React, { useState, useEffect, useCallback } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';

// --- Environment Variable Setup ---
const apiUrl = process.env.REACT_APP_API_URL;

// Axios instance configured to communicate with the backend API.
const apiClient = axios.create({
  baseURL: apiUrl,
});

// Interface defining the structure of a Product object.
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

// --- UI Components ---

/**
 * A simple notification component to display success or error messages.
 */
const Notification: React.FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => {
  if (!message) return null;
  const baseClasses = "px-4 py-2 rounded-md text-white mb-4 shadow-lg transition-opacity duration-300";
  const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
};

/**
 * A stylish confirmation modal to replace window.confirm.
 */
const ConfirmModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


/**
 * Renders a single product item card with product details and a delete button.
 */
const ProductItem: React.FC<{ product: Product; onDelete: (id: number) => void }> = ({ product, onDelete }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between transition-transform transform hover:scale-105">
    <div>
      <h3 className="text-xl font-bold text-white">{product.name}</h3>
      <p className="text-gray-400 mt-2">{product.description}</p>
      <p className="text-teal-400 font-semibold text-lg mt-4">${Number(product.price).toFixed(2)}</p>
    </div>
    <button
      onClick={() => onDelete(product.id)}
      className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg self-start transition-colors duration-300"
    >
      Delete
    </button>
  </div>
);

/**
 * A form for adding a new product.
 */
const AddProductForm: React.FC<{
    onAdd: (product: Omit<Product, 'id'>) => void;
    isLoading: boolean;
    showNotification: (message: string, type: 'error' | 'success') => void;
}> = ({ onAdd, isLoading, showNotification }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price) {
      // Replaced window.alert with the more elegant Notification component
      showNotification("Please fill out all fields.", "error");
      return;
    }
    onAdd({ name, description, price: parseFloat(price) });
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 h-24 resize-none"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0.01"
          className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

// --- Main Application Component ---

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // State for the confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);


  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  };

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Product[]>('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showNotification("Could not load products.", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post<Product>('/products', newProduct);
      setProducts(prevProducts => [...prevProducts, response.data]);
      showNotification("Product added successfully.", "success");
    } catch (error: any) {
      console.error("Error adding product:", error);
      const errorMsg = error.response?.data?.message || "Error adding product.";
      showNotification(errorMsg, "error");
    } finally {
        setIsSubmitting(false);
    }
  };
  
  // Opens the modal to ask for confirmation
  const handleDeleteRequest = (id: number) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  // The actual deletion logic, triggered by the modal's confirm button
  const handleConfirmDelete = async () => {
    if (productIdToDelete === null) return;

    try {
        await apiClient.delete(`/products/${productIdToDelete}`);
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productIdToDelete));
        showNotification("Product deleted successfully.", "success");
    } catch (error) {
        console.error("Error deleting product:", error);
        showNotification("Error deleting product.", "error");
    } finally {
        // Close modal and reset state
        setIsModalOpen(false);
        setProductIdToDelete(null);
    }
  };


  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Product <span className="text-teal-400">Management</span>
          </h1>
          <p className="text-gray-400 mt-2">igloolab - Technical Test - JUAN DANIEL VALDERRAMA</p>
        </header>

        <main className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <AddProductForm onAdd={handleAddProduct} isLoading={isSubmitting} showNotification={showNotification} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Product List</h2>
            {notification && <Notification message={notification.message} type={notification.type} />}
            {isLoading ? (
              <p className="text-center text-gray-400">Loading products...</p>
            ) : products.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {products.map(product => (
                  <ProductItem key={product.id} product={product} onDelete={handleDeleteRequest} />
                ))}
              </div>
            ) : (
              <p className="text-center bg-gray-800 p-6 rounded-lg">No products found. Add one to get started!</p>
            )}
          </div>
        </main>
      </div>
      
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
            setIsModalOpen(false);
            setProductIdToDelete(null);
        }}
      />
    </div>
  );
}

export default App;