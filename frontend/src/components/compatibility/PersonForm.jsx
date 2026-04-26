import React from 'react';

const PersonForm = ({ title, subtitle }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center mb-6 relative z-20 w-full text-center">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-astra-brown tracking-wide mb-1">{title}</h2>
        <p className="text-md italic text-astra-brown/80">{subtitle}</p>
      </div>

      {/* Form Container with parchment style */}
      <div className="w-full max-w-md bg-parchment p-6 lg:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#8B6E4A]/30 relative group hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] transition-all">
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B6E4A]/40 transition-all group-hover:border-[#C4A15A]"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8B6E4A]/40 transition-all group-hover:border-[#C4A15A]"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8B6E4A]/40 transition-all group-hover:border-[#C4A15A]"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B6E4A]/40 transition-all group-hover:border-[#C4A15A]"></div>

        <div className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#5c3a1d] tracking-wide uppercase">Full Name</label>
            <input
              type="text"
              placeholder="Seeker of Stars"
              className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] placeholder-[#8B6E4A]/50 focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#5c3a1d] tracking-wide uppercase">Date of Birth</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#5c3a1d] tracking-wide uppercase">Time of Birth</label>
              <input
                type="time"
                className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#5c3a1d] tracking-wide uppercase">Place of Birth</label>
            <input
              type="text"
              placeholder="City, State, Country"
              className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] placeholder-[#8B6E4A]/50 focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonForm;
