import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';

/**
 * Custom hook for accessing the theme context.
 * Provides a clean and reusable way to get the current theme and toggle function.
 * Throws an error if used outside of a ThemeProvider to enforce correct usage.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
