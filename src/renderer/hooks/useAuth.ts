import { useState, useContext } from 'react';
import AuthContext from 'renderer/context/AuthContext';
import { LoginResponse } from 'renderer/typings';
import { login } from 'renderer/wealthsimple/auth';

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
    const signInResponse = await login(email, password, otp);
    if (signInResponse === LoginResponse.SUCCESS) {
      setIsAuth(true);
    }
    return signInResponse;
  };

  // Return the user object and auth methods
  return {
    isAuth,
    signIn,
  };
};
