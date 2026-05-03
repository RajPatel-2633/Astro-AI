import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/HeroSection';
import BirthDetailsForm from '../components/BirthDetailsForm';
import ChartResults from '../components/chart/ChartResults';
import { ZodiacLoader } from '../components/Graphics';
import useAstroStore from '../store/useAstroStore';
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-900 rounded-xl max-w-2xl mx-auto mt-10 shadow-lg border border-red-300">
      <h2 className="text-xl font-bold mb-2">Something went wrong in the Chart View:</h2>
      <pre className="text-sm bg-red-50 p-3 rounded overflow-auto">{error.message}</pre>
      <pre className="text-xs mt-2 text-red-700 overflow-auto">{error.stack}</pre>
      <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow">Try again</button>
    </div>
  );
}

const BirthChart = () => {
  const resultsRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const { generateChart, fetchProfiles, fetchChartByProfileId, profiles, isLoading, chartData, error } = useAstroStore();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleFormSubmit = async (formData) => {
    setShowResults(false); // Hide if previously open

    // Call the backend API
    const success = await generateChart(formData);

    if (success) {
      setShowResults(true);
      
      // Use a slight timeout to ensure the DOM has updated and element is visible
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleProfileSelect = async (e) => {
    const profileId = e.target.value;
    if (!profileId) return;

    setShowResults(false);
    const success = await fetchChartByProfileId(profileId);
    
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
    <div className="min-h-screen bg-[#F8F4EB] font-sans overflow-x-hidden flex flex-col relative z-0">
      {/* Dynamic Celestial Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C4A15A]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8C642A]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-500">
          <div className="flex flex-col items-center gap-10">
            <div className="scale-125">
              <ZodiacLoader />
            </div>
            <div className="space-y-4 text-center">
              <h3 className="font-serif text-4xl text-[#FFF5E1] font-bold tracking-[0.2em] animate-pulse drop-shadow-2xl">Consulting the Cosmos</h3>
              <p className="text-[#C4A15A] font-bold text-xs uppercase tracking-[0.5em] opacity-80">Aligning planetary spheres...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-card bg-red-50/90 border-red-200 text-red-700 px-8 py-4 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <p className="font-bold text-sm tracking-tight">{error}</p>
        </div>
      )}
      
      <Navbar />
      
      <main className="flex-grow flex flex-col w-full relative z-10">
        {/* Top Split Section */}
        <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row w-full">
          <BirthDetailsForm 
            onSubmit={handleFormSubmit} 
            profiles={profiles} 
            onProfileSelect={handleProfileSelect} 
          />
          <HeroSection />
        </div>

        {/* Bottom Results Section */}
        <div 
          ref={resultsRef} 
          className={`w-full transition-all duration-1000 ${showResults ? 'opacity-100 py-20' : 'opacity-0 h-0 overflow-hidden'}`}
        >
          {showResults && (
             <ErrorBoundary FallbackComponent={Fallback}>
                <ChartResults chartData={chartData} />
             </ErrorBoundary>
          )}
        </div>
      </main>

      {/* Floating Decorative Elements */}
      <div className="fixed bottom-12 right-12 text-[#C4A15A] opacity-20 pointer-events-none -z-10 animate-float">
        <Sparkles className="w-48 h-48" strokeWidth={0.3} />
      </div>
    </div>
  );
};

export default BirthChart;
