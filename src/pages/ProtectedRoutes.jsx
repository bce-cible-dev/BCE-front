import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'
useAppContext

const ProtectedRoutes = ({ children }) => {
  const { user } = useAppContext()
 const isLoggedIn = user || localStorage.getItem('user')
  if (!isLoggedIn) {
    return <Navigate to='/' />
  }
  return children
}
export default ProtectedRoutes
