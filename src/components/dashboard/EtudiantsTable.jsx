import React, { useEffect } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useAppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';

const EtudiantsTable = () => {
    // Function to format date strings
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    // Extracting data and functions from the context
    const { etudiants, getEtudiants, numOfPages, page } = useAppContext();

    // Fetch etudiants data on component mount
    useEffect(() => {
        getEtudiants();
    }, []);

    return (
        <>
            {/* Table with OverlayScrollbars */}
            <OverlayScrollbarsComponent>
                <table className="table table-dashed table-hover digi-dataTable Etudiants-table table-striped" id="EtudiantsTable">
                    {/* Table headers */}
                    <thead>
                    <tr>
                        <th className="no-sort">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="markAllEtudiants" />
                            </div>
                        </th>
                        <th> Nom & Prénom</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    {/* Table body */}
                    <tbody>
                    {etudiants && etudiants.length > 0 && etudiants.map(({ id, fullName }) => (
                        <tr key={id}>
                            <td>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                </div>
                            </td>
                            <td>{fullName}</td>
                            <td>
                                <div className="btn-box">
                                    {/* Button for deleting etudiant */}
                                    <button
                                        className="btn btn-sm btn-icon btn-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editEtudiantsModal"
                                    >
                                        <i className="fa-light fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </OverlayScrollbarsComponent>

            {/* Pagination section */}
            <div className='table-bottom-control'>
                <div className='dataTables_info'>
                    {/* Displaying current page and total pages */}
                    Page {page} of {numOfPages}
                </div>
                <div className='dataTables_paginate paging_simple_numbers'>
                    {/* Link for the previous page */}
                    <Link
                        className={`btn btn-primary previous ${page === 1 ? 'disabled' : ''}`}
                        onClick={() => {
                            if (page > 1) {
                                // Assuming you have a function to fetch the previous page
                                getFormations(page - 1);
                            }
                        }}
                    >
                        <i className='fa-light fa-angle-left'></i>
                    </Link>
                    <span>
                        {/* Displaying the current page as a link */}
                        <Link className='btn btn-primary current'>{page}</Link>
                    </span>
                    {/* Link for the next page */}
                    <Link
                        className={`btn btn-primary next ${page === numOfPages ? 'disabled' : ''}`}
                        onClick={() => {
                            if (page < numOfPages) {
                                // Assuming you have a function to fetch the next page
                                getFormations(page + 1);
                            }
                        }}
                    >
                        <i className='fa-light fa-angle-right'></i>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default EtudiantsTable;
