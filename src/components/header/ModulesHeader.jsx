import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAppContext } from '../../context/appContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const ModulesHeader = () => {
  const {authFetch} = useAppContext();
  const MySwal = withReactContent(Swal)
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
    const response = await authFetch.post(`/api/clear/module`);
    
    if (response.status === 200) {
        const data = response.data;
        handleButtonClick('saPosition');
        window.location.reload( );
        console.log(data); // Handle the received data or other logic.
    } else {
        console.error("Erreur lors de la création des attestations:", response.data);
    }
} catch (error) {
  handleButtonClick('saError');
    console.error("Erreur lors de l'appel à l'API:", error.response ? error.response.data : error.message);
}
};

  return (
    <div className="panel-header">
      <h5>Modules</h5>
      <div className="btn-box d-flex gap-2">
        <button className='btn btn-sm btn-danger'   onClick={() => handleButtonClick('saWarning')}>
                <i className='fa-light fa-trash me-2'></i>
                Supprimer tous les modules
              </button>
      </div>
    </div>
  );
};

export default ModulesHeader;
