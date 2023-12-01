// Importing necessary modules and components
import React from 'react';
import axios from 'axios';
import { useState, useEffect, useReducer, useContext } from 'react';
import reducer from './reducer';
import config from '../config';
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
  GET_CLIENTS_BEGIN,
  GET_CLIENTS_SUCCESS,
} from './actions';

// Initial state for the context
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
};

// Creating a React context
const AppContext = React.createContext();

// Base URL for API requests
const baseUrl = config.BASE_URL;

// AppProvider component responsible for providing state and functions to its children
const AppProvider = ({ children }) => {
  // Retrieving the saved state from localStorage or using the initial state
  const savedState = JSON.parse(localStorage.getItem('appliState'));
  const [state, dispatch] = useReducer(reducer, savedState || initialState);

  // Effect to update localStorage when the state changes
  useEffect(() => {
    localStorage.setItem('appliState', JSON.stringify(state));
  }, [state]);

  // Configuration object for headers
  const appConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ContentType: 'application/json',
    },
  };

  // Creating an instance of axios with the configured headers
  const authFetch = axios.create({
    baseURL: baseUrl,
    headers: appConfig.headers,
  });

  // Axios interceptor for handling unauthorized access
  authFetch.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      }
  );

  // Function to display an alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // Function to clear the alert after a certain duration
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // Function to set up a user
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`${baseUrl}/${endPoint}`, currentUser);
      const { user, token } = data;
      localStorage.setItem('token', token);

      console.log('user', user);
      console.log('token', token);

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText },
      });
    } catch (error) {
      if (error.response && error.response.status !== 200) {
        displayAlert();
      }
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response ? error.response.data.msg : 'Error' },
      });
    }
    clearAlert();
  };

  // Function to log out a user
  const logoutUser = async () => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT_USER });
  };

  // Function to handle changes in a form
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  // Function to clear form values
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // Function to get formations
  const getFormations = async (pageNumber = 1) => {
    let url = `api/formations?page=${pageNumber}`;
    dispatch({ type: GET_FORMATIONS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { formations, totalItems } = data;
      const totalFormations = totalItems;

      dispatch({
        type: GET_FORMATIONS_SUCCESS,
        payload: {
          formations,
          totalFormations,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  // Function to get attestations
  const getAttestations = async (startDate, endDate) => {
    let url = `api/attestations`;
    if (startDate && endDate) {
      url += `?startDate=${startDate}&endDate=${endDate}`;
    }

    dispatch({ type: GET_ATTESTATIONS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { attestations, totalItems } = data;
      const totalAttestations = totalItems;

      dispatch({
        type: GET_ATTESTATIONS_SUCCESS,
        payload: {
          attestations,
          totalAttestations,
        },
      });
    } catch (error) {
      // Handle error
    }
    clearAlert();
  };

  // Function to get etudiants
  const getEtudiants = async () => {
    let url = `api/etudiants`;
    dispatch({ type: GET_ETUDIANTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { etudiants, totalItems, pagesCount } = data;
      const totalEtudiants = totalItems;
      const numOfPages = pagesCount;

      dispatch({
        type: GET_ETUDIANTS_SUCCESS,
        payload: {
          etudiants,
          totalEtudiants,
          numOfPages,
        },
      });
    } catch (error) {
      // Handle error
    }
    clearAlert();
  };

  // Function to get clients
  const getClients = async () => {
    let url = `api/clients`;
    dispatch({ type: GET_CLIENTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const clients = data;
      console.log(clients);
      dispatch({
        type: GET_CLIENTS_SUCCESS,
        payload: {
          clients,
        },
      });
    } catch (error) {
      // Handle error
    }
    clearAlert();
  };

  // Function to get modules
  const getModules = async () => {
    let url = `api/modules`;
    dispatch({ type: GET_MODULES_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { modules, totalItems } = data;
      const totalModules = totalItems;

      dispatch({
        type: GET_MODULES_SUCCESS,
        payload: {
          modules,
          totalModules,
        },
      });
    } catch (error) {
      // Handle error
    }
    clearAlert();
  };

  // Function to get documents
  const getDocuments = async () => {
    let url = `api/pdf/attestations`;
    dispatch({ type: GET_DOCUMENTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { documents, totalItems, pagesCount } = data;
      const totalDocuments = totalItems;
      const numOfPages = pagesCount;

      dispatch({
        type: GET_DOCUMENTS_SUCCESS,
        payload: {
          documents,
          totalDocuments,
          numOfPages,
        },
      });
    } catch (error) {
      // Handle error
    }
    clearAlert();
  };

  // Function to start editing a formation
  const startEditFormation = async (id) => {
    dispatch({
      type: EDIT_FORMATION_BEGIN,
    });
    const data = await authFetch.get(`/api/formations/${id}`);
    const formation = data.data;

    dispatch({
      type: EDIT_FORMATION_SUCCESS,
      payload: {
        formationToEdit: formation,
      },
    });
  };

  // Function to delete a formation
  const deleteFormation = async (id) => {
    let url = `/api/formations/${id}`;
    dispatch({
      type: DELETE_FORMATION_BEGIN,
    });
    try {
      const res = await authFetch.delete(url);
      console.log(res);
      getFormations();
      dispatch({
        type: DELETE_FORMATION_SUCCESS,
      });
    } catch (error) {
      // Handle error
    }
  };

  // Providing the context values to the children components
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
            getFormations,
            getAttestations,
            startEditFormation,
            deleteFormation,
            getEtudiants,
            getModules,
            getDocuments,
            getClients,
          }}
      >
        {children}
      </AppContext.Provider>
  );
};

// Custom hook to access the AppContext
const useAppContext = () => {
  return useContext(AppContext);
};

// Exporting the AppProvider and useAppContext
export { AppProvider, initialState, useAppContext };
