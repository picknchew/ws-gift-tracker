import Store from 'electron-store';

export interface IStore {
  deviceId: string;
  deviceName: string;

  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

const store = new Store<IStore>();

export default store;
