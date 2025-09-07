// Central location for all type definitions in the application.

/**
 * Interface defining the structure of a Product object.
 * This is used across components, hooks, and API services.
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

/**
 * Defines the shape for a notification object used for user feedback.
 */
export interface NotificationType {
  message: string;
  type: 'success' | 'error';
}
