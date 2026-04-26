import React from 'react';

const BirthDetailsForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col p-8 justify-center items-center overflow-hidden min-h-screen lg:min-h-0 bg-[#EBD6A7]">
      
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 relative z-20 w-full text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-astra-brown tracking-wide mb-2">Birth Details</h2>
          <p className="text-lg italic text-astra-brown/80">Enter your celestial coordinates</p>
        </div>

        {/* Form Container with parchment style */}
        <div className="w-full bg-parchment p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#8B6E4A]/30 relative">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8B6E4A]/40"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8B6E4A]/40"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8B6E4A]/40"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8B6E4A]/40"></div>

          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#5c3a1d] tracking-wide uppercase">Full Name</label>
              <input
                type="text"
                required
                placeholder="Seeker of Stars"
                className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] placeholder-[#8B6E4A]/50 focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#5c3a1d] tracking-wide uppercase">Date of Birth</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#5c3a1d] tracking-wide uppercase">Time of Birth</label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#5c3a1d] tracking-wide uppercase">Place of Birth</label>
              <input
                type="text"
                required
                placeholder="City, State, Country"
                className="w-full px-4 py-3 rounded-lg bg-white/60 border border-[#8B6E4A]/40 text-[#4A3319] placeholder-[#8B6E4A]/50 focus:outline-none focus:ring-2 focus:ring-[#C19E63] transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-6 rounded-lg bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] font-bold text-lg tracking-wider shadow-[0_4px_14px_rgba(139,110,74,0.4)] hover:shadow-[0_6px_20px_rgba(139,110,74,0.6)] hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              Generate Chart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthDetailsForm;
