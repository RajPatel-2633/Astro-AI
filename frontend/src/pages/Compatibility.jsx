import React, { useRef, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import PersonForm from '../components/compatibility/PersonForm';
import KundliResults from '../components/compatibility/KundliResults';
import { ZodiacLoader } from '../components/Graphics';
import useCompatibilityStore from '../store/useCompatibilityStore';

const Compatibility = () => {
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const { calculateMatch, matchData, isLoading, error } = useCompatibilityStore();
  
  const [person1Data, setPerson1Data] = useState({
    name: '', gender: 'PREFER NOT TO SAY', dob: '', tob: '', city: '', country: '', latitude: '', longitude: ''
  });
  
  const [person2Data, setPerson2Data] = useState({
    name: '', gender: 'PREFER NOT TO SAY', dob: '', tob: '', city: '', country: '', latitude: '', longitude: ''
  });

  const handlePerson1Change = (name, value) => {
    setPerson1Data(prev => ({ ...prev, [name]: value }));
  };

  const handlePerson2Change = (name, value) => {
    setPerson2Data(prev => ({ ...prev, [name]: value }));
  };

  const handleMatchSubmit = async () => {
    setShowResults(false);
    
    // Ensure payload matches backend BirthProfile schema exactly
    const p1Payload = { 
      ...person1Data, 
      birth_city: person1Data.city,
      birth_country: person1Data.country,
      timezone: person1Data.timezone || 'UTC',
      gender: person1Data.gender || 'PREFER NOT TO SAY',
      label: 'Compatibility Partner 1'
    };
    
    const p2Payload = { 
      ...person2Data, 
      birth_city: person2Data.city,
      birth_country: person2Data.country,
      timezone: person2Data.timezone || 'UTC',
      gender: person2Data.gender || 'PREFER NOT TO SAY',
      label: 'Compatibility Partner 2'
    };

    const success = await calculateMatch(p1Payload, p2Payload);

    if (success) {
      setShowResults(true);
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBD6A7] font-sans overflow-x-hidden flex flex-col relative z-0">
      {/* Soft top gradient */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none -z-10"></div>
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-500">
          <div className="flex flex-col items-center gap-10">
            <div className="scale-125">
              <ZodiacLoader />
            </div>
            <div className="space-y-4 text-center">
              <h3 className="font-serif text-4xl text-[#FFF5E1] font-bold tracking-[0.2em] animate-pulse drop-shadow-2xl">Aligning the Stars</h3>
              <p className="text-[#C4A15A] font-bold text-xs uppercase tracking-[0.5em] opacity-80">Calculating soul harmony...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-100 border border-red-200 text-red-700 px-8 py-4 rounded-2xl shadow-2xl">
          <p className="font-bold text-sm tracking-tight">{error}</p>
        </div>
      )}
      
      <Navbar />
      
      <main className="flex-grow flex flex-col w-full relative z-10">
        {/* Top 50/50 Split Section */}
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center w-full px-8 py-20">
          
          {/* Page Title */}
          <div className="text-center mb-20 space-y-4">
             <h1 className="text-6xl lg:text-7xl font-serif text-[#4A3319] font-bold tracking-tight">Kundli Milan</h1>
             <p className="text-sm font-bold text-[#8B6E4A] uppercase tracking-[0.4em]">Discover the cosmic harmony between two souls</p>
          </div>

          {/* Forms Grid */}
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
            
            {/* Animated Divider line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-[10%] bottom-[10%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C4A15A]/30 to-transparent"></div>

            <PersonForm title="Partner One" subtitle="Celestial details for first soul" formData={person1Data} onChange={handlePerson1Change} />
            <PersonForm title="Partner Two" subtitle="Celestial details for second soul" formData={person2Data} onChange={handlePerson2Change} />
          </div>

          {/* Submit Button */}
          <div className="mt-20 w-full flex justify-center">
            <button
              onClick={handleMatchSubmit}
              className="px-16 py-5 rounded-lg bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] font-bold text-lg tracking-wider shadow-[0_4px_14px_rgba(139,110,74,0.4)] hover:shadow-[0_6px_20px_rgba(139,110,74,0.6)] hover:-translate-y-0.5 transition-all active:translate-y-0 uppercase"
            >
              Consult the Harmony
            </button>
          </div>
        </div>

        {/* Bottom Results Section */}
        <div 
          ref={resultsRef} 
          className={`w-full transition-all duration-1000 ${showResults ? 'opacity-100 py-24' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          {showResults && matchData && <KundliResults matchData={matchData} />}
        </div>
      </main>

    </div>
  );
};

export default Compatibility;
