import React from 'react'
import axios from 'axios'
import { useReducer } from 'react'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  GET_FORMATIONS_BEGIN,
  GET_FORMATIONS_SUCCESS,
  GET_ATTESTATIONS_BEGIN,
  GET_ATTESTATIONS_SUCCESS,
  GET_MODULES_BEGIN,
  GET_MODULES_SUCCESS,
  GET_DOCUMENTS_BEGIN,
  GET_DOCUMENTS_SUCCESS,
} from './actions'
import { initialState, AppContext } from './appContext'

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
   // baseURL: 'https://www.app.tunitech-engineering.com',
    baseURL: 'http://127.0.0.1:8000/',
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
  // user Login 
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await authFetch.post(`${endPoint}`, currentUser)

      const { user } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  // user Logout 
  const logoutUser = async () => {
    await authFetch.get('/logout')
    dispatch({ type: LOGOUT_USER })
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }


  // get Formations
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

      res = { data, totalItems, pagesCount }

      console.log(res)
      const { formations, totalFormations, numOfPages } = {
        data,
        totalItems,
        pagesCount,
      }

      dispatch({
        type: GET_FORMATIONS_SUCCESS,
        payload: {
          formations,
          totalFormations,
          numOfPages,
        },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }

  // get Attestations

  const getAttestations = async () => {
    // const { page, search, searchStatus, searchType, sort } = state
    // let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    // if (search) {
    //   url = url + `&search=${search}`
    // }
    let url = `api/attestaions`

    dispatch({ type: GET_ATTESTATIONS_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      res = { data, totalItems, pagesCount }

      console.log(res)
      const { attestations, totalAttestations, numOfPages } = {
        data,
        totalItems,
        pagesCount,
      }

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
    // const { page, search, searchStatus, searchType, sort } = state
    // let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    // if (search) {
    //   url = url + `&search=${search}`
    // }
    let url = `api/attestaions`

    dispatch({ type: GET_MODULES_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      res = { data, totalItems, pagesCount }

      console.log(res)
      const { modules, totalModules, numOfPages } = {
        data,
        totalItems,
        pagesCount,
      }

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
    // const { page, search, searchStatus, searchType, sort } = state
    // let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    // if (search) {
    //   url = url + `&search=${search}`
    // }
    let url = `api/attestaions`

    dispatch({ type: GET_DOCUMENTS_BEGIN })
    try {
      const { data } = await authFetch.get(url)

      res = { data, totalItems, pagesCount }

      console.log(res)
      const { documents, totalDocuments, numOfPages } = {
        data,
        totalItems,
        pagesCount,
      }

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
        getModules,
        getDocuments
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
