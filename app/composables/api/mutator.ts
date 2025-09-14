import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (process.client) {
      // const authStore = useAuthStore();
      // const accessToken = authStore.accessToken;
      // if (accessToken) {
      //   config.headers.Authorization = `Bearer ${accessToken}`;
      // }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      process.client &&
      error.response?.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true;

      try {
        // const { miniApp } = useTelegram();
        // const authStore = useAuthStore();

        // const { token } = await authStore.login(miniApp?.initData ?? "");

        // error.config.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(error.config);
      } catch (loginError) {
        return Promise.reject(loginError);
      }
    }

    return Promise.reject(error);
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = axiosInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }: AxiosResponse<T>) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = AxiosResponse<Error>;
export type BodyType<BodyData> = BodyData;
