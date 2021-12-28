import Store from 'electron-store';

export interface IStore {
  deviceId: string;
  deviceName: string;

  tokenType: string;
  accessToken: string;
  refreshToken: string;

  userId: string;
}

const store = new Store<IStore>();

export default store;
