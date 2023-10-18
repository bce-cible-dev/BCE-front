import React from 'react'
import Footer from '../components/footer/Footer'

import RecentOrder from '../components/dashboard/RecentOrder'
import FileInputSectionFormation from '../components/forms/FileInputSectionFormation'


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
