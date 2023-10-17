import React, { useEffect } from 'react';
//import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useAppContext } from '../../context/appContext'

const TaskTable = () => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ajoute un zéro devant si nécessaire
        const day = date.getDate().toString().padStart(2, '0');  // Ajoute un zéro devant si nécessaire
        return `${day}-${month}-${year}`;
    };
    const { attestations, getAttestations } = useAppContext();

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
                            <input className="form-check-input" type="checkbox" id="markAllLeads"/>
                        </div>
                    </th>
                 
                    <th>Client</th>
                    <th>User</th>
                    <th>Modules</th>
                    <th>Credit</th>
                    <th>Date</th>
                    <th>Status</th>
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
                      {etat === 1 ? 
                        <span className="badge bg-success">Telécharger</span> 
                        : 
                        <span className="badge bg-secondary">Generer</span>
                         }
                        </td>
                <td>
                <div className="btn-box">
                {etat === 1 ? 
                <a className="btn btn-sm btn-icon btn-info"
                    href="http://127.0.0.1:8000/api/generate/attestation/'.{id}.'" target='_blanck'
                >
                    <i className="fa-light fa-print" style={{color: 'white'}}></i> 
                </a>:  <a 
            className="btn btn-sm btn-icon btn-default"
            href={`http://127.0.0.1:8000/api/generate/attestation/${id}`} 
            target='_blank'
            rel='noopener noreferrer'
        >
                    <i className="fa-light fa-print" style={{color: 'white'}}></i> 
                </a>}
                    <button
                    className="btn btn-sm btn-icon btn-primary"
                  
                    data-bs-toggle="modal"
                    data-bs-target="#editTaskModal"
                    >
                        
                    <i className="fa-light fa-edit"></i>
                    </button>
                    <button
                    className="btn btn-sm btn-icon btn-danger"
                    >
                    <i className="fa-light fa-trash-can"></i>
                    </button>
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

export default TaskTable