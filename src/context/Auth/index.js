import React, { useContext, createContext } from 'react';
import { useProvideAuth } from 'hooks/useProvideAuth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const ProvideAuth = ({children}) => {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  );
};
