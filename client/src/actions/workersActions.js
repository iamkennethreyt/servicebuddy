import axios from "axios";

import {
  GET_ERRORS,
  PUT_USER,
  GET_WORKER,
  GET_WORKERS,
  CLEAR_ERRORS,
  LOADING_WORKERS
} from "./types";

//get previous user
export const getWorker = id => dispatch => {
  dispatch(clearErrors());
  dispatch(setLoading());
  axios
    .get(`/api/users/worker/${id}`)
    .then(res => {
      dispatch({
        payload: res.data,
        type: GET_WORKER
      });
    })
    .catch(err => {
      dispatch({
        payload: {},
        type: GET_WORKER
      });
    });
};

//show all workers
export const getWorkers = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/users/workers/`)
    .then(res => {
      dispatch({
        payload: res.data,
        type: GET_WORKERS
      });
    })
    .catch(err => {
      dispatch({
        payload: {},
        type: GET_WORKERS
      });
    });
};

//profile settings
export const profileSettings = newData => dispatch => {
  axios
    .put("/api/users/settings/account", newData)
    .then(res => {
      dispatch({
        type: PUT_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//rate worker
export const rateWorker = (data, success) => dispatch => {
  axios
    .put(`/api/users/rating/${data._id}`, data)
    .then(() => {
      // dispatch({
      //   type: PUT_USER,
      //   payload: res.data
      // });
      success();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//rate worker
export const addFeedBack = (data, success) => dispatch => {
  console.log(data);
  axios
    .put(`/api/users/feedback/${data._id}`, { feedback: data.feedback })
    .then(() => {
      success();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set loading state
export const setLoading = () => {
  return {
    type: LOADING_WORKERS
  };
};
