import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import BirthChart from './pages/BirthChart'
import Compatibility from './pages/Compatibility'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chart" element={<BirthChart />} />
      <Route path="/compatibility" element={<Compatibility />} />
    </Routes>
  )
}

export default App
