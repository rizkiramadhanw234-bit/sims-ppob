import axios from "axios";

const api = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
  timeout: 15000,
});

// inject token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Debug logging
    console.log("Request interceptor:", {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      isFormData: config.data instanceof FormData,
      currentHeaders: config.headers,
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// error handling
api.interceptors.response.use(
  (res) => {
    console.log("Response received:", {
      url: res.config.url,
      status: res.status,
      data: res.data,
    });
    return res;
  },
  (err) => {
    console.error("Response error:", {
      url: err.config?.url,
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    return Promise.reject(err);
  }
);

export default api;
