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

export enum QueryResponse {
  UnknownError,
  RequireAuthentication,
}

/** Referralsv2Query */
export type OpposingUserProfile = {
  id: string;
  handle: string;
  __typename: string;
};

export interface Referralv2 {
  __typename: string;
  id: string;
  payoutAmount: number;
  payoutTriggeredAt: string;
  type: string;
  promoCode: string;
  category: string;
  opposingUserProfile: OpposingUserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface P2PReferralsv2 {
  __typename: string;
  referrals: Array<Referralv2>;
}
