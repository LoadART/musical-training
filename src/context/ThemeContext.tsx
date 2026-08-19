import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

/**
 * Represents the available application themes.
 */
export type Theme = 'light' | 'dark';

/**
 * Defines the shape of the Theme Context value.
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * React Context for managing the application's theme state.
 * Initialized as undefined to enforce the use of the useTheme hook within a Provider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provides the theme state and toggle function to the component tree.
 * Persists the user's theme preference in localStorage and syncs it 
 * with the document's data-theme attribute for CSS styling.
 * 
 * @param children - The React nodes to be wrapped by the provider.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Lazy initialization to read from localStorage only once on mount
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    // Strict validation to prevent invalid theme values from breaking the app
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'light';
  });

  // Sync theme with the DOM and localStorage whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Toggles the current theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access the ThemeContext.
 * 
 * @returns The current theme and the toggleTheme function.
 * @throws Error if used outside of a ThemeProvider.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};