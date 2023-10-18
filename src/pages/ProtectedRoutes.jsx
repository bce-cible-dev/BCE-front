import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
useAppContext

const ProtectedRoutes = ({ children }) => {
  const { user } = useAppContext()
  if (!user) {
    return <Navigate to='/' />
  }
  return children
}
export default ProtectedRoutes
