import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import useChatStore from '../store/useChatStore';
import useCompatibilityStore from '../store/useCompatibilityStore';
import { MessageSquare, Heart, Clock, ChevronRight, User, Sparkles, Loader2, Calendar, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { chatHistory, fetchChatHistory, fetchSessionMessages, messages, isChatLoading } = useChatStore();
  const { matchHistory, fetchMatchHistory, fetchMatchDetails, matchData, isLoading: isMatchLoading } = useCompatibilityStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'chats') {
      fetchChatHistory();
    } else {
      fetchMatchHistory();
    }
  }, [activeTab]);

  const handleItemClick = async (item, type) => {
    if (type === 'chat') {
      const ok = await fetchSessionMessages(item._id);
      if (ok) {
        setSelectedItem({ type: 'chat', session: item });
        setIsModalOpen(true);
      }
    } else {
      const ok = await fetchMatchDetails(item._id);
      if (ok) {
        setSelectedItem({ type: 'match', match: item });
        setIsModalOpen(true);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending...';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getCompatibilityLevel = (score) => {
    if (score >= 28) return 'Divine Harmony';
    if (score >= 21) return 'Excellent Match';
    if (score >= 18) return 'Good Balance';
    return 'Challenging Match';
  };

  return (
    <div className="min-h-screen bg-[#F8F4EB] font-sans overflow-x-hidden flex flex-col relative z-0">
      {/* Dynamic Celestial Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C4A15A]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8C642A]/5 rounded-full blur-[120px]"></div>
      </div>
      
      <Navbar />
      
      <main className="flex-grow w-full px-8 py-16 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-serif text-[#4A3319] font-bold tracking-tight">Cosmic Records</h1>
          <p className="text-sm font-bold text-[#8B6E4A] uppercase tracking-[0.3em]">Revisit your soul's journey through time</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 rounded-full border-[#C4A15A]/20 shadow-xl flex">
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex items-center gap-3 px-10 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'chats' 
                ? 'bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] shadow-lg scale-105' 
                : 'text-[#8B6E4A] hover:text-[#4A3319] hover:bg-white/40'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              AI Consultations
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center gap-3 px-10 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'matches' 
                ? 'bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] shadow-lg scale-105' 
                : 'text-[#8B6E4A] hover:text-[#4A3319] hover:bg-white/40'
              }`}
            >
              <Heart className="w-5 h-5" />
              Soul Connections
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          {activeTab === 'chats' ? (
            <div className="space-y-6">
              {isChatLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-[#C4A15A]">
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <span className="text-xs font-bold tracking-widest uppercase">Retrieving Records...</span>
                </div>
              ) : chatHistory && chatHistory.length > 0 ? (
                chatHistory.map((session) => (
                  <div 
                    key={session._id} 
                    className="glass-card p-8 hover:shadow-2xl transition-all group cursor-pointer border-[#C4A15A]/10"
                    onClick={() => handleItemClick(session, 'chat')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FBF3E2] to-[#F1E4C1] flex items-center justify-center text-[#8C642A] border border-[#C4A15A]/20 shadow-inner group-hover:scale-110 transition-transform">
                          <MessageSquare className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-[#4A3319] group-hover:text-[#8C642A] transition-colors">{session.title || 'AI Consultation'}</h3>
                          <div className="flex items-center gap-6 mt-2 text-xs font-bold text-[#8B6E4A] uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4 opacity-60" /> {formatDate(session.createdAt)}</span>
                            <span className="flex items-center gap-2"><User className="w-4 h-4 opacity-60" /> {session.profile_id?.name || 'Self'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#C4A15A]/20 flex items-center justify-center text-[#C4A15A] group-hover:bg-[#C4A15A] group-hover:text-white transition-all">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 glass-card border-dashed border-[#C4A15A]/30">
                  <Sparkles className="w-16 h-16 text-[#C4A15A] mx-auto mb-6 opacity-30 animate-pulse" />
                  <p className="text-xl text-[#8B6E4A] font-serif italic mb-6">No cosmic interactions recorded yet.</p>
                  <button 
                    onClick={() => navigate('/chart')} 
                    className="px-8 py-3 rounded-full bg-[#C4A15A]/10 text-[#8C642A] font-bold border border-[#C4A15A]/20 hover:bg-[#C4A15A]/20 transition-all"
                  >
                    Start your first session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {isMatchLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-[#C4A15A]">
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <span className="text-xs font-bold tracking-widest uppercase">Aligning Connections...</span>
                </div>
              ) : matchHistory && matchHistory.length > 0 ? (
                matchHistory.map((match) => (
                  <div 
                    key={match._id} 
                    className="glass-card p-8 hover:shadow-2xl transition-all group cursor-pointer border-[#C4A15A]/10"
                    onClick={() => handleItemClick(match, 'match')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 w-full">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center text-red-400 border border-red-200 shadow-inner group-hover:scale-110 transition-transform">
                          <Heart className="w-8 h-8 fill-red-400/20" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif font-bold text-[#4A3319]">
                              {match.profile_1_id?.name} <span className="text-[#8B6E4A] font-light text-xl">&</span> {match.profile_2_id?.name}
                            </h3>
                            <div className="flex items-center gap-4">
                              <span className="text-3xl font-black gold-text-gradient">{match.total_score}/36</span>
                              <div className="h-1.5 w-32 bg-black/5 rounded-full overflow-hidden border border-white/40">
                                <div className="h-full bg-gradient-to-r from-red-400 to-pink-500 shadow-[0_0_8px_rgba(248,113,113,0.4)]" style={{ width: `${(match.total_score / 36) * 100}%` }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 mt-3 text-xs font-bold text-[#8B6E4A] uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 opacity-60" /> {formatDate(match.createdAt)}</span>
                            <span className="bg-[#C4A15A]/10 text-[#8C642A] px-3 py-1 rounded-full border border-[#C4A15A]/20">
                              {getCompatibilityLevel(match.total_score)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#C4A15A]/20 flex items-center justify-center text-[#C4A15A] group-hover:bg-[#C4A15A] group-hover:text-white transition-all ml-8">
                        <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-24 glass-card border-dashed border-[#C4A15A]/30">
                  <Heart className="w-16 h-16 text-[#C4A15A] mx-auto mb-6 opacity-30 animate-pulse" />
                  <p className="text-xl text-[#8B6E4A] font-serif italic mb-6">No soul connections explored yet.</p>
                  <button 
                    onClick={() => navigate('/compatibility')} 
                    className="px-8 py-3 rounded-full bg-[#C4A15A]/10 text-[#8C642A] font-bold border border-[#C4A15A]/20 hover:bg-[#C4A15A]/20 transition-all"
                  >
                    Check your harmony
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-[#F8F4EB] w-full max-w-3xl max-h-[85vh] rounded-[40px] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-[#C4A15A]/10 flex items-center justify-between bg-gradient-to-br from-[#FBF3E2] to-transparent">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                  {selectedItem?.type === 'chat' ? (
                    <MessageSquare className="w-7 h-7 text-[#8C642A]" />
                  ) : (
                    <Heart className="w-7 h-7 text-red-500 fill-red-500/10" />
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-[#4A3319]">
                    {selectedItem?.type === 'chat' ? selectedItem.session.title : 'Connection Details'}
                  </h3>
                  <p className="text-xs font-bold text-[#8B6E4A] uppercase tracking-widest mt-1">
                    Recorded on {selectedItem?.type === 'chat' ? formatDate(selectedItem.session.createdAt) : formatDate(selectedItem.match.createdAt)}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-black/5 rounded-full transition-colors">
                <X className="w-8 h-8 text-[#8B6E4A]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-10 bg-white/30">
              {selectedItem?.type === 'chat' ? (
                <div className="space-y-6">
                  {(messages || []).map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-6 py-4 rounded-[24px] text-sm leading-relaxed shadow-sm transition-all hover:shadow-md ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] rounded-tr-none' 
                          : 'bg-white border border-[#C4A15A]/10 text-[#4A3319] rounded-tl-none font-medium'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-10">
                  {/* Score Header */}
                  <div className="bg-white/80 p-10 rounded-[32px] border border-[#C4A15A]/10 text-center shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C4A15A] to-[#8C642A]"></div>
                    <div className="text-7xl font-black gold-text-gradient mb-4">{matchData?.total_score}</div>
                    <div className="text-sm font-bold uppercase tracking-[0.4em] text-[#8B6E4A] mb-2">Harmony Score</div>
                    <div className="text-2xl font-serif italic text-[#4A3319]">{getCompatibilityLevel(matchData?.total_score)}</div>
                  </div>

                  {/* AI Summary */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B6E4A] flex items-center gap-3">
                      <Sparkles className="w-5 h-5" /> Celestial Interpretation
                    </h4>
                    <div className="bg-white p-8 rounded-[32px] border border-[#C4A15A]/10 text-[#4A3319] text-base leading-relaxed italic font-medium shadow-inner">
                      "{matchData?.ai_summary}"
                    </div>
                  </div>

                  {/* Guna Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Nadi', score: matchData?.nadi, max: 8 },
                      { label: 'Bhakoot', score: matchData?.bhakoot, max: 7 },
                      { label: 'Gana', score: matchData?.gana, max: 6 },
                      { label: 'Maitri', score: matchData?.maitri, max: 5 },
                      { label: 'Yoni', score: matchData?.yoni, max: 4 },
                      { label: 'Tara', score: matchData?.tara, max: 3 },
                      { label: 'Vashya', score: matchData?.vashya, max: 2 },
                      { label: 'Varna', score: matchData?.varna, max: 1 },
                    ].map(guna => (
                      <div key={guna.label} className="bg-white p-4 rounded-2xl border border-[#C4A15A]/10 text-center shadow-sm hover:shadow-md transition-all">
                        <div className="text-[10px] font-bold text-[#8B6E4A] uppercase tracking-widest mb-1">{guna.label}</div>
                        <div className="text-xl font-black text-[#4A3319]">{guna.score}<span className="text-xs font-bold text-[#8B6E4A]/40 ml-1">/{guna.max}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
