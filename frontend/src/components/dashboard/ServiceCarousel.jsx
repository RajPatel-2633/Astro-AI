import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Heart, MessageSquare, Star, ChevronRight, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    id: 'compatibility',
    title: 'AI Compatibility Analysis',
    description: 'Unlock the secrets of your relationships. Our GenAI analyzes Synastry and Composite charts to provide deep insights into love, friendship, and business partnerships.',
    icon: <Heart className="w-12 h-12 text-[#C4A15A]" strokeWidth={1.5} />,
    buttonText: 'Check Compatibility',
    path: '/compatibility'
  },
  {
    id: 'career',
    title: 'Career Path Predictions',
    description: 'Discover your true calling. We analyze your 10th house and planetary strengths to guide you toward a fulfilling and prosperous career path.',
    icon: <Briefcase className="w-12 h-12 text-[#C4A15A]" strokeWidth={1.5} />,
    buttonText: 'Analyze Career',
    path: '/chart'
  },
  {
    id: 'chat',
    title: 'Daily Guidance Chat',
    description: "Connect with the stars daily. Our AI Astrologer provides personalized guidance on your current planetary transits and life's big questions.",
    icon: <MessageSquare className="w-12 h-12 text-[#C4A15A]" strokeWidth={1.5} />,
    buttonText: 'Start Chat',
    path: '/chart'
  },
  {
    id: 'chart',
    title: 'Birth Chart Analysis',
    description: 'Your cosmic blueprint revealed. Get a complete breakdown of your personality, destiny, and life potential based on precise Vedic calculations.',
    icon: <Star className="w-12 h-12 text-[#C4A15A]" strokeWidth={1.5} />,
    buttonText: 'View Blueprint',
    path: '/chart'
  }
];

const ServiceCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-10">
      <div className="flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-[#8B6E4A]" />
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4A3319] tracking-tight">Services that we offer</h2>
      </div>

      {/* Grid that tries to occupy 100% width with 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            className="bg-[#F5E6CC] rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-[#8B6E4A]/10 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
          >
            {/* Soft highlight/glow */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

            {/* Icon Container */}
            <div className="mb-6 flex items-center justify-center p-4 rounded-full bg-[#FFF9F0] shadow-[inset_0_2px_10px_rgba(139,110,74,0.1)] border border-[#8B6E4A]/5">
               {service.icon}
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-[#2A1B0E] leading-tight mb-4 tracking-tight">
              {service.title}
            </h3>
            
            <p className="text-sm text-[#5C3A1D]/80 font-medium leading-relaxed mb-10 flex-grow">
              {service.description}
            </p>
            
            <button
              onClick={() => navigate(service.path)}
              className="w-full py-4 rounded-2xl bg-[#5C4033] text-[#F5E6CC] font-bold text-sm tracking-widest shadow-lg hover:bg-[#3D2B22] hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2"
            >
              {service.buttonText}
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
