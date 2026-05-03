import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import { toast } from 'react-hot-toast';

const useAstroStore = create((set) => ({
  profiles: [],
  chartData: null,
  allHoroscopes: [],
  activeProfileId: null,
  isLoading: false,
  error: null,

  fetchProfiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/birthProfile/get-profile');
      if (response.data.success) {
        set({ profiles: response.data.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch profiles', isLoading: false });
    }
  },

  fetchChartByProfileId: async (profileId) => {
    set({ isLoading: true, error: null, chartData: null, activeProfileId: profileId });
    try {
      const chartRes = await axiosInstance.get(`/charts/${profileId}`);
      if (chartRes.data.success) {
        set({ chartData: chartRes.data.data, isLoading: false });
        return true;
      }
    } catch (error) {
      // If chart not found, automatically generate it
      if (error.response?.status === 404) {
        try {
          const chartRes = await axiosInstance.post('/charts/generate', { profile_id: profileId });
          if (chartRes.data.success) {
            set({ chartData: chartRes.data.data, isLoading: false });
            toast.success("Birth chart generated successfully!");
            return true;
          }
        } catch (genError) {
          const msg = genError.response?.data?.message || 'Failed to generate chart.';
          set({ 
            error: msg,
            isLoading: false 
          });
          toast.error(msg);
          return false;
        }
      }

      set({ 
        error: error.response?.data?.message || 'Failed to fetch chart.',
        isLoading: false 
      });
      return false;
    }
  },

  generateChart: async (formData) => {
    set({ isLoading: true, error: null, chartData: null });
    
    try {
      // 1. Create the Birth Profile
      const profileRes = await axiosInstance.post('/birthProfile/create-profile', formData);
      
      if (profileRes.data.success) {
        const profileId = profileRes.data.data._id;
        
        // 2. Generate/Fetch the Chart using the profile ID
        const chartRes = await axiosInstance.post('/charts/generate', { profile_id: profileId });
        
        if (chartRes.data.success) {
          set({ chartData: chartRes.data.data, activeProfileId: profileId, isLoading: false });
          // Fetch profiles again to update the list
          const profilesResp = await axiosInstance.get('/birthProfile/get-profile');
          if (profilesResp.data.success) {
            set({ profiles: profilesResp.data.data });
          }
          toast.success("Birth chart created successfully!");
          return true;
        }
      }
    } catch (error) {
      console.error("Error generating chart:", error);
      const msg = error.response?.data?.message || 'Failed to generate chart. Please try again.';
      set({ 
        error: msg,
        isLoading: false 
      });
      toast.error(msg);
      return false;
    }
  },

  clearChart: () => set({ chartData: null, error: null, activeProfileId: null }),

  deleteProfile: async (profileId) => {
    try {
      await axiosInstance.delete(`/birthProfile/delete-profile/${profileId}`);
      // Remove from local state and clear chart if it was active
      set(state => ({
        profiles: state.profiles.filter(p => p._id !== profileId),
        chartData: state.activeProfileId === profileId ? null : state.chartData,
        activeProfileId: state.activeProfileId === profileId ? null : state.activeProfileId,
      }));
      toast.success("Profile deleted successfully");
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete profile';
      set({ error: msg });
      toast.error(msg);
      return false;
    }
  },

  updateProfile: async (profileId, updateData) => {
    try {
      const res = await axiosInstance.patch(`/birthProfile/update-profile/${profileId}`, updateData);
      if (res.data.success) {
        // Update the profile in the local list
        set(state => ({
          profiles: state.profiles.map(p => p._id === profileId ? { ...p, ...res.data.data } : p)
        }));
        toast.success("Profile updated successfully");
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      set({ error: msg });
      toast.error(msg);
      return false;
    }
  },

  fetchProfileById: async (profileId) => {
    try {
      const res = await axiosInstance.get(`/birthProfile/get-profilebyid/${profileId}`);
      if (res.data.success) return res.data.data;
    } catch (error) {
      console.error('Failed to fetch profile by ID:', error.message);
    }
    return null;
  },

  fetchAllHoroscopes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/astro/horoscopes/today');
      if (response.data.success) {
        set({ allHoroscopes: response.data.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch horoscopes', isLoading: false });
    }
  },
}));

export default useAstroStore;
