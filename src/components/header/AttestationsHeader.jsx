import React, { useContext, useState } from 'react'
import { DigiContext } from '../../context/DigiContext'
import { Form } from 'react-bootstrap'
import { useAppContext } from '../../context/appContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
const AttestationsHeader = () => {
  const {authFetch} = useAppContext()
  const {
    headerBtnOpen,
    handleHeaderBtn,
    handleHeaderReset,
    headerRef,
  } = useContext(DigiContext)

  const [checkboxes, setCheckboxes] = useState({
    showName: true,
    showStatus: true,
    showStartDate: true,
    showDueDate: true,
    showAssignedTo: true,
    showPriority: true,
  })

  const handleChange = (e) => {
    const { id } = e.target
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }))
  }
  const handleButtonClick = (alertType) => {
    switch (alertType) {
      case 'saClose':
        let timerInterval
        MySwal.fire({
          title: '.....En cours de regrouper les modules!',
          html: 'Creation effectuer avec <b></b> successeful.',
          timer: 6000,
          timerProgressBar: true,
          didOpen: () => {
         
            MySwal.showLoading()
            const b = MySwal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = MySwal.getTimerLeft();
              window.location.reload();
            }, 100)
          },
          willClose: () => {
            
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === MySwal.DismissReason.timer) {
            createAttestations();
            console.log('I was closed by the timer')
          }
       
      });
      break;}}
 
  const createAttestations = async () => {
    try {
        const response = await authFetch.get(`/api/formation/grouped`);
        
        if (response.status === 200) {
            const data = response.data;
            handleButtonClick('saClose');
            console.log(data); // Handle the received data or other logic.
        } else {
            console.error("Erreur lors de la création des attestations:", response.data);
        }
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error.response ? error.response.data : error.message);
    }
};

  return (
    <div className='panel-header'>
      <h5>Attestations List</h5>
      <div className='btn-box d-flex flex-wrap gap-2'>
        <div id='tableSearch'>
          <Form.Control type='text' placeholder='Search...' />
        </div>
        <button
          className='btn btn-sm btn-icon btn-outline-primary'
          onClick={handleHeaderReset}
        >
          <i className='fa-light fa-arrows-rotate'></i>
        </button>
    
        <button className='btn btn-sm btn-primary' onClick={createAttestations}>
      <i className='fa-light fa-plus'></i> Creer les attestations
    </button>
      </div>
    </div>
  )
}

export default AttestationsHeader
