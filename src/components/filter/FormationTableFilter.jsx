import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAppContext } from '../../context/appContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const FormationTableFilter = () => {
    const MySwal = withReactContent(Swal)
  const {authFetch, clients, getClients,etudiants,getEtudiants } = useAppContext();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedEtudiant, setSelectedEtudiant] = useState('');
 // const [filteredClients, setFilteredClients] = useState(clients);
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
      break;
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
        break;}
      }
      const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        if (endDate && newStartDate > endDate) {
            MySwal.fire({
                title: "Attention",
                text: "La date de début ne peut pas être supérieure à la date de fin",
                icon: "warning",
                confirmButtonClass: "btn btn-sm btn-primary",
                buttonsStyling: false
            });
            return;
        }
        setStartDate(newStartDate);
    };
    
    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        if (startDate && startDate > newEndDate) {
            MySwal.fire({
                title: "Attention",
                text: "La date de fin doit être supérieure à la date de début",
                icon: "warning",
                confirmButtonClass: "btn btn-sm btn-primary",
                buttonsStyling: false
            });
            return;
        }
        setEndDate(newEndDate);
    };


  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
   
  };
  const handleEtudiantChange = (e) => {
    setSelectedEtudiant(e.target.value);
   
  };
  console.log('client',selectedClient);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authFetch.get(`/api/formation/grouped`, {
        params: {
          startDate: startDate,
          endDate: endDate,
          client: selectedClient,
          etudiant_id:selectedEtudiant
        },
      });
  
      if (response.status === 200) {
         handleButtonClick('saClose');
        const data = response.data;
        console.log('succes',data); // Handle the received data or other logic.
        }
    } catch (error) {
        handleButtonClick('saError');
      console.error("Erreur lors de l'appel à l'API:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="table-filter-option task-table-header">
      <Form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-xl-12 col-md-12 col-10 col-xs-12">
            <div className="row g-3">
            <div className="col-md-3">
                <Form.Label htmlFor="startDate">Date Start</Form.Label>
                <Form.Control 
                    type="date"
                    id="startDate"
                    value={startDate || ''}
                    onChange={handleStartDateChange} required
                />
            </div>
            <div className="col-md-3">
                <Form.Label htmlFor="endDate">Date End</Form.Label>
                <Form.Control 
                    type="date"
                    id="endDate"
                    value={endDate || ''}
                    onChange={handleEndDateChange} required
                />
            </div>
              {/* Client select */}
              <div className="col-md-2">
                <Form.Label htmlFor="clientSelect">Client</Form.Label>
                <Form.Select
                    id="clientSelect"
                    className="form-control"
                    value={selectedClient}
                    onChange={handleClientChange}
                    disabled={!clients} // Disable the select if clients data is not available yet
                >
                    <option value="">ALL Clients</option>
                    {clients && clients.clients && clients.clients.map((item, index) => (
                    <option key={index} value={item.client}>
                        {item.client}
                    </option>
                    ))}
                </Form.Select>
                </div>
                <div className="col-md-2">
                <Form.Label htmlFor="etudiantSelect">Etudiant</Form.Label>
                <Form.Select
                    id="etudiantSelect"
                    className="form-control"
                    value={selectedEtudiant}
                    onChange={handleEtudiantChange}
                    disabled={!etudiants} // Disable the select if etudiants data is not available yet
                >
                    <option value="">ALL Etudiants</option>
                    {etudiants && etudiants && etudiants.map((item, index) => (
                    <option key={index} value={item.id}>
                        {item.fullName}
                    </option>
                    ))}
                </Form.Select>
                </div>
              {/* Submit button */}
              <div className="col-md-2">
                <br />
                <button type="submit" className="btn btn-sm btn-primary">
                  <i className="fa-light fa-layer-group"></i> Regrouper les Formations
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-md-2 col-2 col-xs-12 d-flex justify-content-end align-items-center">
            <div id="employeeTableLength">
              {/* Content for employeeTableLength */}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FormationTableFilter;
