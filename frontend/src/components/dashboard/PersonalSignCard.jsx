import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sparkles, Star } from 'lucide-react';
import useAstroStore from '../../store/useAstroStore';

// Zodiac symbols map
const ZODIAC_ICONS = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
  leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
  sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};

// Zodiac element/symbol subtitle
const ZODIAC_SUBTITLE = {
  aries: 'The Ram', taurus: 'The Bull', gemini: 'The Twins',
  cancer: 'The Crab', leo: 'The Lion', virgo: 'The Maiden',
  libra: 'The Scales', scorpio: 'The Scorpion', sagittarius: 'The Archer',
  capricorn: 'The Sea-Goat', aquarius: 'The Water Bearer', pisces: 'The Fish',
};

const PersonalSignCard = () => {
  const navigate = useNavigate();
  const { profiles, chartData, isLoading, fetchProfiles, fetchChartByProfileId } = useAstroStore();

  useEffect(() => {
    // Profiles are already fetched by BirthChart page, but refetch if empty
    if (!profiles || profiles.length === 0) {
      fetchProfiles();
    }
  }, []);

  useEffect(() => {
    // Auto-load chart for the primary profile
    if (profiles && profiles.length > 0) {
      const primary = profiles.find(p => p.is_primary) || profiles[0];
      if (primary && (!chartData || chartData.profile_id !== primary._id)) {
        fetchChartByProfileId(primary._id);
      }
    }
  }, [profiles]);

  // Derive data from chart
  const primaryProfile = profiles?.find(p => p.is_primary) || profiles?.[0];
  const sunSign = chartData?.sun_sign?.toLowerCase();
  const moonSign = chartData?.moon_sign?.toLowerCase();
  const ascendant = chartData?.ascendant?.toLowerCase();
  const sunIcon = ZODIAC_ICONS[sunSign] || '☀️';
  const luckScore = chartData ? Math.floor(55 + (chartData.planets?.length || 5) * 4) : null;
  const circumference = 2 * Math.PI * 44;

  // ── Loading State ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="w-full rounded-[1.5rem] h-full bg-parchment p-1 shadow-[0_8px_16px_rgba(0,0,0,0.15)] border border-[#CBAE75] flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3 text-[#8B6E4A]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium">Reading the stars...</p>
        </div>
      </div>
    );
  }

  // ── No Profile State ───────────────────────────────────────────────────────
  if (!primaryProfile) {
    return (
      <div className="w-full rounded-[1.5rem] h-full bg-parchment p-1 shadow-[0_8px_16px_rgba(0,0,0,0.15)] border border-[#CBAE75]">
        <div className="w-full h-full rounded-[1.25rem] border border-[#8B6E4A]/30 bg-[#F4E8D3] flex flex-col items-center justify-center p-8 gap-4 min-h-[300px] text-center">
          <Sparkles className="w-10 h-10 text-[#C4A15A] opacity-60" />
          <div>
            <h3 className="font-serif font-bold text-[#4A3319] text-lg">Your Cosmic Profile Awaits</h3>
            <p className="text-sm text-[#8B6E4A] mt-1">Generate your birth chart to see your personal cosmic overview here.</p>
          </div>
          <button
            onClick={() => navigate('/chart')}
            className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-b from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] font-bold text-sm shadow-md hover:-translate-y-0.5 transition-all"
          >
            Generate Birth Chart
          </button>
        </div>
      </div>
    );
  }

  // ── Main Card ──────────────────────────────────────────────────────────────
  return (
    <div className="w-full rounded-[1.5rem] overflow-hidden flex flex-col relative h-full bg-parchment p-1 shadow-[0_8px_16px_rgba(0,0,0,0.15)] border border-[#CBAE75]">
      <div className="w-full h-full rounded-[1.25rem] border border-[#8B6E4A]/30 overflow-hidden relative flex flex-col bg-[#F4E8D3]">

        {/* Top Banner */}
        <div className="w-full bg-gradient-to-b from-[#E5CAA0] to-[#E0C090] px-[1.5em] pt-[1.5em] pb-[2em] relative z-0 border-b border-[#CBAE75] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start">
            <div className="mt-2">
              <h2 className="font-serif text-[#4A3319] font-bold tracking-tight drop-shadow-sm text-[clamp(2rem,3vw,2.5rem)] capitalize">
                {sunSign ? sunSign.charAt(0).toUpperCase() + sunSign.slice(1) : primaryProfile.name}
              </h2>
              <p className="text-[clamp(0.8rem,1vw,1rem)] text-[#4A3319]/80 font-semibold tracking-wide mt-1">
                {sunSign ? `Sun Sign • ${ZODIAC_SUBTITLE[sunSign] || ''}` : 'Birth Chart not yet generated'}
              </p>
              {primaryProfile.is_primary && (
                <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <Star className="w-2.5 h-2.5" /> Primary Profile
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3D Astrolabe Luck Ring */}
        <div className="absolute right-6 top-[2.5rem] z-20">
          <div className="relative w-32 h-32 flex items-center justify-center rounded-full astrolabe-ring border-[4px] border-[#FFF8E7]">
            <div className="absolute inset-0 rounded-full border-[6px] border-dashed border-[#8B6E4A]/40 m-1 pointer-events-none"></div>
            <div className="w-[100px] h-[100px] rounded-full astrolabe-inner bg-[#F4E8D3] flex items-center justify-center relative">
              <svg className="w-[100px] h-[100px] transform -rotate-90 absolute top-0 left-0">
                <circle cx="50" cy="50" r="44" stroke="#DDC8A3" strokeWidth="6" fill="transparent" />
                {luckScore && (
                  <circle
                    cx="50" cy="50" r="44"
                    stroke="#FFFFFF"
                    strokeWidth="6" fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (luckScore / 100) * circumference}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <span className="text-2xl">{sunIcon}</span>
                {luckScore && <span className="text-[10px] uppercase font-bold text-[#4A3319]/70 tracking-widest mt-0.5">{luckScore}%</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="px-[1.5em] pb-[1.5em] relative z-10 flex-grow flex flex-col pt-[2em] bg-parchment">
          <div className="space-y-3 flex-grow">

            {/* Sign Row */}
            {(moonSign || ascendant) && (
              <div className="grid grid-cols-2 gap-2">
                {moonSign && (
                  <div className="bg-white/40 rounded-xl p-2.5 border border-[#C4A15A]/20">
                    <p className="text-[9px] font-bold text-[#8B6E4A] uppercase tracking-wider">Moon</p>
                    <p className="text-sm font-bold text-[#4A3319] capitalize mt-0.5">{ZODIAC_ICONS[moonSign]} {moonSign}</p>
                  </div>
                )}
                {ascendant && (
                  <div className="bg-white/40 rounded-xl p-2.5 border border-[#C4A15A]/20">
                    <p className="text-[9px] font-bold text-[#8B6E4A] uppercase tracking-wider">Ascendant</p>
                    <p className="text-sm font-bold text-[#4A3319] capitalize mt-0.5">{ZODIAC_ICONS[ascendant]} {ascendant}</p>
                  </div>
                )}
              </div>
            )}

            {/* Nakshatra */}
            {chartData?.nakshatra && (
              <div className="bg-white/40 rounded-xl p-2.5 border border-[#C4A15A]/20">
                <p className="text-[9px] font-bold text-[#8B6E4A] uppercase tracking-wider">Birth Nakshatra</p>
                <p className="text-sm font-bold text-[#4A3319] mt-0.5">
                  {chartData.nakshatra} {chartData.nakshatra_pada ? `(Pada ${chartData.nakshatra_pada})` : ''}
                </p>
              </div>
            )}

            {/* AI Interpretation snippet */}
            <div>
              <h3 className="text-[clamp(0.7rem,1vw,0.85rem)] font-bold text-[#4A3319] uppercase tracking-wider mb-2 drop-shadow-sm">Cosmic Guidance</h3>
              <p className="text-[clamp(0.8rem,1vw,1rem)] text-[#4A3319]/90 font-medium leading-relaxed line-clamp-4">
                {chartData?.interpretations?.summary ||
                  (sunSign
                    ? `Your ${sunSign} sun illuminates your path. Check your full birth chart for a complete cosmic reading.`
                    : 'Generate your birth chart to receive your personalised cosmic guidance.'
                  )
                }
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/chart')}
            className="w-full mt-[1.5em] py-[1em] rounded-xl bg-gradient-to-b from-[#6A4B29] to-[#4A3319] text-[#F4E8D3] font-bold hover:from-[#5C4020] hover:to-[#3A2814] transition-all shadow-[0_4px_15px_rgba(62,39,0,0.3)] border border-[#3A2814] active:scale-[0.98]"
          >
            {chartData ? 'View Full Chart' : 'Ask AI Astrologer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalSignCard;
