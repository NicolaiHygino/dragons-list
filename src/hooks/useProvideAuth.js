import { useState } from 'react';

export const useProvideAuth = () => {
  const storageToken = localStorage.getItem('token');
  const storageUser = localStorage.getItem('user');

  const [token, setToken] = useState(storageToken);
  const [user, setUser] = useState(storageUser);

  const signin = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return {
    token,
    user,
    signin,
    signout
  };
};
