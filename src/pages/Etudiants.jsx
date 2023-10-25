import Footer from '../components/footer/Footer';
import EtudiantsHeader from '../components/header/EtudiantsHeader';
import EtudiantsTable from '../components/dashboard/EtudiantsTable';
const EtudiantsMainContent = () => {

  
  return (
    <div className="main-content">
        <div className="row">
            <div className="col-12">
        
                <div className="panel">
               
                    <EtudiantsHeader/>
                    <div className="panel-body">
                        {/* <EtudiantsTableFilter/> */}
                        <EtudiantsTable/>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default EtudiantsMainContent