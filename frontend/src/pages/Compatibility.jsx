import React, { useRef, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import PersonForm from '../components/compatibility/PersonForm';
import KundliResults from '../components/compatibility/KundliResults';
import { ZodiacLoader } from '../components/Graphics';

const Compatibility = () => {
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMatchSubmit = () => {
    setIsLoading(true);
    setShowResults(false);

    // Simulate API call and loading animation (3 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#EBD6A7] font-sans overflow-x-hidden flex flex-col relative z-0">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#EBD6A7]/70 backdrop-blur-md transition-all duration-500">
          <div className="flex flex-col items-center gap-8">
            <ZodiacLoader />
            <h3 className="font-serif text-3xl text-[#4A3319] font-bold tracking-widest animate-pulse drop-shadow-md">Aligning the Stars...</h3>
          </div>
        </div>
      )}

      {/* Soft central glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none -z-10"></div>
      
      <Navbar />
      
      <main className="flex-grow flex flex-col w-full">
        {/* Top 50/50 Split Section */}
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center w-full relative z-10 px-[4vw] py-12">
          
          {/* Page Title */}
          <div className="text-center mb-12">
             <h1 className="text-5xl lg:text-6xl font-serif text-[#4A3319] font-bold mb-4 drop-shadow-sm">Kundli Milan</h1>
             <p className="text-xl text-[#8B6E4A] italic max-w-2xl mx-auto">Discover the cosmic harmony between two souls before uniting them in marriage.</p>
          </div>

          {/* Forms Grid */}
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 relative">
            
            {/* Animated Divider line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-[10%] bottom-[10%] w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#8B6E4A]/30 to-transparent"></div>

            <PersonForm title="Person 1" subtitle="Enter details for the first partner" />
            <PersonForm title="Person 2" subtitle="Enter details for the second partner" />
          </div>

          {/* Submit Button */}
          <div className="mt-16 w-full flex justify-center">
            <button
              onClick={handleMatchSubmit}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-[#C4A15A] to-[#8C642A] text-[#FFF5E1] font-bold text-xl tracking-wider shadow-[0_4px_20px_rgba(139,110,74,0.5)] hover:shadow-[0_8px_30px_rgba(139,110,74,0.7)] hover:-translate-y-1 transition-all active:translate-y-0"
            >
              Calculate Compatibility
            </button>
          </div>
        </div>

        {/* Bottom Results Section */}
        <div 
          ref={resultsRef} 
          className={`w-full transition-all duration-1000 ${showResults ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          {showResults && <KundliResults />}
        </div>
      </main>
    </div>
  );
};

export default Compatibility;
