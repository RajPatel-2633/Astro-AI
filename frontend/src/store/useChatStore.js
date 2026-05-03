import { create } from 'zustand';
import axiosInstance from '../utils/axios';

const useChatStore = create((set, get) => ({
  sessionId: null,
  messages: [],
  chatHistory: [],
  isChatLoading: false,
  error: null,

  initChat: async (userId, profileId, title = "Consultation") => {
    set({ isChatLoading: true, error: null, messages: [] });
    try {
      const response = await axiosInstance.post('/chat/initialise-chat', {
        user_id: userId,
        profile_id: profileId,
        title
      });

      if (response.data.success) {
        const { session, greeting } = response.data.data;
        set({ 
          sessionId: session._id, 
          messages: [{ role: 'model', content: greeting }],
          isChatLoading: false 
        });
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
      set({ 
        error: error.response?.data?.message || 'Failed to initialize chat.',
        isChatLoading: false 
      });
    }
  },

  sendMessage: async (message) => {
    const { sessionId, messages } = get();
    if (!sessionId || !message.trim()) return;

    // Optimistically add user message
    const newMessage = { role: 'user', content: message };
    set({ 
      messages: [...messages, newMessage],
      isChatLoading: true,
      error: null
    });

    try {
      const response = await axiosInstance.post(`/chat/send-message/${sessionId}`, { message });
      
      if (response.data.success) {
        const aiResponse = response.data.data.response;
        set({ 
          messages: [...get().messages, { role: 'model', content: aiResponse }],
          isChatLoading: false 
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      set({ 
        error: error.response?.data?.message || 'Failed to send message.',
        isChatLoading: false 
      });
      // Optionally remove the optimistically added message if it fails
    }
  },

  fetchChatHistory: async () => {
    set({ isChatLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/chat/sessions');
      if (response.data.success) {
        set({ chatHistory: response.data.data, isChatLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch sessions', isChatLoading: false });
    }
  },

  fetchSessionMessages: async (sessionId) => {
    set({ isChatLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/chat/messages/${sessionId}`);
      if (response.data.success) {
        set({ 
          messages: response.data.data, 
          sessionId, 
          isChatLoading: false 
        });
        return true;
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch messages', isChatLoading: false });
      return false;
    }
  },

  clearChat: () => set({ sessionId: null, messages: [], error: null })
}));

export default useChatStore;
