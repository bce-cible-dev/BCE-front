import React from 'react'
import Footer from '../components/footer/Footer'

import Formations from '../components/dashboard/Formations'
import FileInputSectionFormation from '../components/forms/FileInputSectionFormation'
//import FormationTableFilter from '../components/filter/FormationTableFilter'

const DashboardMainContent = () => {
  return (
    <div className='main-content'>
      {/* <DashboardBreadcrumb title={'eCommerce Dashboard'} /> */}
  
      <FileInputSectionFormation />
      {/* <DashboardCards /> */}
      <div className='row m'>
     
        <Formations />
      </div>
      <Footer />
    </div>
  )
}

export default DashboardMainContent
