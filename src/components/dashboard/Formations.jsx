import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useEffect, useContext ,useState} from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { DigiContext } from '../../context/DigiContext'
import FormationTableFilter from '../filter/FormationTableFilter'
import EditFormationModal from '../modal/EditFormationModal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PaginationSection from './PaginationSection';
//const [page, setPage] = useState(1);
const Formations = () => {
  const {
    authFetch,
    formations,
    getFormations,
    getClients,
    getEtudiants,
    deleteFormation,
  } = useAppContext()

  ///pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(25);
  const dataList = formations
   // Pagination logic
   const indexOfLastData = currentPage * dataPerPage;
   const indexOfFirstData = indexOfLastData - dataPerPage;
   const currentData = dataList.slice(indexOfFirstData, indexOfLastData);
 
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
 
   // Calculate total number of pages
   const totalPages = Math.ceil(dataList.length / dataPerPage);
   const pageNumbers = [];
   for (let i = 1; i <= totalPages; i++) {
     pageNumbers.push(i);
   }

  //end pagination

const handleButtonClick = (alertType) => {
  switch (alertType) {
    case 'saError':
      MySwal.fire({
        title: "Oops...",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
      break;
      case 'saPosition':
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Supprimé avec succès",
          showConfirmButton: !1,
          timer: 8000,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
              closeButton: 'btn btn-sm btn-icon btn-danger',
          },
          
      })
     
        break;
      case 'saWarning':
        MySwal.fire({
          title: "Es-tu sûr?",
          text: "Vous ne pourrez pas revenir en arrière !!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-sm btn-danger",
          cancelButtonClass: "btn btn-sm btn-info",
          confirmButtonText: "Oui, supprimez-le !",
          buttonsStyling: false,
          showCloseButton: true,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
          },
        }).then(async function(t) { // Notice the async keyword here
          if (t.value) {
            await clearAll(); // Wait for the clearAll function to complete
         
            
          }
        })
        break;
        
   }
    }
const clearAll = async () => {
  try {
    const response = await authFetch.post(`/api/clear/formations`);
    
    if (response.status === 200) {
        const data = response.data;
        handleButtonClick('saPosition');
        window.location.reload( );
        console.log(data); // Handle the received data or other logic.
    } else {
        console.error("Erreur lors de suppression :", response.data);
    }
} catch (error) {
  handleButtonClick('saError');
    console.error("Erreur lors de l'appel à l'API:", error.response ? error.response.data : error.message);
}
};
  useEffect(() => {
    getFormations()
    getEtudiants()
    getClients()
    console.log(getFormations());
  }, [])

  return (
    <div className='col-xxl-12'>
      <div className='panel recent-order'>
        <div className='panel-header'>
          <h5>Formation</h5>
          
          <div id='tableSearch'>  
          <div className="btn-box d-flex gap-2">
        <button className='btn btn-sm btn-danger'   onClick={() => handleButtonClick('saWarning')}>
                <i className='fa-light fa-trash me-2'></i>
                Supprimer tous les Formations
              </button>
      </div></div>
          <EditFormationModal />
        </div>
        <div className='panel-body'>
        <FormationTableFilter /> 
          <OverlayScrollbarsComponent>
            <table
              className='table table-dashed recent-order-table dataTable no-footer'
              id='myTable'
            >
              <thead>
                <tr>
                <th>ID</th>
                  <th>Client</th>
                  <th>User</th>
                  <th>Modules</th>
                  <th>Credit</th>
                  <th>Date de fin</th>


                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map(
                  ({
                    id,
                    client,
                    etudiant,
                   

                    module,
                    credit,
                    dateCompletion,
                  }) => (
                    <tr key={id + 1}>
                     <td>{id}</td>
                      <td>{client}</td>
                      <td>{etudiant}</td>
                      <td>{module}</td>
                      <td>{credit}</td>
                      <td>{dateCompletion}</td>

                      {/* <td>$05.22</td>
                      <td>
                      <span className='badge bg-success'>Paid</span>
                      </td> */}
                      <td>
                        <div className='btn-box'>
                          {/* <button>
                            <i className='fa-light fa-eye'></i>
                          </button> */}
                          {/* <button
                            onClick={() => {
                              handleShow()
                            }}
                          >
                            <i className='fa-light fa-pen'></i>
                          </button> */}
                          
                          <button onClick={() => deleteFormation(id)}>
                            <i className='fa-light fa-trash'></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </OverlayScrollbarsComponent>
          <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers}/>

        </div>
      </div>
    </div>
  )
}

export default Formations
