import { useEffect, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAppContext } from '../../context/appContext';
import Form from 'react-bootstrap/Form';
import config from '../../config';
import moment from 'moment';
import PaginationSection from './PaginationSection';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const AttestationsTable = () => {
    // ... (existing imports and dependencies)

    // Handle success alert for certain actions
    const handleButton2Click = (alertType) => {
        switch (alertType) {
            case 'saPosition':
                MySwal.fire({
                    // ... (SweetAlert2 configuration for success)
                });
                break;
            // Add more cases for different alert types if needed
        }
    }

    // ... (existing state and functions)

    // Fetch attestations on component mount or when currentPage changes
    useEffect(() => {
        getAttestations();
    }, [currentPage]);

    return (
        <>
            <OverlayScrollbarsComponent>
                {/* Filter options and date range selection */}
                <div className="table-filter-option task-table-header">
                    {/* ... (existing filter UI) */}
                </div>

                {/* Attestations table */}
                <table className="table table-dashed table-hover digi-dataTable task-table table-striped" id="taskTable">
                    {/* Table headers */}
                    <thead>
                    {/* ... (existing table headers) */}
                    </thead>

                    {/* Table body */}
                    <tbody>
                    {/* Map through attestations to render table rows */}
                    {currentData.map(({ id, client, user, modules, credit, dateFormations, path, etat }) => (
                        <tr key={id}>
                            {/* ... (existing table cells) */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </OverlayScrollbarsComponent>

            {/* Pagination section */}
            <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />
        </>
    )
}

export default AttestationsTable;
