import React from 'react';
import { useI18n } from '../../hooks/useI18n';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
* A reusable confirmation modal.
* Decoupled from product logic, it can be used for any confirmation action.
*/
const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('modal_title')}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t('modal_message')}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('cancel_button')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            {t('confirm_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

