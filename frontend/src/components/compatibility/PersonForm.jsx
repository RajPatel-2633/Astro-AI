import React, { useState, useEffect } from 'react';

const PersonForm = ({ title, subtitle, formData, onChange }) => {
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  // Debounced auto-fetch for lat/lng
  useEffect(() => {
    const fetchLocation = async () => {
      // Need both city and country to be somewhat filled before searching
      if (!formData.city || formData.city.length < 2 || !formData.country || formData.country.length < 2) {
        return; 
      }
      
      setIsFetchingLocation(true);
      setLocationError('');
      
      try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(formData.city)}&count=10&format=json`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          // Try to find an exact match for the country
          let match = data.results.find(
            res => res.country && res.country.toLowerCase().includes(formData.country.toLowerCase())
          );
          
          // Fallback to first result if no exact country match but we have results
          if (!match) match = data.results[0];

          onChange('latitude', match.latitude);
          onChange('longitude', match.longitude);
          onChange('timezone', match.timezone || 'UTC');
        } else {
          setLocationError('Location not found in database');
          onChange('latitude', '');
          onChange('longitude', '');
          onChange('timezone', '');
        }
      } catch (error) {
        setLocationError('Error fetching coordinates');
      } finally {
        setIsFetchingLocation(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchLocation();
    }, 1000); // Wait 1 second after user stops typing to call API

    return () => clearTimeout(delayDebounceFn);
  }, [formData.city, formData.country]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 relative z-20 w-full text-center space-y-2">
        <h2 className="text-4xl font-serif font-bold text-[#4A3319] tracking-tight">{title}</h2>
        <p className="text-sm font-bold text-[#8B6E4A] uppercase tracking-[0.2em]">{subtitle}</p>
      </div>

      {/* Form Container with glass style */}
      <div className="w-full max-w-md glass-card p-10 shadow-2xl relative group transition-all duration-500 hover:border-[#C4A15A]/40">
        {/* Subtle Sign Aura */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#C4A15A]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#C4A15A]/10 transition-all duration-700"></div>

        <div className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label htmlFor={`name-${title}`} className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Full Name</label>
              <input
                type="text"
                id={`name-${title}`}
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Seeker of Stars"
                className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] placeholder-[#8B6E4A]/30 focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium text-sm shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={`gender-${title}`} className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Gender</label>
              <select
                id={`gender-${title}`}
                name="gender"
                value={formData.gender || 'PREFER NOT TO SAY'}
                onChange={handleChange}
                required
                className="w-slice px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium text-sm shadow-inner cursor-pointer"
              >
                <option value="PREFER NOT TO SAY">Select Essence</option>
                <option value="MALE">Masculine</option>
                <option value="FEMALE">Feminine</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor={`dob-${title}`} className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Date of Birth</label>
              <input
                type="date"
                id={`dob-${title}`}
                name="dob"
                value={formData.dob || ''}
                onChange={handleChange}
                required
                autoComplete="bday"
                className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium text-sm shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={`tob-${title}`} className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Time of Birth</label>
              <input
                type="time"
                id={`tob-${title}`}
                name="tob"
                value={formData.tob || ''}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium text-sm shadow-inner"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor={`city-${title}`} className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">City of Birth</label>
              <input
                type="text"
                id={`city-${title}`}
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                required
                autoComplete="address-level2"
                placeholder="Mumbai"
                className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] placeholder-[#8B6E4A]/30 focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium text-sm shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={`country-${title}`} className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Country</label>
              <input
                type="text"
                id={`country-${title}`}
                name="country"
                value={formData.country || ''}
                onChange={handleChange}
                required
                autoComplete="country-name"
                placeholder="India"
                className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] placeholder-[#8B6E4A]/30 focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium text-sm shadow-inner"
              />
            </div>
          </div>

          {(formData.latitude || isFetchingLocation || locationError) && (
            <div className="flex gap-6 pt-4 border-t border-[#C4A15A]/10">
              <div className="space-y-1.5 flex-1">
                <label className="text-[9px] font-black text-[#C4A15A] tracking-widest uppercase">LATITUDE {isFetchingLocation && '...'}</label>
                <div className="px-4 py-3 rounded-xl bg-black/5 border border-black/5 text-[#4A3319] text-xs font-bold font-mono">{formData.latitude || '—'}</div>
              </div>
              <div className="space-y-1.5 flex-1">
                <label className="text-[9px] font-black text-[#C4A15A] tracking-widest uppercase">LONGITUDE {isFetchingLocation && '...'}</label>
                <div className="px-4 py-3 rounded-xl bg-black/5 border border-black/5 text-[#4A3319] text-xs font-bold font-mono">{formData.longitude || '—'}</div>
              </div>
            </div>
          )}
          {locationError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2">{locationError}</p>}
        </div>
      </div>
    </div>
  );
};

export default PersonForm;
