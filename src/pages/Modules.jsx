import Footer from '../components/footer/Footer';
import ModulesHeader from '../components/header/ModulesHeader';
// import ModulesTableFilter from '../components/filter/ModulesTableFilter';
import ModulesTable from '../components/dashboard/ModulesTable';
import FileInputSectionModule from '../components/forms/FileInputSectionModule'
const ModulesMainContent = () => {

  
  return (
    <div className="main-content">
        <div className="row">
            <div className="col-12">
            <FileInputSectionModule />
                <div className="panel">
               
                    <ModulesHeader/>
                    <div className="panel-body">
                        {/* <ModulesTableFilter/> */}
                        <ModulesTable/>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default ModulesMainContent