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
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Remplissez tous les champs S.V.P',
      }

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }

    case SETUP_USER_BEGIN:
      return { ...state, isLoading: true }

    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }

    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: ' Invalid Username/Password !',
      }

    case LOGOUT_USER:
      return {
        ...initialState,
        user: '',
      }

    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      }

    case CLEAR_VALUES:
      return {
        ...state,
        isEditing: false,
      }

    case GET_FORMATIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      }

    case GET_FORMATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        formations: action.payload.formations,
        numOfPages: action.payload.numOfPages,
        totalFormations: action.payload.totalFormations,
      }

    //get Attestations
    case GET_ATTESTATIONS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      }

    case GET_ATTESTATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attestations: action.payload.attestations,
        numOfPages: action.payload.numberOfPages,
        totalAttestations: action.payload.totalAttestations,
      }

  //get Modules
   case GET_MODULES_BEGIN:
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }

  case GET_MODULES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      modules: action.payload.modules,
      numOfPages: action.payload.numberOfPages,
      totalModules: action.payload.totalModules,
    }
    //get Documents
    case GET_DOCUMENTS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      }

    case GET_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        documents: action.payload.documents,
        numOfPages: action.payload.numberOfPages,
        totalDocuments: action.payload.totalDocuments,
      }
      //etudiant get
  case GET_ETUDIANTS_BEGIN:
  return {
    ...state,
    isLoading: true,
    showAlert: false,
  }

case GET_ETUDIANTS_SUCCESS:
  return {
    ...state,
    isLoading: false,
    etudiants: action.payload.etudiants,
    numOfPages: action.payload.numberOfPages,
    totalEtudiants: action.payload.totalEtudiants,
  }
//editformation
    case EDIT_FORMATION_BEGIN:
      console.log(action.payload.formationId)
      return {
        ...state,
        formationId: action.payload.formationId,
      }
    case EDIT_FORMATION_SUCCESS:
      return {
        ...state,
        formationToEdit: action.payload.formationToEdit,
      }
    case DELETE_FORMATION_BEGIN:
      return {
        ...state,
      }
    case DELETE_FORMATION_SUCCESS:
      return {
        ...state,
      }

    default:
      throw new Error(`no such action : ${action.type}`)
  }
}

export default reducer
