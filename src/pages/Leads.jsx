import Footer from '../components/footer/Footer';
import LeadsHeader from '../components/header/LeadsHeader';
// import LeadsTableFilter from '../components/filter/LeadsTableFilter';
import LeadsTable from '../components/tables/LeadsTable';
import FileInputSectionModule from '../components/forms/FileInputSectionModule'
const LeadsMainContent = () => {

  
  return (
    <div className="main-content">
        <div className="row">
            <div className="col-12">
            <FileInputSectionModule />
                <div className="panel">
               
                    <LeadsHeader/>
                    <div className="panel-body">
                        {/* <LeadsTableFilter/> */}
                        <LeadsTable/>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default LeadsMainContent