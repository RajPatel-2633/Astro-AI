import { Sun } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full py-6 flex justify-center items-center z-20 relative border-b border-astra-brown/10">
      <div className="flex items-center gap-3">
        <Sun className="w-10 h-10 text-astra-brown mt-1" />
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-astra-brown tracking-wider">Astro AI</h1>
      </div>
    </header>
  )
}

export default Header
