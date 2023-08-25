import axios, { AxiosError, AxiosInstance } from 'axios';
import { AppErro } from '@utils/AppErro';
import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';

type SignOut = () => void;
type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}
const api = axios.create({
  baseURL: 'http://192.168.0.181:3333'
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;


api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => {
    return response;
  }, async (requestError) => {
    console.log(requestError);

    if (requestError?.response?.status === 401) {
      if (requestError.response.data?.message === 'token.expired' ||
        requestError.response.data?.message === 'token.invalid') {
        const storageToken = await storageAuthTokenGet();

        if (!storageToken) {
          signOut();
          return Promise.reject(requestError);
        }

        const originalRequestConfig = requestError.config;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push(({
              onSuccess: (token) => {
                originalRequestConfig.headers = {'Authorization': `Bearer ${token}`};
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            }));
          });
        }

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            const {data} = await api.post('/sessions/refresh-token', {
              refresh_token: storageToken.refresh_token
            });

            await storageAuthTokenSave(data.token, data.refresh_token);
            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }
            originalRequestConfig.headers = {'Authorization': `Bearer ${data.token}`};
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueue.forEach(request => {
              request.onSuccess(data.token);
            });

            console.log(`${(new Date())} _ token atualizado`);
            resolve(api(originalRequestConfig));

          } catch (error: any) {

            failedQueue.forEach(request => {
              request.onFailure(error);
            });

            signOut();
            reject(error);

          } finally {
            isRefreshing = false;
            failedQueue = [];
          }
        });

      }
      signOut();
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppErro(requestError.response.data.message));
    }
    return Promise.reject(requestError);
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

api.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

export { api };



