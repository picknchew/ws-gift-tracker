import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { LoginResponse } from 'renderer/typings';

const authEndpoint = 'https://api.production.wealthsimple.com/v1/oauth/token';
const versionEndpoint = 'https://api-legacy.wealthsimple.com/cash-mobile/version-manifest';

// call on startup to replicate app behaviour
const getVersionManifest = async () => {
  axios.get(versionEndpoint);
};

const login = async (username: string, password: string, otp?: string) => {
  const headers: AxiosRequestHeaders = {};

  if (otp) {
    // 6 digit otp
    headers['x-wealthsimple-otp'] = otp;
  }

  let res;

  try {
    res = await axios.post(
      authEndpoint,
      {
        grant_type: 'password',
        scope: 'invest.read invest.write trade.read',
        username,
        password,
        client_id: '6eTvMK91JPk0iOKWuRruYBYk_fba-_DLaV-siKHKIQM',
        client_secret: 'o2npZBw0PLwqCJhWD-WkMduCYnSpzgi2Y5gj87E04Ss',
      },
      { headers }
    );
  } catch (error) {
    return LoginResponse.UnknownError;
  }

  if (res.status === 401) {
    if (res.data['x-wealthsimple-otp-required'] === 'true') {
      return LoginResponse.RequireOTP;
    }

    return LoginResponse.WrongCredentials;
  }

  axios.defaults.headers.common.Authorization = `${res.data.token_type} ${res.data.access_token}`;
  // TODO: handle refresh token
  return LoginResponse.SUCCESS;
};

export { login, getVersionManifest };
