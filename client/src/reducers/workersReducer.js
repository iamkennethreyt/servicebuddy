import { GET_WORKER, GET_WORKERS } from "../actions/types";

const initialState = {
  worker: {},
  workers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WORKER:
      return {
        ...state,
        worker: action.payload
      };
    case GET_WORKERS:
      return {
        ...state,
        workers: action.payload
      };
    default:
      return state;
  }
}
