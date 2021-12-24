export interface AuthContextInterface {
  isAuth: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
}
