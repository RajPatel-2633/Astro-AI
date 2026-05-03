import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import useAppStore from './store/useAppStore'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import BirthChart from './pages/BirthChart'
import Compatibility from './pages/Compatibility'
import History from './pages/History'

function App() {
  const { checkAuth, isLoading, isAuthenticated } = useAppStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-astra-orange"></span>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/chart" element={isAuthenticated ? <BirthChart /> : <Navigate to="/" />} />
        <Route path="/compatibility" element={isAuthenticated ? <Compatibility /> : <Navigate to="/" />} />
        <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
