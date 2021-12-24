export interface AuthContextInterface {
  isAuth: boolean;
  signIn: (email: string, password: string, otp?: string) => Promise<LoginResponse>;
}

export type Gifter = {
  username: string;
  lastSent: string;
};

export enum LoginResponse {
  UnknownError,
  RequireOTP,
  WrongCredentials,
  SUCCESS,
}
