import { useEffect } from 'react';
//import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useAppContext } from '../../context/appContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const AttestationsTable = () => {
  
    const { attestations, getAttestations } = useAppContext();
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
    const generateAttestations = async (id) => {
      try {
        const response = await fetch(`http://localhost:8000/api/generate/attestation/${id}`
        , {
          method: "GET", // ou "POST" si nécessaire
          headers: {
            "Content-Type": "application/json",
            // Ajoutez ici d'autres entêtes si nécessaire (comme des tokens d'authentification)
          },
        });
  
        if (response.ok) {
          const data = await response.json();
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
    useEffect(() => {
        getAttestations()
    }, []);

  return (
    <>
    <OverlayScrollbarsComponent>
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
                          <div key={index}>{module.length > 80 ? module.slice(0, 70) + '...' : module}</div>
                        ))}
                    </td>
                       <td>{credit}</td>
                      <td>30-{dateFormations}</td>
                      <td>
                        {etat}
                      {etat == 1 ?
                      <a href={`http://127.0.0.1:8000${path}`} target='_blank' rel='noopener noreferrer' >   <img src="assets/images/pdf.png" class="file-icon" alt="Image" /></a>
                
                        : 
                        <span className="badge bg-default">---</span>
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