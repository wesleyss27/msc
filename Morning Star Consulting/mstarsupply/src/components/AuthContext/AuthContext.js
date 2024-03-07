// AuthContext.js

import React, { createContext, useState } from 'react';

// Crie o contexto de autenticação
const AuthContext = createContext();

// Crie o provedor de autenticação
export const AuthProvider = ({ children }) => {
  // Estado para armazenar informações sobre o usuário logado
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Função para fazer login
  const login = (userData) => {
    // Lógica para fazer login...
    setLoggedInUser(userData.username);
  };

  // Função para fazer logout
  const logout = () => {
    // Lógica para fazer logout...
    setLoggedInUser(null);
  };

  // Retorne o contexto de autenticação
  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporte o contexto de autenticação
export default AuthContext;
