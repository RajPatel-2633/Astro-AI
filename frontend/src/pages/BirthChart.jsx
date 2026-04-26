import React, { useRef, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/HeroSection';
import BirthDetailsForm from '../components/BirthDetailsForm';
import ChartResults from '../components/chart/ChartResults';
import { ZodiacLoader } from '../components/Graphics';

const BirthChart = () => {
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = () => {
    setIsLoading(true);
    setShowResults(false); // Hide if previously open

    // Simulate API call and loading animation (3 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      
      // Use a slight timeout to ensure the DOM has updated and element is visible
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
            <h3 className="font-serif text-3xl text-[#4A3319] font-bold tracking-widest animate-pulse drop-shadow-md">Consulting the Cosmos...</h3>
          </div>
        </div>
      )}

      {/* Soft central glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none -z-10"></div>
      
      <Navbar />
      
      <main className="flex-grow flex flex-col w-full">
        {/* Top Split Section */}
        <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row w-full relative z-10">
          <BirthDetailsForm onSubmit={handleFormSubmit} />
          <HeroSection />
        </div>

        {/* Bottom Results Section */}
        <div 
          ref={resultsRef} 
          className={`w-full transition-all duration-1000 ${showResults ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          {showResults && <ChartResults />}
        </div>
      </main>
    </div>
  );
};

export default BirthChart;
