import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { LoginResponse, RefreshAccessTokenResponse, TokenInfo } from '../typings';
import store from '../store';

const authEndpoint = 'https://api.production.wealthsimple.com/v1/oauth/token';
const versionEndpoint = 'https://api-legacy.wealthsimple.com/cash-mobile/version-manifest';

const clientId = '6eTvMK91JPk0iOKWuRruYBYk_fba-_DLaV-siKHKIQM';
const clientSecret = 'o2npZBw0PLwqCJhWD-WkMduCYnSpzgi2Y5gj87E04Ss';

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
        client_id: clientId,
        client_secret: clientSecret,
      },
      { headers }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (error.response.headers['x-wealthsimple-otp-required'] === 'true') {
        return LoginResponse.RequireOTP;
      }

      return LoginResponse.WrongCredentials;
    }

    return LoginResponse.UnknownError;
  }

  axios.defaults.headers.common.Authorization = `${res.data.token_type} ${res.data.access_token}`;
  store.set('tokenType', res.data.token_type);
  store.set('accessToken', res.data.access_token);
  store.set('refreshToken', res.data.refresh_token);
  store.set('userId', res.data.user_canonical_id);

  return LoginResponse.Success;
};

// call to get info about saved session
const getTokenInfo = async (): Promise<TokenInfo> => {
  let res;

  try {
    res = await axios.get(`${authEndpoint}/info`);
  } catch (error) {
    return {
      authenticated: false,
      expiresIn: 0,
    };
  }

  return {
    authenticated: true,
    expiresIn: res.data.expires_in,
  };
};

const isLoggedIn = () => {
  return store.has('tokenType') && store.has('accessToken') && store.has('refreshToken');
};

// recover tokens from previous session
if (isLoggedIn()) {
  axios.defaults.headers.common.Authorization = `${store.get('tokenType')} ${store.get('accessToken')}`;
}

const refreshAccessToken = async () => {
  let res;

  try {
    res = await axios.post(authEndpoint, {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
      refresh_token: store.get('refreshToken'),
      scope: 'invest.read invest.write trade.read',
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return RefreshAccessTokenResponse.InvalidRefreshToken;
    }

    return RefreshAccessTokenResponse.UnknownError;
  }

  axios.defaults.headers.common.Authorization = `${res.data.token_type} ${res.data.access_token}`;
  store.set('tokenType', res.data.token_type);
  store.set('accessToken', res.data.access_token);
  store.set('refreshToken', res.data.refresh_token);

  return RefreshAccessTokenResponse.Success;
};

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  isRetryAttempt: boolean;
}

const isRetryRequestConfig = (config: AxiosRequestConfig): config is RetryAxiosRequestConfig => {
  return 'isRetryAttempt' in config;
};

let refreshTokenPromise: Promise<RefreshAccessTokenResponse>;

// intereceptor to refresh access token automatically if expired
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    if (originalReq.url === authEndpoint || originalReq.url === versionEndpoint) {
      return Promise.reject(error);
    }

    if (axios.isAxiosError(error) && error.response?.status === 401 && !isRetryRequestConfig(originalReq)) {
      originalReq.isRetryAttempt = true;

      let res;

      // a request to refresh the access token does not already exist
      if (!refreshTokenPromise) {
        res = await refreshAccessToken();
      } else {
        // wait for ongoing refresh access token request to finish before retrying
        res = await refreshTokenPromise;
      }

      // only retry request if refreshing token was successful
      if (res === RefreshAccessTokenResponse.Success) {
        originalReq.headers.Authorization = axios.defaults.headers.common.Authorization;
        return axios.request(originalReq);
      }

      if (res === RefreshAccessTokenResponse.InvalidRefreshToken) {
        // TODO: redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export { login, getVersionManifest, getTokenInfo, refreshAccessToken, isLoggedIn };
