import { useState, useContext } from 'react';
import AuthContext from 'renderer/context/AuthContext';
import { LoginResponse } from 'main/typings';

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signIn = async (email: string, password: string, otp?: string): Promise<LoginResponse> => {
    const signInResponse = await window.wealthsimple.login(email, password, otp);
    if (signInResponse === LoginResponse.Success) {
      setIsAuth(true);
    }
    return signInResponse;
  };

  const isLoggedIn = async () => {
    const isLoggedInResponse = await window.wealthsimple.isLoggedIn();
    if (isLoggedInResponse) {
      setIsAuth(true);
    }
    return isLoggedInResponse;
  };

  const getTokenInfo = async () => {
    const tokenInfo = await window.wealthsimple.getTokenInfo();
    if (tokenInfo.authenticated) {
      setIsAuth(true);
    }
    return tokenInfo;
  };

  // Return the user object and auth methods
  return {
    isAuth,
    signIn,
    isLoggedIn,
    getTokenInfo,
  };
};
