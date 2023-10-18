import  {  useState } from 'react'
import Footer from '../components/footer/Footer'
import RecentFileSection from '../components/file-manager/tab-panes/all-files/RecentFileSection'
import { Tab } from 'react-bootstrap';

import FileDetailsModal from '../components/modal/FileDetailsModal'
import UploadFileModal from '../components/modal/UploadFileModal'
import CreateFolderModal from '../components/modal/CreateFolderModal'
const FileManagerMainContent = () => {
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
                      
                        <RecentFileSection state={false}/>
                    </Tab.Pane>
               
                </Tab.Content>
            </div>
        </div>
        <FileDetailsModal/>
        <UploadFileModal/>
        <CreateFolderModal/>
        <Footer/>
    </div>
  )
}

export default FileManagerMainContent