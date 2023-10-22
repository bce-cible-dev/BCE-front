import React from 'react'
import axios from 'axios'
import { useState, useReducer, useContext } from 'react'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  GET_FORMATIONS_BEGIN,
  GET_FORMATIONS_SUCCESS,
  GET_ATTESTATIONS_BEGIN,
  GET_ATTESTATIONS_SUCCESS,
  EDIT_FORMATION_BEGIN,
  EDIT_FORMATION_SUCCESS,
  DELETE_FORMATION_BEGIN,
  DELETE_FORMATION_SUCCESS,
  GET_MODULES_BEGIN,
  GET_MODULES_SUCCESS,
  GET_DOCUMENTS_BEGIN,
  GET_DOCUMENTS_SUCCESS,
} from './actions'

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  formations: [],
  totalFormations: 0,
  attestations: [],
  totalAttestations: 0,
  modules: [],
  totalModules: 0,
  page: 1,
  numOfPages: 1,
  formationToEdit: '',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const baseUrl = 'https://www.app.tunitech-engineering.com'
  //baseURL: 'http://127.0.0.1:8000/'

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  }
  // axios
  const authFetch = axios.create({
    baseURL: baseUrl,
    config,
  })

  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(
        `${baseUrl + '/' + endPoint}`,
        currentUser
      )
      const { user, token } = data
      localStorage.setItem('token', token)
      console.log('user', user)
      console.log('token', token)

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response },
        // payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = async () => {
    // await authFetch.post('/api/logout')
    dispatch({ type: LOGOUT_USER })
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const getFormations = async () => {
    // const { page, search, searchStatus, searchType, sort } = state

    // let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    // if (search) {
    //   url = url + `&search=${search}`
    // }

    let url = `api/formations`

    dispatch({ type: GET_FORMATIONS_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      console.log(data)

      const { formations, totalItems, pagesCount } = data

      const totalFormations = totalItems
      const numOfPages = pagesCount

      dispatch({
        type: GET_FORMATIONS_SUCCESS,
        payload: {
          formations,
          totalFormations,
          numOfPages,
        },
      })
    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const getAttestations = async () => {
    let url = `api/attestations`

    dispatch({ type: GET_ATTESTATIONS_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      const { attestations, totalItems, pagesCount } = data

      const totalAttestations = totalItems
      const numOfPages = pagesCount

      dispatch({
        type: GET_ATTESTATIONS_SUCCESS,
        payload: {
          attestations,
          totalAttestations,
          numOfPages,
        },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }

  const getModules = async () => {
    let url = `api/modules`

    dispatch({ type: GET_MODULES_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      const { modules, totalItems, pagesCount } = data

      const totalModules = totalItems
      const numOfPages = pagesCount

      dispatch({
        type: GET_MODULES_SUCCESS,
        payload: {
          modules,
          totalModules,
          numOfPages,
        },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }

  const getDocuments = async () => {
    let url = `api/pdf/attestations`

    dispatch({ type: GET_DOCUMENTS_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      const { documents, totalItems, pagesCount } = data

      const totalDocuments = totalItems
      const numOfPages = pagesCount

      dispatch({
        type: GET_DOCUMENTS_SUCCESS,
        payload: {
          documents,
          totalDocuments,
          numOfPages,
        },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }
  const startEditFormation = async (id) => {
    dispatch({
      type: EDIT_FORMATION_BEGIN,
    })
    const data = await authFetch.get(`/api/formations/${id}`)
    const formation = data.data

    dispatch({
      type: EDIT_FORMATION_SUCCESS,
      payload: {
        formationToEdit: formation,
      },
    })
  }

  const deleteFormation = async (id) => {
    let url = `/api/formations/${id}`
    dispatch({
      type: DELETE_FORMATION_BEGIN,
    })
    const res = await authFetch.delete(`/api/formations/${id}`)
    console.log(res)
    getFormations()
    dispatch({
      type: DELETE_FORMATION_SUCCESS,
    })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        handleChange,
        clearValues,
        setupUser,
        getFormations,
        getAttestations,
        startEditFormation,
        deleteFormation,
        getModules,
        getDocuments,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
