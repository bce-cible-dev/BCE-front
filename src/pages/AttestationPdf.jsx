import  {  useState } from 'react'
import Footer from '../components/footer/Footer'
import AttestationFileSection from '../components/dashboard/AttestationFileSection'
import { Tab } from 'react-bootstrap';


const AttestationsPdfMainContent = () => {
   const [activeTab, setActiveTab] = useState('all-files');

    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  return (
    <div className="main-content">
        <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
            <h2>Liste des attestations PDF</h2>
        </div>
        <div className="main-mobile-file-manager row g-4 position-relative">
           
            <div className="col-xxl-12 col-lg-12">
                <Tab.Content>
                    <Tab.Pane eventKey="all-files" className={`tab-pane ${activeTab === 'all-files' ? 'show active' : ''}`}>
                      
                        <AttestationFileSection state={false}/>
                    </Tab.Pane>
               
                </Tab.Content>
            </div>
        </div>
     
        <Footer/>
    </div>
  )
}

export default AttestationsPdfMainContent