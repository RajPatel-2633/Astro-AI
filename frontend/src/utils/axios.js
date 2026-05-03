import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  withCredentials: true,
});

// Response interceptor to handle token expiration (401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Avoid infinite loop if the refresh endpoint itself fails or user is authenticating
      if (
        originalRequest.url === '/auth/newAccessToken' || 
        originalRequest.url === '/auth/login' || 
        originalRequest.url === '/auth/register'
      ) {
        return Promise.reject(error);
      }

      try {
        // Silently request a new access token using the HttpOnly refresh cookie
        await axiosInstance.get('/auth/newAccessToken');
        
        // If successful, the backend has set a new access token cookie.
        // We can now retry the original failed request.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If the refresh token is also expired or invalid, the refresh request fails.
        // The user needs to log in again.
        // You could also trigger a store logout here if needed:
        // useAppStore.getState().set({ user: null, isAuthenticated: false });
        
        return Promise.reject(refreshError);
      }
    }

    // Return any other errors as they are
    return Promise.reject(error);
  }
);

export default axiosInstance;
