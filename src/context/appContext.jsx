import React from 'react'
import axios from 'axios'
import { useState, useEffect, useReducer, useContext } from 'react'
import reducer from './reducer'
import config from'../config'
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
  GET_ETUDIANTS_BEGIN,
  GET_ETUDIANTS_SUCCESS,
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
const baseUrl =config.BASE_URL
const AppProvider = ({ children }) => {
  const savedState = JSON.parse(localStorage.getItem('appliState'))
  const [state, dispatch] = useReducer(reducer, savedState || initialState)

  useEffect(() => {
    localStorage.setItem('appliState', JSON.stringify(state))
  }, [state])


  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ContentType: 'application/json',
    },
  }
  // axios
  const authFetch = axios.create({
    baseURL: baseUrl,
    headers: config.headers,
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
      if (error.response && error.response.status !== 200) {
        // Si le statut de la réponse n'est pas 200, vous pouvez afficher votre alerte ici.
        displayAlert();
      }
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response ? error.response.data.msg : "Error" },
      });
    }
    clearAlert()
  }

  const logoutUser = async () => {
    localStorage.removeItem('token')
    // Remove token from local storage
    dispatch({ type: LOGOUT_USER })
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  //get Formations
  const getFormations = async (pageNumber = 1) => {
    // Default to page 1 if no page number is provided

    let url = `api/formations?page=${pageNumber}` // Add the page query parameter to the URL

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

  const getAttestations = async (startDate, endDate) => {
    let url = `api/attestations`

    // If startDate and endDate are provided, append them to the URL.
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`
    }

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
  const getEtudiants = async () => {
    let url = `api/etudiants`

    dispatch({ type: GET_ETUDIANTS_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      const { etudiants, totalItems, pagesCount } = data

      const totalEtudiants = totalItems
      const numOfPages = pagesCount

      dispatch({
        type: GET_ETUDIANTS_SUCCESS,
        payload: {
          etudiants,
          totalEtudiants,
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
        authFetch,
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
        getEtudiants,
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
