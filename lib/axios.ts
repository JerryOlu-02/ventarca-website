import axios from "axios";

let accessToken: string | null = null;
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

// Helper to process queued requests after refresh completes
function processQueue(error: any, token: string | null = null) {
  refreshQueue.forEach((callback) => {
    if (token) callback(token);
  });

  refreshQueue = [];
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: process.env.NODE_ENV === "production",
});

apiClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If backend returns 401, attempt refresh:
      if (isRefreshing) {
        // queue request until refresh completes
        return new Promise((resolve) => {
          refreshQueue.push((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // Call Next.js route which proxies to backend refresh
        const refreshResponse = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        const data = await refreshResponse.json();

        if (!refreshResponse.ok) {
          setAccessToken(null);

          processQueue(null, null);

          isRefreshing = false;

          refreshQueue = [];

          return Promise.reject(error);
        }

        const newToken = data.accessToken;

        setAccessToken(newToken);

        processQueue(null, newToken);

        isRefreshing = false;

        // Retry failed request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
