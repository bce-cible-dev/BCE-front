import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'
import Leads from './pages/Leads'
import FileManager from './pages/FileManager'
import Layout from './components/layout/Layout'
import Login from './pages/Login3'
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
          <Route path='/allAttestationPdfFile' element={<FileManager />} />
          <Route path='/AttestationsList' element={<Task />} />
          <Route path='/allModules' element={<Leads />} />
       
        </Route>

      </Routes>
    </Router>
  )
}

export default App
