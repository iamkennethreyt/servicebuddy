import axios from "axios";

import {
  GET_WORKER_TYPES,
  ADD_WORKER_TYPE,
  GET_ERRORS,
  DELETE_WORKER_TYPE,
  CLEAR_ERRORS,
  LOADING_WORKER_TYPES
} from "./types";

// Add worker type
export const addWorkerType = userData => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/api/workertypes", userData)
    .then(res => {
      dispatch({
        type: ADD_WORKER_TYPE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// show all get worker
export const getWorkerTypes = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/workertypes")
    .then(res => {
      dispatch({
        type: GET_WORKER_TYPES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

// delete single worker type
export const deleteWorkerType = id => dispatch => {
  axios
    .delete(`/api/workertypes/${id}`, id)
    .then(res => {
      dispatch({
        type: DELETE_WORKER_TYPE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setLoading = () => {
  return {
    type: LOADING_WORKER_TYPES
  };
};
