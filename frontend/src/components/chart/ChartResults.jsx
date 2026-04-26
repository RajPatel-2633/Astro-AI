import React from 'react';
import { Send, User, Sparkles, Star, Map, Compass, TrendingUp, TrendingDown, Briefcase, Heart, Coins } from 'lucide-react';
import { AnimatedKundliChart } from '../Graphics';

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

const ChartResults = () => {
  return (
    <div className="w-full bg-[#EBD6A7] min-h-screen py-12 px-[4vw] relative z-10 flex flex-col items-center">
      <div className="w-full max-w-[1400px] space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4A3319] font-bold">Your Celestial Blueprint</h2>
          <p className="text-xl text-[#8B6E4A] italic">Calculated with precision for Seeker of Stars</p>
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
                 <AnimatedKundliChart />
              </div>
              
              <p className="mt-6 text-[#8B6E4A] font-medium tracking-wide uppercase text-sm border-t border-[#8B6E4A]/20 pt-4 w-full text-center">North Indian Style Chart</p>
            </div>

            {/* 8 Informational Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard title="Birth Positions" icon={Star}>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                  <span><span className="font-bold">Sun:</span> Aries 12°</span>
                  <span><span className="font-bold">Moon:</span> Taurus 5°</span>
                  <span><span className="font-bold">Mars:</span> Leo 22°</span>
                  <span><span className="font-bold">Merc:</span> Pisces 8°</span>
                  <span><span className="font-bold">Jup:</span> Cancer 15°</span>
                  <span><span className="font-bold">Ven:</span> Gemini 2°</span>
                </div>
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
                <p><strong>Sun</strong> is exalted in Aries (10th House), granting exceptional leadership and public recognition.</p>
                <p className="mt-1"><strong>Jupiter</strong> is exalted in Cancer, blessing you with profound wisdom.</p>
              </InfoCard>

              <InfoCard title="Strong Placements" icon={Compass}>
                <p><strong>Mars</strong> resides in its own sign of Scorpio (5th House), indicating immense creative energy and fierce passion.</p>
              </InfoCard>

              <InfoCard title="Weaker Placements" icon={TrendingDown}>
                <p><strong>Venus</strong> is debilitated in Virgo. Relationships may require extra conscious effort and clear communication.</p>
              </InfoCard>

              <InfoCard title="Profession" icon={Briefcase}>
                <p>Strong indications for technology, leadership, or entrepreneurship due to an empowered Mars influencing the 10th House.</p>
              </InfoCard>

              <InfoCard title="Love Life" icon={Heart}>
                <p>Venus aspecting the 7th House suggests a harmonious but possibly delayed partnership. Look for intellectual connections.</p>
              </InfoCard>

              <InfoCard title="Wealth & Assets" icon={Coins}>
                <p>Jupiter firmly seated in the 2nd House indicates steady, reliable accumulation of assets over time through wise investments.</p>
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
              
              {/* AI Message */}
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#C4A15A] to-[#8C642A] flex-shrink-0 flex items-center justify-center mt-1">
                   <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-[#8B6E4A]/20 text-[#4A3319] leading-relaxed relative z-10">
                  <p>Greetings, Seeker. I have analyzed your birth chart. I see your exalted Sun in the 10th house indicating a period of significant career growth. What specific area of your life would you like to explore today?</p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-4 max-w-[85%] self-end flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-[#EBD6A7] flex-shrink-0 flex items-center justify-center mt-1 border border-[#8B6E4A]/30">
                   <User className="w-5 h-5 text-[#8B6E4A]" />
                </div>
                <div className="bg-[#EBD6A7]/50 p-4 rounded-2xl rounded-tr-none shadow-sm border border-[#8B6E4A]/20 text-[#4A3319] leading-relaxed relative z-10">
                  <p>Can you tell me more about my financial prospects for this year considering my Jupiter placement?</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 border-t border-[#8B6E4A]/20">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Ask the cosmos..." 
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

export default ChartResults;
