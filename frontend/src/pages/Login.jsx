import LoginForm from '../components/LoginForm'
import HeroSection from '../components/HeroSection'

const Login = () => {
  return (
    <main className="min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans overflow-hidden">
      <LoginForm />
      <HeroSection />
    </main>
  )
}

export default Login
