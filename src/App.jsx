import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Task from "./pages/Task"
import Leads from "./pages/Leads"
import Customer from "./pages/Customer"
import AddEmployee from "./pages/AddEmployee"
import AllEmployee from "./pages/AllEmployee"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import LoginStatus from "./pages/LoginStatus"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import SweetAlert from "./pages/SweetAlert"
import Form from "./pages/Form"
import FileManager from "./pages/FileManager"
import Layout from "./components/layout/Layout"
import Login from "./pages/Login3"
import Error400 from "./pages/Error400"
function App() {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path="/application" element={<Dashboard/>}/>
          <Route path="/fileManager" element={<FileManager/>}/>
          <Route path="/task" element={<Task/>}/>
          <Route path="/leads" element={<Leads/>}/>
          <Route path="/customer" element={<Customer/>}/>
          <Route path="/addEmployee" element={<AddEmployee/>}/>
          <Route path="/allEmployee" element={<AllEmployee/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/sweetAlert" element={<SweetAlert/>}/>
          <Route path="/form" element={<Form/>}/>
        </Route>
       
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/updatePassword" element={<UpdatePassword/>}/>
        <Route path="/loginStatus" element={<LoginStatus/>}/>
        <Route path="/error400" element={<Error400/>}/>
      </Routes>
    </Router>
  )
}

export default App
