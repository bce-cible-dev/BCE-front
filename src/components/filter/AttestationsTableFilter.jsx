import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAppContext } from '../../context/appContext'
const AttestationsTableFilter = () => {
    const { authFetch, attestations, getAttestations } = useAppContext();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    return (
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
    )
}

export default AttestationsTableFilter;
