import { getAccessToken, setAccessToken } from "./session";

import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

async function refreshAccessToken(): Promise<string | null> {
  try {
    const resp = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!resp.ok) return null;

    const data = await resp.json();
    const newToken = data.token;

    setAccessToken(newToken, data.tokenExpires);
    return newToken;
  } catch {
    return null;
  }
}

// 1. Define custom interface to include the _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 2. Queue Type Definitions
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });

  failedQueue = [];
};

// 3. Create the instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 4. Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 5. Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // If no config exists (rare), just reject
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = "Bearer " + token;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // REPLACE THIS WITH YOUR ACTUAL REFRESH LOGIC
        // const { data } = await axios.post<{ accessToken: string }>('/refresh-token', {
        //   refreshToken: localStorage.getItem('refresh_token')
        // });
        // const newToken = data.accessToken;

        const newToken = await refreshAccessToken(); // Mock for example

        // Update defaults for subsequent requests
        apiClient.defaults.headers.common["Authorization"] =
          "Bearer " + newToken;

        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = "Bearer " + newToken;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue: Array<(token: string | null) => void> = [];

// function processQueue(token: string | null) {
//   failedQueue.forEach((cb) => cb(token));
//   failedQueue = [];
// }

// async function refreshAccessToken(): Promise<string | null> {
//   try {
//     const resp = await fetch("/api/auth/refresh", {
//       method: "POST",
//       credentials: "include",
//     });

//     if (!resp.ok) return null;

//     const data = await resp.json();
//     const newToken = data.token;

//     setAccessToken(newToken, data.tokenExpires);
//     return newToken;
//   } catch {
//     return null;
//   }
// }

// // Add Authorization on every request
// // apiClient.interceptors.request.use((config) => {
// //   const token = getAccessToken();

// //   if (token) {
// //     config.headers = config.headers || {};
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }

// //   return config;
// // });

// // // Retry logic
// // apiClient.interceptors.response.use(
// //   (res) => res,

// //   async (error) => {
// //     const originalReq = error.config;

// //     if (error.response?.status !== 401 || originalReq._retry) {
// //       return Promise.reject(error);
// //     }

// //     originalReq._retry = true;

// //     // one refresh at a time
// //     if (!isRefreshing) {
// //       isRefreshing = true;

// //       const newToken = await refreshAccessToken();
// //       isRefreshing = false;

// //       // wake queued requests
// //       processQueue(newToken);

// //       if (!newToken) {
// //         // refresh failed → force logout
// //         return Promise.reject(error);
// //       }
// //     }

// //     return new Promise((resolve, reject) => {
// //       failedQueue.push(async (token) => {
// //         if (!token) return reject(error);

// //         try {
// //           originalReq.headers = originalReq.headers || {};
// //           originalReq.headers.Authorization = `Bearer ${token}`;

// //           const result = await apiClient(originalReq);
// //           resolve(result);
// //         } catch (err) {
// //           reject(err);
// //         }
// //       });
// //     });
// //   }
// // );

// export default apiClient;
