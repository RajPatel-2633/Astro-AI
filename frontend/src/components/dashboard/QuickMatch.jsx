import React, { useState } from 'react';
import { Heart, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import useCompatibilityStore from '../../store/useCompatibilityStore';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const QuickMatch = () => {
  const [sign1, setSign1] = useState('Aries');
  const [sign2, setSign2] = useState('Leo');
  const { fetchQuickMatch, quickMatchData, isLoading, clearMatchData } = useCompatibilityStore();

  const handleMatch = () => {
    fetchQuickMatch(sign1, sign2);
  };

  return (
    <div className="w-full bg-white/30 rounded-2xl border border-[#8B6E4A]/10 p-5 shadow-inner">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-[#4A3319] uppercase tracking-widest flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          Quick Harmony
        </h3>
        <Sparkles className="w-4 h-4 text-[#C4A15A] opacity-50" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/60 border border-[#8B6E4A]/20 text-[#4A3319] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A15A]"
          >
            {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <RefreshCw className="w-4 h-4 text-[#8B6E4A]/40" />

          <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/60 border border-[#8B6E4A]/20 text-[#4A3319] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A15A]"
          >
            {ZODIAC_SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button
          onClick={handleMatch}
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check Harmony'}
        </button>

        {quickMatchData && (
          <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-[#C4A15A]/30 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#8B6E4A] uppercase tracking-wider">Harmony Score</span>
              <span className="text-lg font-black text-[#8C642A]">{quickMatchData.score}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-1000" style={{ width: `${quickMatchData.score}%` }}></div>
            </div>
            <p className="text-xs text-[#4A3319] leading-relaxed italic">
              "{quickMatchData.summary}"
            </p>
            <button
              onClick={clearMatchData}
              className="mt-3 text-[10px] text-[#8B6E4A] hover:text-[#4A3319] underline font-medium"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickMatch;
