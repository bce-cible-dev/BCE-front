import React, { useEffect, useState } from 'react';
//import { DigiContext } from '../../context/DigiContext';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useAppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';
import PaginationSection from './PaginationSection';

const ModulesTable = () => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
        const day = date.getDate().toString().padStart(2, '0'); // Ajoute un zéro devant si nécessaire
        return `${day}-${month}-${year}`;
    };

    const { modules, getModules } = useAppContext();

    useEffect(() => {
        // Fetch modules when the component mounts
        getModules();
    }, []);

    ///pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(25);
    const dataList = modules;

    // Pagination logic
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(dataList.length / dataPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    //end pagination

    return (
        <>
            <OverlayScrollbarsComponent>
                {/* Table for displaying modules */}
                <table className="table table-dashed table-hover digi-dataTable Modules-table table-striped" id="ModulesTable">
                    <thead>
                    <tr>
                        <th className="no-sort">
                            {/* Checkbox for selecting all modules */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="markAllModules" />
                            </div>
                        </th>

                        <th>Title Module</th>
                        <th>credit</th>

                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Mapping through current data to display modules */}
                    {currentData.map(({ id, title, credit }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{title.length > 120 ? title.slice(0, 117) + '...' : title}</td>
                            <td>{credit}</td>

                            <td>
                                {/* Button for module actions */}
                                <div className="btn-box">
                                    <button
                                        className="btn btn-sm btn-icon btn-danger"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModulesModal"
                                        disabled
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
            {/* Pagination component */}
            <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />
        </>
    );
};

export default ModulesTable;
