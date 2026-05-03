import React, { useState, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import useAstroStore from '../store/useAstroStore';

// ─── Profile Edit/Delete row ──────────────────────────────────────────────────
const ProfileActions = ({ profiles }) => {
  const { deleteProfile, updateProfile } = useAstroStore();
  const [selectedId, setSelectedId] = useState('');
  const [editingLabel, setEditingLabel] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const selectedProfile = profiles.find(p => p._id === selectedId);

  const handleStartEdit = () => {
    if (!selectedProfile) return;
    setEditingLabel(selectedProfile.label);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedId || !editingLabel.trim()) return;
    await updateProfile(selectedId, { label: editingLabel.trim() });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!window.confirm(`Delete profile "${selectedProfile?.label}"? This cannot be undone.`)) return;
    setIsDeleting(true);
    await deleteProfile(selectedId);
    setSelectedId('');
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedId}
        onChange={e => { setSelectedId(e.target.value); setIsEditing(false); }}
        className="flex-1 px-3 py-2 rounded-lg bg-white/60 border border-[#8B6E4A]/30 text-[#4A3319] text-sm focus:outline-none focus:ring-1 focus:ring-[#C19E63] transition-all"
      >
        <option value="">Manage a profile…</option>
        {profiles.map(p => (
          <option key={p._id} value={p._id}>{p.label} ({p.name})</option>
        ))}
      </select>

      {isEditing ? (
        <>
          <input
            type="text"
            value={editingLabel}
            onChange={e => setEditingLabel(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-white/80 border border-[#C19E63] text-[#4A3319] text-sm focus:outline-none focus:ring-1 focus:ring-[#C19E63]"
            placeholder="New label"
            onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit(); if (e.key === 'Escape') setIsEditing(false); }}
            autoFocus
          />
          <button onClick={handleSaveEdit} title="Save" className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors flex-shrink-0">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => setIsEditing(false)} title="Cancel" className="p-2 rounded-lg bg-[#8B6E4A]/20 text-[#4A3319] hover:bg-[#8B6E4A]/30 transition-colors flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleStartEdit}
            disabled={!selectedId}
            title="Edit label"
            className="p-2 rounded-lg bg-[#C4A15A]/20 text-[#4A3319] hover:bg-[#C4A15A]/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            disabled={!selectedId || isDeleting}
            title="Delete profile"
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

const BirthDetailsForm = ({ onSubmit, profiles, onProfileSelect }) => {
  const [formData, setFormData] = useState({
    label: 'My Chart',
    name: '',
    gender: 'PREFER NOT TO SAY',
    dob: '',
    tob: '',
    city: '',
    country: '',
    latitude: '',
    longitude: '',
    timezone: '',
    is_primary: false,
  });
  
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Debounced auto-fetch for lat/lng/timezone
  useEffect(() => {
    const fetchLocation = async () => {
      // Need both city and country to be somewhat filled before searching
      if (formData.city.length < 2 || formData.country.length < 2) {
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

          setFormData(prev => ({
            ...prev,
            latitude: match.latitude,
            longitude: match.longitude,
            timezone: match.timezone || 'UTC'
          }));
        } else {
          setLocationError('Location not found in database');
          setFormData(prev => ({ ...prev, latitude: '', longitude: '', timezone: '' }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      // Map frontend state variable names to exact backend expected variable names
      const payload = {
        label: formData.label,
        name: formData.name,
        dob: formData.dob,
        tob: formData.tob,
        tob_unknown: false,
        birth_city: formData.city,
        birth_country: formData.country,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        timezone: formData.timezone,
        gender: formData.gender,
        is_primary: formData.is_primary,
      };
      
      onSubmit(payload);
    }
  };

  return (
    <div className="relative w-full lg:w-1/2 flex flex-col p-8 justify-center items-center overflow-hidden min-h-screen lg:min-h-0 bg-transparent">
      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        
        {/* Quick Select Dropdown + Edit/Delete */}
        {profiles && profiles.length > 0 && (
          <div className="w-full mb-12 z-50 space-y-4">
            <select
              onChange={onProfileSelect}
              className="w-full px-6 py-4 rounded-2xl bg-white/40 backdrop-blur-md border border-[#C4A15A]/20 text-[#4A3319] font-black shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/40 transition-all cursor-pointer text-center text-sm uppercase tracking-widest"
            >
              <option value="">✨ Select a Saved Profile ✨</option>
              {profiles.map(p => (
                <option key={p._id} value={p._id}>{p.label} ({p.name})</option>
              ))}
            </select>
            <ProfileActions profiles={profiles} />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col items-center mb-10 relative z-20 w-full text-center space-y-2">
          <h2 className="text-5xl font-serif font-bold text-[#4A3319] tracking-tight">Birth Details</h2>
          <p className="text-sm font-bold text-[#8B6E4A] uppercase tracking-[0.3em]">Enter your celestial coordinates</p>
        </div>

        {/* Form Container with glass style */}
        <div className="w-full glass-card p-10 shadow-2xl relative group transition-all duration-500 hover:border-[#C4A15A]/40">
          {/* Subtle Sign Aura */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#C4A15A]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#C4A15A]/10 transition-all duration-700"></div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Profile Label</label>
                <input type="text" name="label" value={formData.label} onChange={handleChange} required placeholder="My Chart" className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Gender Essence</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner cursor-pointer">
                  <option value="PREFER NOT TO SAY">Select Essence</option>
                  <option value="MALE">Masculine</option>
                  <option value="FEMALE">Feminine</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Seeker of Stars" className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm placeholder-[#8B6E4A]/30 focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Time of Birth</label>
                <input type="time" name="tob" value={formData.tob} onChange={handleChange} required className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">City of Birth</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Mumbai" className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm placeholder-[#8B6E4A]/30 focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8B6E4A] tracking-[0.2em] uppercase">Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="India" className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-[#C4A15A]/10 text-[#4A3319] text-sm placeholder-[#8B6E4A]/30 focus:outline-none focus:ring-2 focus:ring-[#C4A15A]/30 focus:bg-white/80 transition-all font-medium shadow-inner" />
              </div>
            </div>

            {(formData.latitude || isFetchingLocation || locationError) && (
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#C4A15A]/10">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#C4A15A] tracking-widest uppercase">LATITUDE {isFetchingLocation && '...'}</label>
                  <div className="px-3 py-2 rounded-xl bg-black/5 border border-black/5 text-[#4A3319] text-[10px] font-bold font-mono">{formData.latitude || '—'}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#C4A15A] tracking-widest uppercase">LONGITUDE {isFetchingLocation && '...'}</label>
                  <div className="px-3 py-2 rounded-xl bg-black/5 border border-black/5 text-[#4A3319] text-[10px] font-bold font-mono">{formData.longitude || '—'}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-[#C4A15A] tracking-widest uppercase">TZ {isFetchingLocation && '...'}</label>
                  <div className="px-3 py-2 rounded-xl bg-black/5 border border-black/5 text-[#4A3319] text-[10px] font-bold font-mono truncate">{formData.timezone || '—'}</div>
                </div>
              </div>
            )}
            {locationError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2">{locationError}</p>}

            {/* Primary Profile Toggle */}
            <label className="flex items-center gap-4 cursor-pointer group py-2">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  id="is_primary"
                  name="is_primary"
                  checked={formData.is_primary}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 rounded-full bg-black/5 border border-black/10 peer-checked:bg-[#C4A15A] transition-all"></div>
                <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all peer-checked:translate-x-6"></div>
              </div>
              <div>
                <p className="text-xs font-black text-[#4A3319] uppercase tracking-wider">Set as Primary Profile ⭐</p>
                <p className="text-[10px] text-[#8B6E4A] font-medium">Synced with transit alerts & dashboard card</p>
              </div>
            </label>

            <button type="submit" className="w-full py-5 mt-4 rounded-2xl bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] font-bold text-base tracking-[0.2em] uppercase shadow-2xl hover:shadow-[0_12px_40px_rgba(139,110,74,0.4)] hover:-translate-y-1 transition-all active:translate-y-0">
              Consult the Heavens
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthDetailsForm;
