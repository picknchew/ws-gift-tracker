import { createContext } from 'react';
import { AuthContextInterface } from 'renderer/typings';

const AuthContext = createContext<AuthContextInterface>({
  isAuth: false,
  signIn: async () => false,
});

export default AuthContext;
