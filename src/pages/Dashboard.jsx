import React from 'react'
import Footer from '../components/footer/Footer'
import DashboardBreadcrumb from '../components/breadcrumb/DashboardBreadcrumb'
import DashboardCards from '../components/cards/DashboardCards'
import RecentOrder from '../components/dashboard/RecentOrder'
import FileInputSectionFormation from '../components/forms/FileInputSectionFormation'
import ButtonGroupSection from '../components/forms/ButtonGroupSection'

const DashboardMainContent = () => {
  return (
    <div className='main-content'>
      {/* <DashboardBreadcrumb title={'eCommerce Dashboard'} /> */}
      <FileInputSectionFormation />
      {/* <DashboardCards /> */}
      <div className='row m'>
        <RecentOrder />
      </div>
      <Footer />
    </div>
  )
}

export default DashboardMainContent
