import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('gizem_admin') === 'true') setIsLoggedIn(true);
  }, []);

  const login = (password) => {
    if (password === 'gizem2026') {
      setIsLoggedIn(true);
      sessionStorage.setItem('gizem_admin', 'true');
      return true;
    }
    alert('Şifre yanlış!');
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('gizem_admin');
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, isAdmin: isLoggedIn, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
