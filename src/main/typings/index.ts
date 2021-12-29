import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';

export const APP_VERSION = '1.0.0';

export interface AuthContextInterface {
  isAuth: boolean;
  signIn: (email: string, password: string, otp?: string) => Promise<LoginResponse>;
  isLoggedIn: () => Promise<boolean>;
  getTokenInfo: () => Promise<TokenInfo>;
}

export type Gifter = {
  handle: string;
  timeSinceLastSent: string;
  timestamp: string;
};

export interface UseReactQueryComponentProps {
  error: unknown;
  isLoading: boolean;
}

export interface HeaderCardProps {
  header: string;
  children?: JSX.Element | JSX.Element[];
  alignedRight?: JSX.Element;
  isLoading?: boolean;
}

export interface GiftChartProps extends UseReactQueryComponentProps {
  data: Array<Referralv2>;
  isRefetching: boolean;
}

export interface GiftListProps extends UseReactQueryComponentProps {
  data: Array<Referralv2>;
  isRefetching: boolean;
  refetch: () => void;
}

export enum ResultType {
  Success,
  Error,
  Info,
}

export enum LoginResponse {
  UnknownError,
  RequireOTP,
  WrongCredentials,
  Success,
}

export enum RefreshAccessTokenResponse {
  UnknownError,
  InvalidRefreshToken,
  Success,
}

export interface TokenInfo {
  authenticated: boolean;
  expiresIn: number; // in seconds
}

export enum QueryResponse {
  UnknownError,
  RequireAuthentication,
}

export interface StatsHeaderProps extends UseReactQueryComponentProps {
  data: Array<Referralv2>;
  isRefetching: boolean;
}

export interface StatsCardProps {
  icon: React.ReactElement;
  accentColor: string;
  data: {
    label: string;
    value: string | number;
  };
  isLoading?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SidebarContentProps {
  data?: CashClient;
  error: unknown;
  isLoading: boolean;
  isRefetching: boolean;
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<CashClient, unknown>>;
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
  data: {
    p2pReferralsv2: Array<Referralv2>;
  };
}

/** OnboardedHome */
export interface P2PProfile {
  name: string | null; // preferred name
  handle: string;
  color: string;
  imageUrl: string | null;
  telephone: string;
  telephoneVerified: boolean;
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
  name: string | null; // preferred name
  handle: string;
  imageUrl: string | null;
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
  nickname: string | null;
  type: string;
  investNetLiquidationAmount: string; // dollars.cents
  currency: string;
  signedAgreements: Array<{
    id: string;
    className: string;
    __typename: string;
  }>;
  cashAccount: {
    status: string;
    balance: number; // in cents
    spendingBalance: number; // in cents
    withdrawalBalance: number; // in cents
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
    states: {
      kyc_application: string;
      email_confirmation: string;
      __typename: string;
    };
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
    status: string | null;
    eligibleForSpend: boolean;
    eligibleForCardDrop: boolean;
    __typename: string;
  };
}

export interface CashClientDashboardResponse {
  data: {
    client: CashClient;
  };
}
