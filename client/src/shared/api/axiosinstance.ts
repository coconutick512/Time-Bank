import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(token: string): void {
  accessToken = token;
}

type CustomAxiosRequestConfigType = {
  send?: boolean;
} & InternalAxiosRequestConfig;

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.get('Authorization')) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: CustomAxiosRequestConfigType }) => {
    const { config } = error;

    if (error.response?.status === 403 && !config.send) {
      const res = await axiosInstance.get<{ accessToken: string }>('/auth/refresh');
      setAccessToken(res.data.accessToken);
      config.send = true;
      config.headers.set('Authorization', `Bearer ${accessToken}`);
      return axiosInstance(config);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;