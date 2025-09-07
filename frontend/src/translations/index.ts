/**
 * @fileoverview This file centralizes all translation strings for the application.
 * @module transalations/index
 */

export const resources = {
  en: {
    translation: {
      // Header
      "main_title": "Product <1>Management</1>",
      "main_subtitle": "igloolab - Technical Test - JUAN DANIEL VALDERRAMA",
      // Product Form
      "form_title": "Add New Product",
      "product_name_placeholder": "Product Name",
      "description_placeholder": "Description",
      "price_placeholder": "Price",
      "add_product_button": "Add Product",
      "adding_product_button": "Adding...",
      "form_error_fill_fields": "Please fill out all fields.",
      // Validation
      "validation_name_required": "Please complete the product name.",
      "validation_description_required": "Please complete the description.",
      "validation_price_required": "Please enter a price.",
      "validation_name_invalid": "Name must be at least 4 characters and contain only letters.",
      "validation_price_invalid": "Price must be a positive number.",
      // Product List
      "product_list_title": "Product List",
      "loading_products": "Loading products...",
      "no_products_found": "No products found. Add one to get started!",
      // Product Item
      "delete_button": "Delete",
      // Notifications
      "product_added_success": "Product added successfully.",
      "product_deleted_success": "Product deleted successfully.",
      "error_loading_products": "Could not load products.",
      "error_adding_product": "Error adding product.",
      "error_deleting_product": "Error deleting product.",
      // Confirm Modal
      "modal_title": "Confirm Deletion",
      "modal_message": "Are you sure you want to delete this product? This action cannot be undone.",
      "cancel_button": "Cancel",
      "confirm_button": "Confirm",
    }
  },
  es: {
    translation: {
      // Header
      "main_title": "Gestión de <1>Productos</1>",
      "main_subtitle": "igloolab - Prueba Técnica - JUAN DANIEL VALDERRAMA",
      // Product Form
      "form_title": "Agregar Nuevo Producto",
      "product_name_placeholder": "Nombre del Producto",
      "description_placeholder": "Descripción",
      "price_placeholder": "Precio",
      "add_product_button": "Agregar Producto",
      "adding_product_button": "Agregando...",
      "form_error_fill_fields": "Por favor, complete todos los campos.",
      // Validation
      "validation_name_required": "Por favor completa el nombre del producto.",
      "validation_description_required": "Por favor completa la descripción.",
      "validation_price_required": "Por favor ingresa un precio.",
      "validation_name_invalid": "El nombre debe tener al menos 4 caracteres y contener solo letras.",
      "validation_price_invalid": "El precio debe ser un número positivo.",
      // Product List
      "product_list_title": "Lista de Productos",
      "loading_products": "Cargando productos...",
      "no_products_found": "No se encontraron productos. ¡Agregue uno para comenzar!",
      // Product Item
      "delete_button": "Eliminar",
      // Notifications
      "product_added_success": "Producto agregado exitosamente.",
      "product_deleted_success": "Producto eliminado exitosamente.",
      "error_loading_products": "No se pudieron cargar los productos.",
      "error_adding_product": "Error al agregar el producto.",
      "error_deleting_product": "Error al eliminar el producto.",
      // Confirm Modal
      "modal_title": "Confirmar Eliminación",
      "modal_message": "¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer.",
      "cancel_button": "Cancelar",
      "confirm_button": "Confirmar",
    }
  }
};
