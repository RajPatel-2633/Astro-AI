import React from 'react';
import { Send, User, Sparkles, Star, Map, ShieldAlert, Heart, Home, Baby, Activity, Scale, Zap, ShieldCheck } from 'lucide-react';
import { AnimatedKundliChart } from '../Graphics';

const InfoCard = ({ title, icon: Icon, children }) => (
  <div className="bg-parchment p-5 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-[#8B6E4A]/20 relative overflow-hidden group hover:shadow-[0_8px_25px_rgba(139,110,74,0.15)] transition-all">
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] opacity-50 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex items-center gap-3 mb-3 border-b border-[#8B6E4A]/10 pb-2">
      <div className="p-1.5 rounded-md bg-[#EBD6A7]/50 text-[#8B6E4A]">
        <Icon className="w-4 h-4" />
      </div>
      <h4 className="font-serif font-bold text-[#4A3319] text-sm lg:text-base tracking-wide leading-tight">{title}</h4>
    </div>
    <div className="text-[#5c3a1d] text-xs lg:text-sm leading-relaxed font-medium">
      {children}
    </div>
  </div>
);

const KundliResults = () => {
  return (
    <div className="w-full bg-[#EBD6A7] min-h-screen py-12 px-[4vw] relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1400px] space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4A3319] font-bold">Cosmic Compatibility</h2>
          <p className="text-xl text-[#8B6E4A] italic">The divine alignment of two souls</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(400px,30vw)] gap-8 h-full">
          
          {/* Left Area: Charts and Cards */}
          <div className="space-y-8 flex flex-col">
            
            {/* Dual Vedic Chart Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Chart 1 */}
              <div className="bg-parchment rounded-2xl shadow-xl border border-[#8B6E4A]/30 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B6E4A]/40"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8B6E4A]/40"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8B6E4A]/40"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B6E4A]/40"></div>
                
                <h3 className="font-serif text-[#4A3319] text-xl font-bold mb-4 w-full text-center border-b border-[#8B6E4A]/20 pb-2">Person 1 Chart</h3>
                <div className="w-full max-w-[280px]">
                   <AnimatedKundliChart />
                </div>
              </div>

              {/* Chart 2 */}
              <div className="bg-parchment rounded-2xl shadow-xl border border-[#8B6E4A]/30 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B6E4A]/40"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8B6E4A]/40"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8B6E4A]/40"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B6E4A]/40"></div>
                
                <h3 className="font-serif text-[#4A3319] text-xl font-bold mb-4 w-full text-center border-b border-[#8B6E4A]/20 pb-2">Person 2 Chart</h3>
                <div className="w-full max-w-[280px]">
                   <AnimatedKundliChart />
                </div>
              </div>

            </div>

            {/* 10 Informational Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              
              <InfoCard title="Person 1: Birth Positions" icon={Star}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                  <span><span className="font-bold">Sun:</span> Aries 12°</span>
                  <span><span className="font-bold">Moon:</span> Taurus 5°</span>
                  <span><span className="font-bold">Mars:</span> Leo 22°</span>
                  <span><span className="font-bold">Ven:</span> Gemini 2°</span>
                </div>
              </InfoCard>

              <InfoCard title="Person 2: Birth Positions" icon={Star}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                  <span><span className="font-bold">Sun:</span> Libra 8°</span>
                  <span><span className="font-bold">Moon:</span> Cancer 15°</span>
                  <span><span className="font-bold">Mars:</span> Virgo 1°</span>
                  <span><span className="font-bold">Ven:</span> Scorpio 12°</span>
                </div>
              </InfoCard>

              <InfoCard title="Person 1: Current Transits" icon={Map}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#8B6E4A]">
                  <span><span className="font-bold text-[#5c3a1d]">Sun:</span> Pisces 20°</span>
                  <span><span className="font-bold text-[#5c3a1d]">Moon:</span> Virgo 11°</span>
                </div>
              </InfoCard>

              <InfoCard title="Person 2: Current Transits" icon={Map}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#8B6E4A]">
                  <span><span className="font-bold text-[#5c3a1d]">Sun:</span> Pisces 20°</span>
                  <span><span className="font-bold text-[#5c3a1d]">Moon:</span> Virgo 11°</span>
                </div>
              </InfoCard>

              <InfoCard title="Strength: Mars & Venus Trine" icon={ShieldCheck}>
                <p>The harmonious trine between P1's Mars and P2's Venus generates intense physical attraction and romantic passion. You will constantly inspire each other.</p>
              </InfoCard>

              <InfoCard title="Weakness: Saturn Squares Moon" icon={ShieldAlert}>
                <p>P2's Saturn challenges P1's Moon. This indicates periods of emotional coldness or misunderstandings. Patience and open emotional sharing are vital.</p>
              </InfoCard>

              <InfoCard title="Ashtakoot Score" icon={Scale}>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-serif font-bold text-[#4A3319]">26<span className="text-xl text-[#8B6E4A]">/36</span></div>
                  <p className="text-xs">A highly auspicious score. Nadi Dosha is absent, and Bhakoot match is excellent.</p>
                </div>
              </InfoCard>

              <InfoCard title="Permanent Settlement" icon={Home}>
                <p>Strong planetary indications (Jupiter aspecting the 4th house for both) point toward a stable, long-lasting settlement. Buying property together will be highly favorable.</p>
              </InfoCard>

              <InfoCard title="Life After Marriage" icon={Heart}>
                <p>Expect a harmonious transition. The strong Venus placement suggests your bond will grow stronger over time, evolving from passion into deep spiritual friendship.</p>
              </InfoCard>

              <InfoCard title="Children Possibilities" icon={Baby}>
                <p>Benefic aspects on the 5th house in both charts suggest joyous and healthy progeny. A high probability of strong family expansion within 3 years of union.</p>
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
                <h3 className="font-serif text-2xl font-bold tracking-wide">Relationship Sage</h3>
                <p className="text-sm text-white/80 font-medium">Your guide to cosmic harmony</p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-6 bg-white/30 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,174,117,0.1)_0%,transparent_100%)] pointer-events-none"></div>
              
              {/* AI Message */}
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] flex-shrink-0 flex items-center justify-center mt-1">
                   <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-[#8B6E4A]/20 text-[#4A3319] leading-relaxed relative z-10">
                  <p>Greetings. I have aligned both charts. Your 26/36 Ashtakoot score is wonderful. The Mars-Venus trine guarantees a passionate bond, though you must navigate the Saturn-Moon square carefully. How can I guide your union today?</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-[#EBD6A7] flex-shrink-0 flex items-center justify-center mt-1 border border-[#8B6E4A]/30">
                   <User className="w-5 h-5 text-[#8B6E4A]" />
                </div>
                <div className="bg-[#EBD6A7]/50 p-4 rounded-2xl rounded-tr-none shadow-sm border border-[#8B6E4A]/20 text-[#4A3319] leading-relaxed relative z-10">
                  <p>How can we mitigate the negative effects of the Saturn-Moon square you mentioned?</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-[#8B6E4A]/20">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Ask about your compatibility..." 
                  className="w-full bg-white border border-[#8B6E4A]/30 rounded-full py-4 pl-6 pr-16 text-[#4A3319] placeholder-[#8B6E4A]/50 focus:outline-none focus:ring-2 focus:ring-[#C19E63] shadow-inner transition-all"
                />
                <button className="absolute right-2 w-10 h-10 bg-gradient-to-r from-[#C4A15A] to-[#8C642A] rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95">
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

export default KundliResults;
