import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Attestations from './pages/Attestations'
import Modules from './pages/Modules'
import Etudiants from './pages/Etudiants'
import AttestationsPdf from './pages/AttestationPdf'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import ProtectedRoutes from './pages/ProtectedRoutes'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path='/application' element={<Dashboard />} />
          <Route path='/allAttestationPdfFile' element={<AttestationsPdf />} />
          <Route path='/AttestationsList' element={<Attestations />} />
          <Route path='/allModules' element={<Modules />} />
          <Route path='/allEtudiants' element={<Etudiants />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
