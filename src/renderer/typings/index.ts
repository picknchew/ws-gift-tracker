export interface AuthContextInterface {
  isAuth: boolean;
  signIn: (email: string, password: string, otp?: string) => Promise<LoginResponse>;
}

export type Gifter = {
  handle: string;
  timeSinceLastSent: string;
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
  payoutAmount: number; // in cents
  payoutTriggeredAt: string;
  type: string;
  promoCode: string | null;
  category: string | null;
  opposingUserProfile: OpposingUserProfile | null;
  createdAt: string;
  updatedAt: string;
}

export interface Referralsv2QueryResponse {
  p2pReferralsv2: Array<Referralv2>;
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
  name: string; // preferred name
  handle: string;
  imageUrl: string;
  color: string;
  telephoneHash: string;
}

export interface Contact {
  id: string;
  identifier: string | null;
  identifierType: string | null;
  telephoneHash: string | null;
  __typename: string;
  contactee: Profile;
}

// This describes the promo that's happening right now.
// Usually it's just the $10 referral bonus.
export interface P2PActivePromo {
  id: string;
  startTime: string | null;
  endTime: string | null;
  payoutAmount: number; // in cents
  payoutTrigger: string;
  __typename: string;
}

export interface OnboardedHomeResponse {
  p2pRecentContactsTelephoneHashes: Array<string>;
  p2pContacts: {
    nodes: Array<Contact>;
    __typename: string;
  };
  p2pActivePromo: P2PActivePromo;
}

/** CashClientDashboard */
export interface AmlRecord {
  __typename: string;
  status: string;
  requiredDocumentsCount: number;
  requiredDocumentTypes: Array<string>;
}

export interface AmlRecords {
  __typename: string;
  results: Array<AmlRecord>;
}

export interface Account {
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
    balance: number;
    spendingBalance: number;
    withdrawalBalance: number;
    __typename: string;
  };
  custodianAccounts: Array<{
    id: string;
    custodianAccountId: string;
    status: string;
    __typename: string;
  }>;
  __typename: string;
}

export interface CashClient {
  __typename: string;
  amlRecords: AmlRecords;
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
      kyc_application: string;
      email_confirmation: string;
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
  p2pProfile: P2PProfile;
  accounts: Array<Account>;
  spend: {
    id: string;
    status: string;
    eligibleForSpend: boolean;
    eligibleForCardDrop: boolean;
    __typename: string;
  };
}

export interface CashClientDashboardResponse {
  client: CashClient;
}
