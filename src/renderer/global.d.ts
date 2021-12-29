import { LoginResponse, Referralsv2QueryResponse, CashClientDashboardResponse, TokenInfo } from 'main/typings';

export interface WealthsimpleAPI {
  login: (username: string, password: string, otp?: string) => Promise<LoginResponse>;
  getTokenInfo: () => Promise<TokenInfo>;
  queryBonuses: () => Promise<Referralsv2QueryResponse>;
  queryDashboard: () => Promise<CashClientDashboardResponse>;
  isLoggedIn: () => Promise<boolean>;
}

export interface ChakraAPI {
  onToggleColorMode: (cb: () => void) => void;
}

declare global {
  interface Window {
    wealthsimple: WealthsimpleAPI;
    chakra: ChakraAPI;
  }
}
