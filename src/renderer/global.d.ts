import { LoginResponse, Referralsv2QueryResponse } from 'main/typings';
import { TokenInfo } from 'main/wealthsimple/auth';

export interface WealthsimpleAPI {
  login: (username: string, password: string, otp?: string) => Promise<LoginResponse>;
  getTokenInfo: () => Promise<TokenInfo>;
  queryBonuses: () => Promise<Referralsv2QueryResponse>;
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
