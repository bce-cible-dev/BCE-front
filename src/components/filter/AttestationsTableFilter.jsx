import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { DigiContext } from '../../context/DigiContext';
//import SelectFilter from './SelectFilter';
//import DefinedRangeCalender from '../calender/DefinedRangeCalender';

const AttestationsTableFilter = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
 
   
    
      const handleChange = (e) => {
        const { id } = e.target;
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [id]: !prevCheckboxes[id],
        }));
      };
  return (
    <div className="table-filter-option task-table-header">
        <div className="row g-3">
            <div className="col-xl-10 col-md-10 col-10 col-xs-12">
                <div className="row g-3">
               
                <div className="col-md-4">
                    <label htmlFor="inputDate" className="form-label">Date Start</label>
                    <input type="date" className="form-control" id="inputDate"/>
                </div>
                 
                <div className="col-md-4">
                    <label htmlFor="inputDate" className="form-label">Date End</label>
                    <input type="date" className="form-control" id="inputDate"/>
                </div>
                    <div className="col-md-4">
                        <br></br>
                        <button className="btn btn-sm btn-primary"><i className="fa-light fa-filter"></i> Filter</button>
                    </div>
                   
                </div>
            </div>
            <div className="col-xl-2 col-md-2 col-2 col-xs-12 d-flex justify-content-end align-items-center">
                <div id="employeeTableLength">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default AttestationsTableFilter