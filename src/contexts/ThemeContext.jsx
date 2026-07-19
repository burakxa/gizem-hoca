import React, { createContext, useContext } from 'react';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ isMessi: false, toggleMessi: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};
