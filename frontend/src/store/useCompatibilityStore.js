import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import { toast } from 'react-hot-toast';

const useCompatibilityStore = create((set) => ({
  matchData: null,
  matchHistory: [],
  quickMatchData: null,
  isLoading: false,
  error: null,

  calculateMatch: async (person1, person2) => {
    set({ isLoading: true, error: null, matchData: null });
    try {
      const response = await axiosInstance.post('/kundliMatch/match', { person1, person2 });
      if (response.data.success) {
        set({ matchData: response.data.data, isLoading: false });
        toast.success("Compatibility calculated!");
        return true;
      }
    } catch (error) {
      console.error("Error calculating match:", error);
      const msg = error.response?.data?.message || 'Failed to calculate compatibility.';
      set({ 
        error: msg,
        isLoading: false 
      });
      toast.error(msg);
      return false;
    }
  },

  fetchMatchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/kundliMatch/matches');
      if (response.data.success) {
        set({ matchHistory: response.data.data, isLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch match history', isLoading: false });
    }
  },

  fetchMatchDetails: async (matchId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/kundliMatch/match/${matchId}`);
      if (response.data.success) {
        set({ matchData: response.data.data, isLoading: false });
        return true;
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch match details', isLoading: false });
      return false;
    }
  },

  fetchQuickMatch: async (sign1, sign2) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/compatibility/get-compatibility/${sign1}/${sign2}`);
      if (response.data.success) {
        set({ quickMatchData: response.data.data, isLoading: false });
        return true;
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch quick match', isLoading: false });
      return false;
    }
  },

  clearMatchData: () => set({ matchData: null, quickMatchData: null, error: null })
}));

export default useCompatibilityStore;
