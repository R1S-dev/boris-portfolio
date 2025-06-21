import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme !== null) {
      return storedTheme === 'dark';
    }
    // Ako nema ništa u localStorage ➜ koristi sistemsku temu
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('transition-colors', 'duration-500');

    if (darkMode) {
      root.classList.add('dark');
      root.style.setProperty('--thumb-color', 'rgba(239, 68, 68, 0.5)');       // red-500
      root.style.setProperty('--thumb-hover', 'rgba(239, 68, 68, 0.8)');
      root.style.setProperty('scrollbar-color', 'rgba(239, 68, 68, 0.5) transparent');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--thumb-color', 'rgba(59, 130, 246, 0.5)');       // blue-500
      root.style.setProperty('--thumb-hover', 'rgba(59, 130, 246, 0.8)');
      root.style.setProperty('scrollbar-color', 'rgba(59, 130, 246, 0.5) transparent');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
