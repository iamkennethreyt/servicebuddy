import {
  GET_WORKER_TYPES,
  LOADING_WORKER_TYPES,
  DELETE_WORKER_TYPE,
  ADD_WORKER_TYPE
} from "../actions/types";

const initialState = {
  loading: false,
  workertypes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_WORKER_TYPES:
      return {
        ...state,
        workertypes: action.payload,
        loading: true
      };
    case ADD_WORKER_TYPE:
      return {
        ...state,
        workertypes: [action.payload, ...state.workertypes]
      };
    case GET_WORKER_TYPES:
      return {
        ...state,
        workertypes: action.payload,
        loading: false
      };
    case DELETE_WORKER_TYPE:
      return {
        ...state,
        workertypes: state.workertypes.filter(
          wt => wt._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
