import { Sun, Moon, Star, Sparkles, Orbit, Compass } from 'lucide-react'

const LoginForm = () => {
  return (
    <div className="relative w-full lg:w-1/2 flex flex-col p-8 justify-center items-center overflow-hidden">
      
      {/* Background Decorative SVGs */}
      <div className="absolute top-20 left-20 text-astra-brown/20 animate-pulse">
        <Star className="w-8 h-8" />
      </div>
      
      <div className="absolute top-32 right-24 text-astra-brown/20">
        <Moon className="w-12 h-12 fill-current" />
      </div>
      
      <div className="absolute bottom-40 left-16 text-astra-brown/20">
        <Orbit className="w-16 h-16" strokeWidth={1.5} />
      </div>

      <div className="absolute bottom-20 right-20 text-astra-brown/20">
        <Compass className="w-10 h-10" />
      </div>

      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-astra-brown/20">
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="w-full max-w-md flex flex-col items-center relative z-10">
        
        {/* Main Logo & Title Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-10 h-10 text-astra-brown mt-1" />
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-astra-brown tracking-wider">Astro AI</h2>
          </div>
          <p className="text-lg italic text-astra-brown/80">Your Personalised Astrologer</p>
        </div>
        
        {/* Bold Login Header */}
        <h1 className="text-4xl font-serif text-astra-brown mb-8 text-center font-bold">Login</h1>
        
        <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-astra-brown">Email Address</label>
            <input 
              type="email" 
              placeholder="seeker@celestial.ai" 
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/60 text-astra-brown placeholder-astra-brown/40 focus:outline-none focus:ring-2 focus:ring-astra-orange/50 transition-all"
            />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-astra-brown">Password</label>
              <a href="#" className="text-xs text-astra-brown hover:underline font-medium">Forgot alignment?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-lg bg-white/50 border border-white/60 text-astra-brown placeholder-astra-brown/40 focus:outline-none focus:ring-2 focus:ring-astra-orange/50 transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 rounded-lg bg-gradient-to-r from-astra-orange to-[#EEB86D] text-astra-brown font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-6"
          >
            Enter the Cosmos
          </button>
        </form>

        <p className="mt-6 mb-2 text-sm text-astra-brown">
          New here? <a href="#" className="font-bold hover:underline">Sign Up</a>
        </p>

        {/* The stars are whispering your name at the very bottom */}
        <h2 className="text-xl font-serif text-astra-brown mt-4 text-center">The stars are whispering your name.</h2>

      </div>
    </div>
  )
}

export default LoginForm
