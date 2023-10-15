import React from 'react'
import Footer from "../components/footer/Footer"
import DashboardBreadcrumb from '../components/breadcrumb/DashboardBreadcrumb'
import DashboardCards from '../components/cards/DashboardCards'
import RecentOrder from '../components/dashboard/RecentOrder'
const DashboardMainContent = () => {
  return (
    <div className="main-content">
        <DashboardBreadcrumb title={'eCommerce Dashboard'}/>
        <DashboardCards/>
        <div className="row">
          
            <RecentOrder/>
        </div>
        <Footer/>
    </div>
  )
}

export default DashboardMainContent