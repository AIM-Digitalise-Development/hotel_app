import 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import {Outlet} from 'react-router-dom'
import AdminNavbar from '../components/dashboard.jsx/AdminNavbar'

const EmployeeDashboard = () => {
  return (
    <div className='admin-dashboard'>
    <Sidebar/>
    <div className='admin-main'>
   <AdminNavbar/>
   <Outlet/>
    </div>
  </div>
  )
}

export default EmployeeDashboard