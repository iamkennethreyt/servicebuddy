import { GET_WORKER, GET_WORKERS, LOADING_WORKERS } from "../actions/types";

const initialState = {
  worker: {},
  workers: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_WORKERS:
      return {
        ...state,
        workertypes: action.payload,
        loading: true
      };
    case GET_WORKER:
      return {
        ...state,
        loading: false,
        worker: action.payload
      };
    case GET_WORKERS:
      return {
        ...state,
        loading: false,
        workers: action.payload
      };
    default:
      return state;
  }
}
