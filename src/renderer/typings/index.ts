export interface AuthContextInterface {
  isAuth: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
}

export type Gifter = {
  username: string;
  lastSent: string;
};
