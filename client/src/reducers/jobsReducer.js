import {
  GET_JOBS,
  ADD_JOB,
  EDIT_JOB,
  CANCEL_JOB,
  DELETE_JOB
} from "../actions/types";

const initialState = {
  loading: false,
  jobs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload
      };
    case EDIT_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(wt => wt._id !== action.payload._id)
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(wt => wt._id !== action.payload._id)
      };
    default:
      return state;
  }
}
