import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Create a context
const AuthContext = createContext();

// Create a custom hook for accessing the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component to wrap your app with
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const navigate = useNavigate();
  
  
  const login = (token) => {
    setAuthToken(token);
    // Store authToken in localStorage
    localStorage.setItem('authToken', token);
    return true;
  };

  const logout = () => {
    setAuthToken(null);
    // Remove authToken from localStorage
    localStorage.removeItem('authToken');
    navigate("/login")
  };
  const isUserLoggedIn = async () => {
    return (localStorage.getItem('authToken') !== null)
  };

  
  useEffect(() => {
    // Retrieve authToken from localStorage on component mount
    const storedToken = localStorage.getItem('authToken');  
    if (storedToken) {
      setAuthToken(storedToken);
      navigate("/dashboard")
    }
  }, []);

  const value = {
    authToken,
    login,
    logout,
    isUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
