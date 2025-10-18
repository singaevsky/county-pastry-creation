import { useState } from 'react';

export const useAuth = () => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));

  const setToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  return { token, setToken };
};
