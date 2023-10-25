import React, { useEffect } from 'react';
//import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useAppContext } from '../../context/appContext'
import { Link } from 'react-router-dom'
const EtudiantsTable = () => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ajoute un zéro devant si nécessaire
        const day = date.getDate().toString().padStart(2, '0');  // Ajoute un zéro devant si nécessaire
        return `${day}-${month}-${year}`;
    };
    const { etudiants, getEtudiants  ,numOfPages,
      page,} = useAppContext();

    useEffect(() => {
        getEtudiants()
        console.log(etudiants)
    }, []);

  return (
    <>
    <OverlayScrollbarsComponent>
        <table className="table table-dashed table-hover digi-dataTable Etudiants-table table-striped" id="EtudiantsTable">
            <thead>
                <tr>
                    <th className="no-sort">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="markAllEtudiants"/>
                        </div>
                    </th>
                 
                    <th> Nom & Prénom</th>
                
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {etudiants && etudiants.length > 0 && etudiants.map(
                  ({
                    id,
                    fullName,
                   
                  
                  }) => ( 
                    <tr key={id}>
                    <td>
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                            />
                        </div>
                    </td>
                    
                      <td>{fullName}</td>
                    
                <td>
                <div className="btn-box">
               
                    <button
                    className="btn btn-sm btn-icon btn-danger"
                  
                    data-bs-toggle="modal"
                    data-bs-target="#editEtudiantsModal"
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
    <div className='table-bottom-control'>
            <div className='dataTables_info'>
              Page {page} of {numOfPages}
            </div>
            <div className='dataTables_paginate paging_simple_numbers'>
              <Link
                className={`btn btn-primary previous ${page === 1 ? 'disabled' : ''}`}
                onClick={() => {
                  if (page > 1) {
                    getFormations(page - 1);  // Assuming you have this function to fetch the previous page
                  }
                }}
              >
                <i className='fa-light fa-angle-left'></i>
              </Link>
              <span>
                <Link className='btn btn-primary current'>{page}</Link>
              </span>
              <Link
                className={`btn btn-primary next ${page === numOfPages ? 'disabled' : ''}`}
                onClick={() => {
                  if (page < numOfPages) {
                    getFormations(page + 1);  // Assuming you have this function to fetch the next page
                  }
                }}
              >
                <i className='fa-light fa-angle-right'></i>
              </Link>
            </div>
          </div>
    </>
  )
}

export default EtudiantsTable