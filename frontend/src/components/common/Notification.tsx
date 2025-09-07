/**
 * @fileoverview A simple notification component for displaying success or error messages.
 * @module components/common/Notification
 * @requires react
 * @requires ../../types
 */

import React from 'react';
import type { NotificationType } from '../../types';

/**
* It's a "dumb" component that only renders the UI based on props.
*/
const Notification: React.FC<NotificationType> = ({ message, type }) => {
  if (!message) return null;

  const baseClasses = "px-4 py-2 rounded-md text-white mb-4 shadow-lg transition-all duration-300 transform";
  const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
};

export default Notification;