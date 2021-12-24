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

export interface Referralsv2QueryResponse {
  p2pReferralsv2: P2PReferralsv2;
}

/** OnboardedHome */
export interface P2PProfile {
  name: string;
  handle: string;
  color: string;
  imageUrl: string;
  telephone: string;
  telephoneHash: string;
  telephoneVerified: string;
  referralCode: string;
  school: {
    id: string;
    name: string;
    __typename: string;
  };
  __typename: string;
}

export interface Profile {
  __typename: string;
  id: string;
  name: string;
  handle: string;
  imageUrl: string;
  color: string;
  telephoneHash: string;
}

export interface Contact {
  id: string;
  identifier: string;
  identifierType: string;
  telephoneHash: string;
  __typename: string;
  contactee: Profile;
}

export interface P2PContact {
  nodes: Array<Contact>;
  __typename: string;
}

export interface P2PActivePromo {
  id: string;
  startTime: string;
  endTime: string;
  payoutAmount: string;
  payoutTrigger: string;
  __typename: string;
}

export interface OnboardedHomeResponse {
  p2pRecentContactsTelephoneHashes: Array<string>;
  p2pContacts: Array<P2PContact>;
  p2pActivePromo: P2PActivePromo;
}

/** CashClientDashboard */
export interface AmlRecordResult {
  __typename: string;
  status: string;
  requiredDocumentsCount: number;
  requiredDocumentTypes: Array<string>;
}
export interface AmlRecord {
  __typename: string;
  results: Array<AmlRecordResult>;
}

export interface CashClient {
  __typename: string;
  amlRecords: Array<AmlRecord>;
  id: string;
  created_at: string;
  jurisdiction: string;
  identityDocumentReviews: Array<{
    decision: string;
    status: string;
    __typename: string;
  }>;
  onboarding: {
    states: Array<{
      kyc_application: unknown;
      email_confirmation: unknown;
      __typename: string;
    }>;
    __typename: string;
  };
  profile: {
    email: string;
    biometric_check: {
      status: string;
      __typename: string;
    };
    residential_address: {
      postal_code: string;
      city: string;
      __typename: string;
    };
    __typename: string;
  };
  accounts: {
    id: string;
    nickname: string;
    type: string;
    investNetLiquidationAmount: number;
    currency: string;
    signedAgreements: Array<{
      id: string;
      className: string;
      __typename: string;
    }>;
    cashAccount: {
      status: string;
      balance: string;
      spendingBalance: string;
      withdrawalBalance: string;
      __typename: string;
    };
    custodianAccounts: Array<{
      id: string;
      custodianAccountId: string;
      status: string;
      __typename: string;
    }>;
    __typename: string;
  };
}

export interface CashClientDashboardResponse {
  client: CashClient;
}
