import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import { DigiContext } from '../../context/DigiContext'

import EditFormationModal from '../modal/EditFormationModal'

const RecentOrder = () => {
  const {
    formations,
    getFormations,
    numOfPages,
    page,
    deleteFormation,
    prepareEditFormation,
  } = useAppContext()

  const { handleShow } = useContext(DigiContext)

  useEffect(() => {
    getFormations()
  }, [])

  return (
    <div className='col-xxl-12'>
      <div className='panel recent-order'>
        <div className='panel-header'>
          <h5>Formation</h5>
          <div id='tableSearch'></div>
          <EditFormationModal />
        </div>
        <div className='panel-body'>
          <OverlayScrollbarsComponent>
            <table
              className='table table-dashed recent-order-table dataTable no-footer'
              id='myTable'
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Etudiant</th>
                  <th>Modules</th>
                  <th>Date de fin</th>
                  <th>Crédit</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formations.map(
                  ({
                    id,
                    client,
                    etudiant,
                    dateCompletion,
                    credit,
                    module,
                  }) => (
                    <tr key={id + 1}>
                      <td>{id}</td>
                      <td>{client}</td>
                      <td>{etudiant}</td>
                      <td>{module}</td>
                      <td>{dateCompletion}</td>
                      <td>{credit}</td>
                      {/* <td>$05.22</td>
                      <td>
                      <span className='badge bg-success'>Paid</span>
                      </td> */}
                      <td>
                        <div className='btn-box'>
                          {/* <button>
                            <i className='fa-light fa-eye'></i>
                          </button> */}
                          <button
                            onClick={() => {
                              handleShow()
                            }}
                          >
                            <i className='fa-light fa-pen'></i>
                          </button>
                          <button onClick={() => deleteFormation(id)}>
                            <i className='fa-light fa-trash'></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </OverlayScrollbarsComponent>
          <div className='table-bottom-control'>
            <div className='dataTables_info'>
              {' '}
              Page {page} sur {numOfPages}
            </div>
            <div className='dataTables_paginate paging_simple_numbers'>
              <Link className='btn btn-primary previous disabled'>
                <i className='fa-light fa-angle-left'></i>
              </Link>
              <span>
                <Link className='btn btn-primary current'>{page}</Link>
              </span>
              <Link className='btn btn-primary next disabled'>
                <i className='fa-light fa-angle-right'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentOrder
