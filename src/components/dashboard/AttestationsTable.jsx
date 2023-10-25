import { useEffect, useState } from 'react';
//import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAppContext } from '../../context/appContext'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
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
     
        break;
     }}

const { authFetch, attestations, getAttestations } = useAppContext();
const [selectedAttestations, setSelectedAttestations] = useState([]);
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [editingRowId, setEditingRowId] = useState(null);
const [editedDate, setEditedDate] = useState("");

const handleAttestationSelection = (id) => {
    if (selectedAttestations.includes(id)) {
        setSelectedAttestations((prev) => prev.filter((attestationId) => attestationId !== id));
    } else {
        setSelectedAttestations((prev) => [...prev, id]);
    }
};
const handleSelectAll = () => {
    if (selectedAttestations.length === attestations.length) {
        setSelectedAttestations([]); // deselect all
    } else {
        setSelectedAttestations(attestations.map(a => a.id)); // select all
    }
};

const handleExportSelected = async () => {
    try {
        const response = await authFetch.post(`/api/generateMultiplePdfs`, {
           // ids: [1, 2, 3]
            ids: selectedAttestations // Sending selected attestation IDs as an array
        });
        console.log(response);
        if (response.status === 200) {
            const data = response.data;
            // Supposons que le serveur renvoie un chemin de fichier comme "C:\\Users\\...\\fichier.zip"
            // Extraire le nom du fichier du chemin complet
            const cleanedPath = data.lien.replace("BCE-back/public", "");
            const fileName = cleanedPath.split("\\").pop();
            // Construire l'URL pour déclencher le téléchargement
            const downloadUrl = `http://127.0.0.1:8000/${fileName}`;
            // Rediriger vers cette URL pour initier le téléchargement
            window.location = downloadUrl;
            handleButton2Click('saPosition');
      
        } else {
            // Handle errors
            console.error("Error exporting attestations:", response.data);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
};

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

    function formatDateToInputValue(isoDateString) {
      return isoDateString.split("T")[0];
    }
    // Start Edit Function date
    const handleDateChange = (e, id) => {
      const dateValue = e.target.value;
      
      // Ensure the date format is correct
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
          console.error("Date format is not 'yyyy-MM-dd'");
          return;
      }
      setEditedDate(dateValue)
      console.log(dateValue);
      updateDateFormation(id, dateValue);
      console.log('test update');
  };
 
  const updateDateFormation = async (id, date) => {
    console.log('date',date);
    try {
        const response = await authFetch.put(`/api/attestations/${id}`, {
                dateFormations: date 
        });

        
        if (response.status === 200) {
          const data = response.data;
          console.log('res', data);// Accessing the data directly
            //console.log('res', data);
            // You can also refresh the attestations from the server if needed
            getAttestations();
        } else {
            console.error('Error updating date formation:', response.data); // Here too
            // Handle the error (maybe display a message to the user or something similar)
        }
    } catch (error) {
        console.error("Error in updateDateFormation:", error);
    }
};

  //End Edit date

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
           
                <div className="row g-3">
                    <div className="col-xl-10 col-md-10 col-10 col-xs-12">
                    <Form onSubmit={handleSubmit}>
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
                            <div className="col-md-2">
                                <br />
                                <button type="submit" className="btn btn-sm btn-primary">
                                    <i className="fas fa-filter"></i> Filter
                                </button>
                            </div>
                        </div>
                        </Form>
                    </div>
                    <div className="col-xl-2 col-md-2 col-2 col-xs-12 d-flex justify-content-end align-items-center">
                      
                    <button onClick={handleExportSelected} className="btn btn-sm btn-danger"> <i className="fa-duotone fa-folder-open"></i> Exporter en ZIP </button>
                        
                    </div>
                </div>
           
        </div>
     
    

        <table className="table table-dashed table-hover digi-dataTable task-table table-striped" id="taskTable">
            <thead>
                <tr>
                    <th className="no-sort">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="markAllModules"
                            checked={selectedAttestations.length === attestations.length}
                            onChange={handleSelectAll}
                        />
                    </div>
                    </th>
                    <th>Id</th>
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
{attestations.map(({ id, client, user, modules, credit, dateFormations, path, etat }) => ( 
    <tr key={id}>
        <td>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={selectedAttestations.includes(id)}
                    onChange={() => handleAttestationSelection(id)}
                />
            </div>
        </td>
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
                            <input type="date"  value={editedDate}  onChange={(e) => handleDateChange(e, id)}/> 
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
                        onClick={() => {
                            const formattedDate = formatDateToInputValue(dateFormations);
                            setEditedDate(formattedDate);
                            setEditingRowId(editingRowId === id ? null : id);
                        }}
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