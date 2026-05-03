import { create } from 'zustand';
import axiosInstance from '../utils/axios';
import { toast } from 'react-hot-toast';

const useTransitStore = create((set, get) => ({
  transits: [],
  userAlerts: [],
  isLoading: false,
  isSubscribing: false,
  error: null,

  fetchTransits: async (sign = null) => {
    set({ isLoading: true, error: null });
    try {
      const params = sign ? { sign } : {};
      const response = await axiosInstance.get('/transit/get-transits', { params });
      if (response.data.success) {
        set({ transits: response.data.data, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch transits',
        isLoading: false 
      });
    }
  },

  fetchUserAlerts: async () => {
    try {
      const response = await axiosInstance.get('/transit/get-alert');
      if (response.data.success) {
        set({ userAlerts: response.data.data });
      }
    } catch (error) {
      console.error('Failed to fetch user alerts:', error.message);
    }
  },

  subscribeToAlert: async (transit_id, profile_id, notify_via = 'push') => {
    set({ isSubscribing: true });
    try {
      const response = await axiosInstance.post('/transit/alerts', {
        transit_id,
        profile_id,
        notify_via
      });
      if (response.data.success) {
        // Add the new alert to the local state immediately
        set(state => ({
          userAlerts: [...state.userAlerts, response.data.data],
          isSubscribing: false
        }));
        toast.success("Subscribed to cosmic alert!");
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to subscribe';
      console.error('Failed to subscribe to alert:', msg);
      set({ isSubscribing: false });
      toast.error(msg);
      return false;
    }
  },

  unsubscribeFromAlert: async (alert_id) => {
    set({ isSubscribing: true });
    try {
      await axiosInstance.delete(`/transit/alerts/${alert_id}`);
      // Remove from local state immediately
      set(state => ({
        userAlerts: state.userAlerts.filter(a => a._id !== alert_id),
        isSubscribing: false
      }));
      toast.success("Alert removed");
      return true;
    } catch (error) {
      const msg = error.message || 'Failed to unsubscribe';
      console.error('Failed to unsubscribe from alert:', msg);
      set({ isSubscribing: false });
      toast.error(msg);
      return false;
    }
  },

  // Helper: check if user is already subscribed to a specific transit
  isSubscribedTo: (transit_id) => {
    return get().userAlerts.some(a => {
      const id = a.transit_id?._id || a.transit_id;
      return id?.toString() === transit_id?.toString();
    });
  },

  // Helper: get the alert ID for a given transit (needed to unsubscribe)
  getAlertIdFor: (transit_id) => {
    const alert = get().userAlerts.find(a => {
      const id = a.transit_id?._id || a.transit_id;
      return id?.toString() === transit_id?.toString();
    });
    return alert?._id;
  }
}));

export default useTransitStore;
