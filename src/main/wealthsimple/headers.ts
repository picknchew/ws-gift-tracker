import axios from "axios";
import randomWords from "random-words";
import short = require("short-uuid");

const wsVersion = "1.46.1";
const buildNumber = "373";
const deviceId = short.generate();
const deviceName = randomWords()

axios.defaults.withCredentials = true;

// headers sent on every request
axios.defaults.headers.common["x-wealthsimple-client"] = "wealthsimple.js";
axios.defaults.headers.common["user-agent"] = `Wealthsimple Cash iOS v${wsVersion} (${buildNumber})`;
axios.defaults.headers.common["x-ws-device-manufacturer"] = "Apple";
axios.defaults.headers.common["x-ws-device-id"] = deviceId;
axios.defaults.headers.common["x-ws-device-os"] = "15.1";
axios.defaults.headers.common["x-ws-device-model"] = "A2484";
axios.defaults.headers.common["x-ws-device-name"] = deviceName;
axios.defaults.headers.common["x-ws-device-system-name"] = "iOS";
axios.defaults.headers.common["x-app-version"] = wsVersion;
axios.defaults.headers.common["x-app-build-number"] = buildNumber;
axios.defaults.headers.common["Accept-Language"] = "en_CA";
axios.defaults.headers.common["Content-Type"] = "application/json";
