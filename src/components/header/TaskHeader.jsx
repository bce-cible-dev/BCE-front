import React, { useContext, useState } from 'react'
import { DigiContext } from '../../context/DigiContext'
import { Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)
const TaskHeader = () => {
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
      const response = await fetch("http://localhost:8000/api/formation/grouped", {
        method: "GET", // ou "POST" si nécessaire
        headers: {
          "Content-Type": "application/json",
          // Ajoutez ici d'autres entêtes si nécessaire (comme des tokens d'authentification)
        },
      });

      if (response.ok) {
        const data = await response.json();
        handleButtonClick('saClose');
        console.log(data); // Traitement des données reçues ou autre logique
        // Par exemple, affichez une notification à l'utilisateur que les attestations ont été créées
      } else {
        console.error("Erreur lors de la création des attestations:", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
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
        <div className='digi-dropdown dropdown' ref={headerRef}>
          <button
            className={`btn btn-sm btn-icon btn-outline-primary ${
              headerBtnOpen ? 'show' : ''
            }`}
            onClick={handleHeaderBtn}
            data-bs-toggle='dropdown'
            data-bs-auto-close='outside'
            aria-expanded='false'
          >
            <i className='fa-regular fa-ellipsis-vertical'></i>
          </button>
          <ul className={`dropdown-menu ${headerBtnOpen ? 'show' : ''}`}>
            <li className='dropdown-title'>Show Table Title</li>
            <li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='showName'
                  checked={checkboxes.showName}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='showName'>
                  Name
                </label>
              </div>
            </li>
            <li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='showStatus'
                  checked={checkboxes.showStatus}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='showStatus'>
                  Status
                </label>
              </div>
            </li>
            <li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='showStartDate'
                  checked={checkboxes.showStartDate}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='showStartDate'>
                  Start Date
                </label>
              </div>
            </li>
            <li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='showDueDate'
                  checked={checkboxes.showDueDate}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='showDueDate'>
                  Due Date
                </label>
              </div>
            </li>
            <li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='showAssignedTo'
                  checked={checkboxes.showAssignedTo}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='showAssignedTo'>
                  Assigned To
                </label>
              </div>
            </li>
            <li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='showPriority'
                  checked={checkboxes.showPriority}
                  onChange={handleChange}
                />
                <label className='form-check-label' htmlFor='showPriority'>
                  Priority
                </label>
              </div>
            </li>
            <li className='dropdown-title pb-1'>Showing</li>
            <li>
              <div className='input-group'>
                <input
                  type='number'
                  className='form-control form-control-sm w-50'
                  value='10'
                  readOnly
                />
                <button className='btn btn-sm btn-primary w-50'>Apply</button>
              </div>
            </li>
          </ul>
        </div>
        <button className='btn btn-sm btn-primary' onClick={createAttestations}>
      <i className='fa-light fa-plus'></i> Creer les attestations
    </button>
      </div>
    </div>
  )
}

export default TaskHeader
