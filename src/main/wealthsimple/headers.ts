import axios from 'axios';
import randomWords from 'random-words';
import short from 'short-uuid';
import store from '../store';

if (!store.has('deviceId')) {
  store.set('deviceId', short.generate());
}

if (!store.has('deviceName')) {
  store.set('deviceName', randomWords());
}

const wsVersion = '1.46.1';
const wsBuildNumber = '373';
const deviceId = store.get('deviceId');
const deviceName = store.get('deviceName');

axios.defaults.withCredentials = true;

// headers sent on every request
axios.defaults.headers.common['x-wealthsimple-client'] = 'wealthsimple.js';
axios.defaults.headers.common['x-ws-device-manufacturer'] = 'Apple';
axios.defaults.headers.common['x-ws-device-id'] = deviceId;
axios.defaults.headers.common['x-ws-device-os'] = '15.1';
axios.defaults.headers.common['x-ws-device-model'] = 'A2484';
axios.defaults.headers.common['x-ws-device-name'] = deviceName;
axios.defaults.headers.common['x-ws-device-system-name'] = 'iOS';
axios.defaults.headers.common['x-app-version'] = wsVersion;
axios.defaults.headers.common['x-app-build-number'] = wsBuildNumber;
axios.defaults.headers.common['Accept-Language'] = 'en_CA';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['User-Agent'] = `Wealthsimple Cash iOS v${wsVersion} (${wsBuildNumber})`;

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  // log requests and responses to debug
  axios.interceptors.request.use(
    (request) => {
      console.log('\x1b[36m%s\x1b[0m', '--------Request--------\n', request, '------------------------------------');
      return request;
    },
    (error) => {
      console.log('\x1b[31m%s\x1b[0m', '--------Request ERROR--------\n', error, '------------------------------------');
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log('\x1b[32m%s\x1b[0m', '--------Response--------\n', response, '------------------------------------');
      return response;
    },
    (error) => {
      console.log('\x1b[31m%s\x1b[0m', '--------Response ERROR--------\n', error, '------------------------------------');
      return Promise.reject(error);
    }
  );
}
