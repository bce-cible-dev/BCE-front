import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { DigiContext } from '../../context/DigiContext'
import { useAppContext } from '../../context/appContext'
import CkEditor from '../ck-editor/CkEditor'
import Select from 'react-select'
import axios from 'axios'

const EditFormationTaskModal = () => {
  const { show, handleClose } = useContext(DigiContext)
  const { formationToEdit, startEditFormation, formationId } = useAppContext()

  const [values, setValues] = useState({
    client: formationToEdit.client,
    etudiant: formationToEdit.etudiant,
    module: formationToEdit.module,
    dateCompletion: formationToEdit.dateCompletion,
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    console.log(formationToEdit)
  }
  useEffect(() => {}, [])
  return (
    <>
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header>
          <Modal.Title>Modifier une formation</Modal.Title>
          <Button
            variant='outline-primary'
            size='sm'
            data-bs-dismiss='modal'
            aria-label='Close'
            onClick={handleClose}
          >
            <i className='fa-light fa-times'></i>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className='row g-3'>
            <div className='col-12'>
              <label htmlFor='editTaskName' className='form-label'>
                Client
              </label>
              <input
                type='text'
                id='editTaskName'
                className='form-control form-control-sm'
                placeholder='Task Name'
                name='client'
                value={values.client}
                onChange={handleChange}
              />
            </div>
            <div className='col-12'>
              <label htmlFor='editTaskName' className='form-label'>
                Etudiant
              </label>
              <input
                type='text'
                id='editTaskName'
                className='form-control form-control-sm'
                placeholder='Task Name'
                name='etudiant'
                value={values.etudiant}
                onChange={handleChange}
              />
            </div>
            <div className='col-12'>
              <label htmlFor='editTaskName' className='form-label'>
                Module
              </label>
              <input
                type='text'
                id='editTaskName'
                className='form-control form-control-sm'
                placeholder='Task Name'
                name='module'
                value={values.module}
                onChange={handleChange}
              />
            </div>
            <div className='col-sm-6'>
              <label htmlFor='editTaskEndDate' className='form-label'>
                Date de fin
              </label>
              <input
                type='text'
                id='editTaskEndDate'
                className='form-control form-control-sm date-picker'
                placeholder='Eg: 12 Feb, 20'
                name='dateCompletion'
                value={values.dateCompletion}
                onChange={handleChange}
              />
            </div>

            {/* <div className='col-12'>
              <label htmlFor='editTaskAttchment' className='form-label'>
                Attach File
              </label>
              <input
                type='file'
                id='editTaskAttchment'
                className='form-control form-control-sm'
                multiple
              />
            </div>
            <div className='col-sm-6'>
              <label htmlFor='editTaskStartDate' className='form-label'>
                Start Date
              </label>
              <input
                type='text'
                id='editTaskStartDate'
                className='form-control form-control-sm date-picker'
                placeholder='Eg: 12 Feb, 20'
                value='12 Feb, 23'
                readOnly
              />
            </div>
            <div className='col-sm-6'>
              <label htmlFor='editTaskEndDate' className='form-label'>
                End Date
              </label>
              <input
                type='text'
                id='editTaskEndDate'
                className='form-control form-control-sm date-picker'
                placeholder='Eg: 12 Feb, 20'
                value='12 Mar, 23'
                readOnly
              />
            </div>
            <div className='col-sm-6'>
              <label className='form-label'>Priority</label>
              <Form.Select
                className='form-control form-control-sm'
                data-placeholder='Select Priority'
              >
                <option value=''>Select Priority</option>
                <option value='low'>Low</option>
                <option value='medium' selected>
                  Medium
                </option>
                <option value='high'>High</option>
                <option value='urgent'>Urgent</option>
              </Form.Select>
            </div>
            <div className='col-sm-6'>
              <label className='form-label'>Repeat every</label>
              <Form.Select
                className='form-control form-control-sm'
                data-placeholder='Select Time'
              >
                <option value=''>Select Time</option>
                <option value='week'>Week</option>
                <option value='2week' selected>
                  2 Weeks
                </option>
                <option value='month'>1 Month</option>
                <option value='2months'>2 Months</option>
                <option value='3months'>3 Months</option>
                <option value='6months'>6 Months</option>
                <option value='year'>1 Year</option>
              </Form.Select>
            </div>
            <div className='col-12'>
              <label className='form-label'>Assign To</label>
              <Select
                isMulti
                options={options}
                placeholder='Eg: Natasha Hancock'
              />
            </div>
            <div className='col-12'>
              <label className='form-label'>Task Description</label>
              <CkEditor />
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleClose()
              handleSubmit()
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditFormationTaskModal
