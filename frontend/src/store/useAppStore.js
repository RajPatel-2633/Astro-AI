import { create } from 'zustand'
import axiosInstance from '../utils/axios';
import { toast } from 'react-hot-toast';

const useAppStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // initial check auth loading
  isAuthLoading: false, // form submit loading
  error: null,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('/auth/profile');
      if (response.data.success) {
        set({ user: response.data.data, isAuthenticated: true, error: null });
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isAuthLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      if (response.data.success) {
        // Fetch profile to get user details
        const profileRes = await axiosInstance.get('/auth/profile');
        set({ user: profileRes.data.data, isAuthenticated: true, isAuthLoading: false });
        toast.success(`Welcome back, ${profileRes.data.data.name}!`);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      set({ 
        error: msg,
        isAuthLoading: false 
      });
      toast.error(msg);
      return false;
    }
  },

  signup: async (name, email, password) => {
    set({ isAuthLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/auth/register', { name, email, password });
      if (response.data.success) {
        // Automatically log them in after signup
        const loginRes = await axiosInstance.post('/auth/login', { email, password });
        if (loginRes.data.success) {
           const profileRes = await axiosInstance.get('/auth/profile');
           set({ user: profileRes.data.data, isAuthenticated: true, isAuthLoading: false });
           toast.success("Account created successfully!");
        }
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      set({ 
        error: msg,
        isAuthLoading: false 
      });
      toast.error(msg);
      return false;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ user: null, isAuthenticated: false });
      toast.success("Signed out successfully");
    } catch (error) {
      console.error('Logout failed', error);
      toast.error("Logout failed");
    }
  },
  
  updateUserProfile: async (updateData) => {
    set({ isAuthLoading: true, error: null });
    try {
      const res = await axiosInstance.patch('/auth/update-profile', updateData);
      if (res.data.success) {
        set({ user: res.data.data, isAuthLoading: false });
        toast.success("Profile updated successfully");
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Update failed';
      set({ error: msg, isAuthLoading: false });
      toast.error(msg);
      return false;
    }
  },

  clearError: () => set({ error: null })
}))

export default useAppStore
