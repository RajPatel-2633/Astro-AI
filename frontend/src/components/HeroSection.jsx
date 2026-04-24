import bgVideo from '../assets/space-bg.mp4'

const HeroSection = () => {
  return (
    <div className="relative hidden lg:block lg:w-1/2 bg-black overflow-hidden">
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Fallback gradient / Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 pointer-events-none" />
      
    </div>
  )
}

export default HeroSection
