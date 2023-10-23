import { useEffect, useState } from 'react';
//import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAppContext } from '../../context/appContext'
import Form from 'react-bootstrap/Form';
const MySwal = withReactContent(Swal)
const AttestationsTable = () => {
  const handleButton2Click = (alertType) => {
    switch (alertType) {
      case 'saPosition':
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Generation with success",
          showConfirmButton: !1,
          timer: 1000,
          showCloseButton: !0,
          closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
          customClass: {
              closeButton: 'btn btn-sm btn-icon btn-danger',
          },
          
      })
     
        break;}}

const { authFetch, attestations, getAttestations } = useAppContext();
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [editingRowId, setEditingRowId] = useState(null);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        console.log('start',e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        console.log('end',e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getAttestations(startDate, endDate);
    };
    const generateAttestations = async (id) => {
      try {
        const response = await authFetch.get(`/api/generate/attestation/${id}`);
        // Handle the response...
        if (response.status === 200) {
          const data = response.data;
           handleButton2Click('saPosition');
           window.location.reload();
          console.log(data); // Traitement des données reçues ou autre logique
          // Par exemple, affichez une notification à l'utilisateur que les attestations ont été créées
        } else {
          console.error("Erreur lors de la création des attestations:", await response.text());
        }
      } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error);
      }
    };
    const handleDateChange = (e, id) => {
      const newDate = e.target.value;
  
      // Here, update the attestations state or send the change to the backend.
      // For now, I'll show how you might update the state:
  
      const updatedAttestations = attestations.map(attestation => {
          if (attestation.id === id) {
              return {...attestation, dateFormations: newDate};
          }
          return attestation;
      });
      
      setAttestations(updatedAttestations); // Assuming you have a state setter for attestations.
  };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
  }
    useEffect(() => {
        getAttestations()
    }, []);

  return (
    <>
    <OverlayScrollbarsComponent>

    <div className="table-filter-option task-table-header">
            <Form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-xl-10 col-md-10 col-10 col-xs-12">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <Form.Label htmlFor="startDate">Date Start</Form.Label>
                                <Form.Control 
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <Form.Label htmlFor="endDate">Date End</Form.Label>
                                <Form.Control 
                                    type="date"
                                    id="endDate"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <br />
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fas fa-filter"></i> Filter
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
        <table className="table table-dashed table-hover digi-dataTable task-table table-striped" id="taskTable">
            <thead>
                <tr>
                    <th className="no-sort">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="markAllModules"/>
                        </div>
                    </th>
                 
                    <th>Client</th>
                    <th>User</th>
                    <th>Modules</th>
                    <th>Credit</th>
                    <th>Date</th>
                    <th>PDF</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {attestations.map(
                  ({
                    id,
                    client,
                    user,
                    modules,
                    credit,
                    dateFormations,
                    path,
                    etat,
                  
                  }) => ( 
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{client}</td>
                      <td>{user}</td>
                      <td>
                        {modules.map((module, index) => (
                          <div key={index}>{module.length > 50 ? module.slice(0, 49) + '...' : module}</div>
                        ))}
                    </td>
                       <td>{credit}</td>
                       <td>
    {editingRowId === id ? (
        <input 
            type="date" 
            value={dateFormations} 
            onChange={(e) => handleDateChange(e, id)}
        />
    ) : (
        formatDate(dateFormations)
    )}
</td>
                      <td>
                        {etat}
                      {etat == 1 ?
                      <a href={`http://127.0.0.1:8000${path}`} target='_blank' rel='noopener noreferrer' >   <img src="assets/images/pdf.png" className="file-icon" alt="Image" /></a>
                
                        : 
                        <i 
                        className="fa-light fa-edit" 
                        onClick={() => setEditingRowId(editingRowId === id ? null : id)}
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                    ></i>
                         }
                        </td>
                <td>
                <div className="btn-box">
                {etat == 1 ? 
                <button className="btn btn-sm btn-icon btn-default ">
             
                    <i className="fa-light fa-print" style={{color: 'white'}}></i> 
                </button>:  <button 
            className="btn btn-sm btn-icon btn-success"  onClick={() => generateAttestations(id)}
      
        >
                    <i className="fa-light fa-print" style={{color: 'white'}}></i> 
                </button>}
                    <button
                    className="btn btn-sm btn-icon btn-danger"
                  
                    data-bs-toggle="modal"
                    data-bs-target="#editAttestationsModal"
                    >
                        
                    <i className="fa-light fa-trash"></i>
                    </button>
                    {/* <button
                    className="btn btn-sm btn-icon btn-danger"
                    >
                    <i className="fa-light fa-trash-can"></i>
                    </button> */}
                </div>
                </td>
            </tr>
            ))}

            </tbody>
        </table>
    </OverlayScrollbarsComponent>

    </>
  )
}

export default AttestationsTable