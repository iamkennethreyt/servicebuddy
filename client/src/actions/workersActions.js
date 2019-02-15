import axios from "axios";

import { GET_ERRORS, PUT_USER, GET_WORKER, CLEAR_ERRORS } from "./types";

//get previous user
export const getWorker = id => dispatch => {
  dispatch(clearErrors());
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

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
