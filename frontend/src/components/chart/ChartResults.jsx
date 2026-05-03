import React, { useEffect, useState, useRef } from 'react';
import { Send, User, Sparkles, Star, Map, Compass, TrendingUp, TrendingDown, Briefcase, Heart, Coins } from 'lucide-react';
import { AnimatedKundliChart } from '../Graphics';
import useChatStore from '../../store/useChatStore';
import useAppStore from '../../store/useAppStore';
import useAstroStore from '../../store/useAstroStore';

const InfoCard = ({ title, icon: Icon, children }) => (
  <div className="bg-parchment p-5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[#8B6E4A]/20 relative overflow-hidden group hover:shadow-[0_8px_25px_rgba(139,110,74,0.15)] transition-all">
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] opacity-50 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex items-center gap-3 mb-3 border-b border-[#8B6E4A]/10 pb-2">
      <div className="p-1.5 rounded-md bg-[#EBD6A7]/50 text-[#8B6E4A]">
        <Icon className="w-4 h-4" />
      </div>
      <h4 className="font-serif font-bold text-[#4A3319] text-lg tracking-wide">{title}</h4>
    </div>
    <div className="text-[#5c3a1d] text-sm leading-relaxed font-medium">
      {children}
    </div>
  </div>
);

const ChartResults = ({ chartData }) => {
  const { user } = useAppStore();
  const { activeProfileId } = useAstroStore();
  const { initChat, sendMessage, messages, isChatLoading } = useChatStore();
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // Initialize Chat when component mounts with active profile
  useEffect(() => {
    if (user?._id && activeProfileId) {
      initChat(user._id, activeProfileId);
    }
  }, [user?._id, activeProfileId, initChat]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatLoading]);

  const handleSend = () => {
    if (chatInput.trim() && !isChatLoading) {
      sendMessage(chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="w-full bg-[#EBD6A7] min-h-screen py-12 px-[4vw] relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1400px] space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4A3319] font-bold">Your Celestial Blueprint</h2>
          <p className="text-xl text-[#8B6E4A] italic">Calculated with precision</p>
        </div>

        {/* Main Layout: 3 Columns on very large screens, 2 on lg, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(400px,30vw)] gap-8 h-full">
          
          {/* Left Area: Chart and Cards */}
          <div className="space-y-8 flex flex-col">
            
            {/* Vedic Chart Visual */}
            <div className="bg-parchment rounded-2xl shadow-xl border border-[#8B6E4A]/30 p-8 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B6E4A]/40"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8B6E4A]/40"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8B6E4A]/40"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B6E4A]/40"></div>
              
              <div className="w-full max-w-[400px]">
                 <AnimatedKundliChart chartData={chartData} />
              </div>
              
              <p className="mt-6 text-[#8B6E4A] font-medium tracking-wide uppercase text-sm border-t border-[#8B6E4A]/20 pt-4 w-full text-center">North Indian Style Chart</p>
            </div>

            {/* 8 Informational Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard title="Birth Positions" icon={Star}>
                {chartData && chartData.planets ? (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    <span className="col-span-2 border-b border-[#8B6E4A]/10 pb-1 mb-1">
                      <span className="font-bold">Lagna (Asc):</span> {chartData.ascendant}
                    </span>
                    <span className="col-span-2 border-b border-[#8B6E4A]/10 pb-1 mb-1">
                      <span className="font-bold">Nakshatra:</span> {chartData.nakshatra} (Pada {chartData.nakshatra_pada})
                    </span>
                    {chartData.planets.slice(0, 8).map((planet, idx) => (
                      <span key={idx}>
                        <span className="font-bold">{planet.name.substring(0, 4)}:</span> {planet.sign} {Math.round(planet.degree)}° {planet.is_retrograde ? '(R)' : ''}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    <span><span className="font-bold">Sun:</span> Aries 12°</span>
                    <span><span className="font-bold">Moon:</span> Taurus 5°</span>
                    <span><span className="font-bold">Mars:</span> Leo 22°</span>
                    <span><span className="font-bold">Merc:</span> Pisces 8°</span>
                    <span><span className="font-bold">Jup:</span> Cancer 15°</span>
                    <span><span className="font-bold">Ven:</span> Gemini 2°</span>
                  </div>
                )}
              </InfoCard>

              <InfoCard title="Current Transits" icon={Map}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#8B6E4A]">
                  <span><span className="font-bold text-[#5c3a1d]">Sun:</span> Pisces 20°</span>
                  <span><span className="font-bold text-[#5c3a1d]">Moon:</span> Virgo 11°</span>
                  <span><span className="font-bold text-[#5c3a1d]">Mars:</span> Aqua 4°</span>
                  <span><span className="font-bold text-[#5c3a1d]">Sat:</span> Pisces 12°</span>
                </div>
              </InfoCard>

              <InfoCard title="Exalted Planets" icon={TrendingUp}>
                <p>{typeof chartData?.interpretations?.exalted_planets === 'string' ? chartData.interpretations.exalted_planets : (chartData?.interpretations?.exalted_planets ? JSON.stringify(chartData.interpretations.exalted_planets) : "AI interpretation unavailable for legacy charts. Please generate a new chart.")}</p>
              </InfoCard>

              <InfoCard title="Strong Placements" icon={Compass}>
                <p>{typeof chartData?.interpretations?.strong_placements === 'string' ? chartData.interpretations.strong_placements : (chartData?.interpretations?.strong_placements ? JSON.stringify(chartData.interpretations.strong_placements) : "AI interpretation unavailable for legacy charts. Please generate a new chart.")}</p>
              </InfoCard>

              <InfoCard title="Weaker Placements" icon={TrendingDown}>
                <p>{typeof chartData?.interpretations?.weaker_placements === 'string' ? chartData.interpretations.weaker_placements : (chartData?.interpretations?.weaker_placements ? JSON.stringify(chartData.interpretations.weaker_placements) : "AI interpretation unavailable for legacy charts. Please generate a new chart.")}</p>
              </InfoCard>

              <InfoCard title="Profession" icon={Briefcase}>
                <p>{typeof chartData?.interpretations?.profession === 'string' ? chartData.interpretations.profession : (chartData?.interpretations?.profession ? JSON.stringify(chartData.interpretations.profession) : "AI interpretation unavailable for legacy charts. Please generate a new chart.")}</p>
              </InfoCard>

              <InfoCard title="Love Life" icon={Heart}>
                <p>{typeof chartData?.interpretations?.love_life === 'string' ? chartData.interpretations.love_life : (chartData?.interpretations?.love_life ? JSON.stringify(chartData.interpretations.love_life) : "AI interpretation unavailable for legacy charts. Please generate a new chart.")}</p>
              </InfoCard>

              <InfoCard title="Wealth & Assets" icon={Coins}>
                <p>{typeof chartData?.interpretations?.wealth === 'string' ? chartData.interpretations.wealth : (chartData?.interpretations?.wealth ? JSON.stringify(chartData.interpretations.wealth) : "AI interpretation unavailable for legacy charts. Please generate a new chart.")}</p>
              </InfoCard>
            </div>

          </div>

          {/* Right Column: AI Astrologer Chat */}
          <div className="bg-parchment rounded-2xl shadow-xl border border-[#8B6E4A]/40 flex flex-col h-[800px] lg:h-auto overflow-hidden sticky top-24">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#C4A15A] to-[#8C642A] p-6 text-white flex items-center gap-4 shadow-md z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                <Sparkles className="w-6 h-6 text-[#FFF5E1]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-wide">Astro AI Sage</h3>
                <p className="text-sm text-white/80 font-medium">Your personal cosmic guide</p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-6 bg-white/30 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,174,117,0.1)_0%,transparent_100%)] pointer-events-none"></div>
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 border ${msg.role === 'user' ? 'bg-[#EBD6A7] border-[#8B6E4A]/30' : 'bg-gradient-to-b from-[#C4A15A] to-[#8C642A]'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-[#8B6E4A]" /> : <Sparkles className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`${msg.role === 'user' ? 'bg-[#EBD6A7]/50 rounded-tr-none' : 'bg-white rounded-tl-none'} p-4 rounded-2xl shadow-sm border border-[#8B6E4A]/20 text-[#4A3319] leading-relaxed relative z-10 whitespace-pre-wrap`}>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex gap-4 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] flex-shrink-0 flex items-center justify-center mt-1">
                     <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-[#8B6E4A]/20 text-[#4A3319] leading-relaxed relative z-10 flex items-center gap-2 h-12">
                    <span className="w-2 h-2 bg-[#8B6E4A]/50 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#8B6E4A]/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-[#8B6E4A]/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-[#8B6E4A]/20">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask the cosmos..." 
                  className="w-full bg-white border border-[#8B6E4A]/30 rounded-full py-4 pl-6 pr-16 text-[#4A3319] placeholder-[#8B6E4A]/50 focus:outline-none focus:ring-2 focus:ring-[#C19E63] shadow-inner transition-all disabled:opacity-50"
                  disabled={isChatLoading}
                />
                <button 
                  onClick={handleSend}
                  disabled={isChatLoading || !chatInput.trim()} 
                  className="absolute right-2 w-10 h-10 bg-gradient-to-r from-[#C4A15A] to-[#8C642A] rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChartResults;
