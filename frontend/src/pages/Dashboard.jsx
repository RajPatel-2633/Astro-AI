import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from '../components/layout/Navbar';
import PanchangBar from '../components/dashboard/PanchangBar';
import TransitAlert from '../components/dashboard/TransitAlert';
import PersonalSignCard from '../components/dashboard/PersonalSignCard';
import HoroscopeCarousel from '../components/dashboard/HoroscopeCarousel';
import QuickMatch from '../components/dashboard/QuickMatch';
import { Sparkles, AlertTriangle, Loader2 } from 'lucide-react';
import useAppStore from '../store/useAppStore';

// Graceful fallback shown if any dashboard card crashes
const CardFallback = ({ error }) => (
  <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-700">
    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
    <div>
      <p className="font-bold text-sm">This section could not load</p>
      <p className="text-xs mt-0.5 opacity-70">{error?.message || 'An unexpected error occurred.'}</p>
    </div>
  </div>
);

const LoadingFallback = () => (
  <div className="w-full bg-[#E5CAA0]/50 rounded-2xl p-6 flex items-center justify-center gap-2 text-[#8B6E4A]">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span className="text-sm font-medium">Loading...</span>
  </div>
);

const Dashboard = () => {
  const user = useAppStore(state => state.user);
  const firstName = user?.name?.split(' ')[0] || 'Seeker';

  return (
    <div className="min-h-screen bg-[#EBD6A7] font-sans overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow w-full px-[4vw] py-8 space-y-8 relative z-10">
        {/* Welcome & Panchang */}
        <div className="space-y-6">
          <h1 className="font-serif text-[#4A3319] font-bold tracking-wider mb-2 text-[clamp(2rem,4vw,3rem)]">
            Welcome back, <span className="text-[#8A5A2B]">{firstName}</span> ✨
          </h1>
          <ErrorBoundary FallbackComponent={CardFallback}>
            <Suspense fallback={<LoadingFallback />}>
              <PanchangBar />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Alerts & Personal Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,25vw)] gap-[3vw]">
          <div className="flex flex-col gap-6 w-full min-w-0">
            <ErrorBoundary FallbackComponent={CardFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <TransitAlert />
              </Suspense>
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={CardFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <HoroscopeCarousel />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="h-full w-full">
            <ErrorBoundary FallbackComponent={CardFallback}>
              <PersonalSignCard />
            </ErrorBoundary>
            <div className="mt-6">
              <ErrorBoundary FallbackComponent={CardFallback}>
                <QuickMatch />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
