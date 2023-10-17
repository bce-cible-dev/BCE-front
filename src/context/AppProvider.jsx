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
} from './actions'
import { initialState, AppContext } from './appContext'

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: 'https://www.app.tunitech-engineering.com',
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
