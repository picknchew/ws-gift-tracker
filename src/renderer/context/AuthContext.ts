import { createContext } from 'react';
import { AuthContextInterface, LoginResponse } from 'main/typings';

const AuthContext = createContext<AuthContextInterface>({
  isAuth: false,
  signIn: async () => LoginResponse.UnknownError,
  isLoggedIn: async () => false,
});

export default AuthContext;
