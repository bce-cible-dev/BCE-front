import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  HANDLE_CHANGE,
  // LOGOUT_USER,
  CLEAR_VALUES,
  GET_FORMATIONS_BEGIN,
  GET_FORMATIONS_SUCCESS,
  GET_ATTESTATIONS_BEGIN,
  GET_ATTESTATIONS_SUCCESS,
} from './actions'

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
        alertText: action.payload.msg,
      }

    case HANDLE_CHANGE:
      return {
        ...state,
        page: 1,
        [action.payload.name]: action.payload.value,
      }

    case CLEAR_VALUES:
      const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: state.userLocation,
        jobType: 'full-time',
        status: 'pending',
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
        numOfPages: action.payload.numberOfPages,
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

    default:
      throw new Error(`no such action : ${action.type}`)
  }
}

export default reducer
