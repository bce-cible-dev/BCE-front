import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  HANDLE_CHANGE,
  LOGOUT_USER,
  CLEAR_VALUES,
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

import { initialState } from './appContext';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
      // Display alert action
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Remplissez tous les champs S.V.P', // Specify the alert message
      };

      // Clear alert action
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };

      // Setup user begin action
    case SETUP_USER_BEGIN:
      return { ...state, isLoading: true };

      // Setup user success action
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText, // Specify the alert message
      };

      // Setup user error action
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: ' Invalid Username/Password !',
      };

      // Logout user action
    case LOGOUT_USER:
      return {
        ...initialState, // Reset state to initial state
        user: '',
      };

      // Handle change action (for form inputs)
    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1, // Reset page number
        [action.payload.name]: action.payload.value, // Update form field
      };

      // Clear values action (for form)
    case CLEAR_VALUES:
      return {
        ...state,
        isEditing: false, // Reset editing state
      };

      // Get formations begin action
    case GET_FORMATIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

      // Get formations success action
    case GET_FORMATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        formations: action.payload.formations,
        totalFormations: action.payload.totalFormations,
      };

      // Get clients begin action
    case GET_CLIENTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

      // Get clients success action
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clients: action.payload.clients,
        numOfPages: action.payload.numberOfPages,
        totalClients: action.payload.totalClients,
      };

      // Get attestations begin action
    case GET_ATTESTATIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

      // Get attestations success action
    case GET_ATTESTATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attestations: action.payload.attestations,
        totalAttestations: action.payload.totalAttestations,
      };

      // Get modules begin action
    case GET_MODULES_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

      // Get modules success action
    case GET_MODULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        modules: action.payload.modules,
        totalModules: action.payload.totalModules,
      };

      // Get documents begin action
    case GET_DOCUMENTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

      // Get documents success action
    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        documents: action.payload.documents,
        numOfPages: action.payload.numberOfPages,
        totalDocuments: action.payload.totalDocuments,
      };

      // Get etudiants begin action
    case GET_ETUDIANTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };

      // Get etudiants success action
    case GET_ETUDIANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        etudiants: action.payload.etudiants,
        numOfPages: action.payload.numberOfPages,
        totalEtudiants: action.payload.totalEtudiants,
      };

      // Edit formation begin action
    case EDIT_FORMATION_BEGIN:
      console.log(action.payload.formationId);
      return {
        ...state,
        formationId: action.payload.formationId,
      };

      // Edit formation success action
    case EDIT_FORMATION_SUCCESS:
      return {
        ...state,
        formationToEdit: action.payload.formationToEdit,
      };

      // Delete formation begin action
    case DELETE_FORMATION_BEGIN:
      return {
        ...state,
      };

      // Delete formation success action
    case DELETE_FORMATION_SUCCESS:
      return {
        ...state,
      };

      // Default case, throw an error for an unknown action type
    default:
      throw new Error(`no such action: ${action.type}`);
  }
};

export default reducer;
