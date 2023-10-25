import  { useContext, useEffect, useState } from 'react'
import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
//import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import config from'../../config'

const AttestationFileSection = ({state}) => {
    const baseUrl =config.BASE_URL
    const { documents, getDocuments } =useAppContext();
    const {handleFileDetailsModalShow} = useContext(DigiContext)
    const [isView,setIsView] = useState(state)
    const handleListView = () => {
        setIsView(true)
    }
    const handleGridView = () => {
        setIsView(false)
    }

    useEffect(() => {
        getDocuments()
        console.log('test');
    }, []);


 




  return (
    <div className="panel">
        <div className="panel-header">
            <h5>Listes des attestations PDF</h5>
            <div className="btn-box">
                <button className={`btn btn-sm btn-icon btn-outline-primary btn-grid-view ${isView? '':'active'}`} onClick={handleGridView}><i className="fa-solid fa-grid-2"></i></button>
                <button className={`btn btn-sm btn-icon btn-outline-primary btn-list-view ${isView? 'active':''}`} onClick={handleListView}><i className="fa-regular fa-bars"></i></button>
            </div>
        </div>
        <div className="panel-body">
            <OverlayScrollbarsComponent>
                <div>
                    <div className={`file-manager-row recent-files ${isView? 'list-view':''}`}>
                        <div className="file-manager-col-head">
                            <span>Attestation</span>
                        <span></span>
                            <span>User</span>
                            <span>Type</span>
                            <span>Client</span>
                         
                        </div>
                        {documents && documents.map((document) => ( 
                   
                           <div className="file-manager-col" key={document.id}>
                         <div className="file-card">
                             <div className="part-img">
                                 <a href={`${baseUrl}/${document.path}`} target='_blank' rel='noopener noreferrer' className="btn-flush" ><img src="assets/images/pdf.png" className="file-icon" alt="Image"/></a>
                             </div>
                             <div className="part-txt">
                                 <div className="d-flex justify-content-between">
                                 <a href={`${baseUrl}/${document.path}`} target='_blank' rel='noopener noreferrer' className="btn-flush file-name"  >{document.user.replace(/\s+/g, '')}.pdf</a>
                                     <span className="file-size">PDF file</span>
                                 </div>
                             </div>
                             <div className="file-type">
                                 <span>{document.client}</span>
                             </div>
                           
                         </div>
                     </div>
                    ))}

                       
                       
                    </div>
                </div>
            </OverlayScrollbarsComponent>
            {/* <div className="part-btn text-center">
                <p>Showing 10 of 100 items</p>
                <button className="btn btn-sm btn-primary">Load More</button>
            </div> */}
        </div>
    </div>
  )
}

export default AttestationFileSection