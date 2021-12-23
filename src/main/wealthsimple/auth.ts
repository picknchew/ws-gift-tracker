import axios from "axios"

const authEndpoint = "https://api.production.wealthsimple.com/v1/oauth/token";
const versionEndpoint = "https://api-legacy.wealthsimple.com/cash-mobile/version-manifest";

enum LoginResponse {
    UnknownError,
    RequireOTP,
    WrongCredentials,
    SUCCESS
}

// call on startup to replicate app behaviour
const getVersionManifest = async () => {
    axios.get(versionEndpoint, {withCredentials: true});
}

const login = async (username: String, password: String) => {
    // x-wealthsimple-otp: 6 digit otp
    let res;
    
    try {
        res = await axios.post(authEndpoint, {
            data: {
                "grant_type": password,
                "scope": "invest.read invest.write trade.read",
                "username": username,
                "password": password,
                "client_id": "6eTvMK91JPk0iOKWuRruYBYk_fba-_DLaV-siKHKIQM",
                "client_secret": "o2npZBw0PLwqCJhWD-WkMduCYnSpzgi2Y5gj87E04Ss"
            }
        })
    } catch (error) {
        return LoginResponse.UnknownError;
    }

    if (res.status == 401) {
        if (res.data["x-wealthsimple-otp"]?.startsWith("required")) {
            return LoginResponse.RequireOTP;
        }

        return LoginResponse.RequireOTP;
    }

    axios.defaults.headers.common["Authorization"] = `${res.data["token_type"]} ${res.data["access_token"]}`;
    // TODO: handle refresh token
    return LoginResponse.SUCCESS;
}
