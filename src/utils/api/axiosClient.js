import axios from 'axios';
import { updateTokens, logout } from 'store/actions/auth.actions';
import API_METHODS from 'config/api-methods';

let axiosClient = null;

class AxiosClient {
  constructor(props = {}) {
    Object.keys(props).forEach((propName) => {
      this[`_${propName}`] = props[propName];
    });

    const localAxios = axios.create({
      baseURL: this._API_URL,
    });

    const refreshAxios = axios.create({
      baseURL: this._API_URL,
    });

    localAxios.interceptors.request.use((config) => {
      const { authState = {} } = this._store.getState();
      const { accessToken = '' } = authState;
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (accessToken) {
        headers.Authorization = config.headers.Authorization || `Bearer ${accessToken}`;
      }
      return {
        ...config,
        headers,
      };
    });

    localAxios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      async (error) => {
        const { response = {} } = error;

        const isAuthorizedRequestFailed = response.status === 401 && response.config.headers.Authorization;

        if (!isAuthorizedRequestFailed) {
          return {
            statusCode: response.status,
            ...response.data,
          };
        }

        this.refreshToken();

        const { config: originalRequest = {} } = error;

        return new Promise((resolve, reject) => {
          this.addSubscriber((newAccessToken) => {
            if (!newAccessToken) {
              return reject({ error: 'refreshTokenError' });
            }
            originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
            originalRequest.baseURL = '';
            resolve(this._client.request(originalRequest));
          });
        });
      }
    );

    this._client = localAxios;
    this._refreshClient = refreshAxios;
  }

  subscribers = [];
  isAlreadyFetchingAccessToken = false;

  onAccessTokenFetched(access_token) {
    this.subscribers = this.subscribers.filter((callback) => callback(access_token));
  }

  onAccessTokenError() {
    this.subscribers = this.subscribers.filter((callback) => callback(''));
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  refreshToken() {
    if (!this.isAlreadyFetchingAccessToken) {
      this.isAlreadyFetchingAccessToken = true;

      const { authState = {} } = this._store.getState();
      const { refreshToken = '' } = authState;

      this._refreshClient.put(`${API_METHODS.AUTH_REFRESH}?token=${refreshToken}`).then(
        (refreshResponse) => {
          const { data = {} } = refreshResponse.data;
          const { accessToken: newAccessToken } = data;
          this.isAlreadyFetchingAccessToken = false;
          this.onAccessTokenFetched(newAccessToken);
          this._store.dispatch(updateTokens(data));
        },
        (refreshError) => {
          const { response: refreshErrorResponse = {} } = refreshError;
          if (refreshErrorResponse.status === 401 || refreshErrorResponse.status === 403) {
            this.isAlreadyFetchingAccessToken = false;
            this.onAccessTokenError();
            this._store.dispatch(logout());
          } else {
            setTimeout(() => this.refreshToken(), 1500);
          }
        }
      );
    }
  }

  getAxios() {
    return this._client;
  }
}

/*
 * Initialization
 * @param {object} props - some properties
 */
function init(props) {
  axiosClient = new AxiosClient(props);
}

/*
 * Will return new instance of Axios
 * @returns {object}
 */
function getAxios() {
  return axiosClient.getAxios();
}

export { init, getAxios };
