import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Attestations from './pages/Attestations'
import Modules from './pages/Modules'
import AttestationsPdf from './pages/AttestationPdf'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route
          element={
            //<ProtectedRoutes>
              <Layout />
            //</ProtectedRoutes>
          }
        >
          <Route path='/application' element={<Dashboard />} />
          <Route path='/allAttestationPdfFile' element={<AttestationsPdf />} />
          <Route path='/AttestationsList' element={<Attestations />} />
          <Route path='/allModules' element={<Modules />} />
       
        </Route>

      </Routes>
    </Router>
  )
}

export default App
