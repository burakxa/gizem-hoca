import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isMessi, setIsMessi] = useState(false);
  const toggleMessi = () => setIsMessi(m => !m);
  return (
    <ThemeContext.Provider value={{ isMessi, toggleMessi }}>
      {children}
    </ThemeContext.Provider>
  );
};
