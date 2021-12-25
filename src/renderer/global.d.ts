import { LoginResponse, Referralsv2QueryResponse } from 'main/typings';

export interface WealthsimpleAPI {
  login: (username: string, password: string, otp?: string) => Promise<LoginResponse>;
  queryBonuses: () => Promise<Referralsv2QueryResponse>;
}

declare global {
  interface Window {
    wealthsimple: WealthsimpleAPI;
  }
}
