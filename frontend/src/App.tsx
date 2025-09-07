import AddProductForm from './components/product/AddProductForm';
import ProductList from './components/product/ProductList';
import Header from './components/layout/Header';
import Notification from './components/common/Notification';
import ConfirmModal from './components/common/ConfirmModal';
import { useProducts } from './hooks/useProducts';
import { useI18n } from './hooks/useI18n';
import { useKeepAlive } from './hooks/useKeepAlive';



function App() {
  // Get the API base URL from environment variables.
  const apiUrl = import.meta.env.VITE_REACT_APP_URL;
  const keepAliveUrl = `${apiUrl}/api/ping`;

  // Call the hook to start the keep-alive process.
  // It will run only once when the App component is mounted.
  useKeepAlive(keepAliveUrl);

  const {
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
  } = useProducts();
  const { t } = useI18n();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-8">
        <Header />

        <main className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <AddProductForm onAdd={addProduct} isLoading={isSubmitting} showNotification={showNotification} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('product_list_title')}</h2>
            {notification && <Notification message={notification.message} type={notification.type} />}
            <ProductList products={products} isLoading={isLoading} onDelete={requestDelete} />
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default App;