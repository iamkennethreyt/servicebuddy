import axios from "axios";

import {
  GET_ADVERTISEMENTS,
  ADD_ADVERTISEMENT,
  GET_ERRORS,
  DELETE_ADVERTISEMENT,
  CLEAR_ERRORS,
  LOADING_ADVERTISEMENTS
} from "./types";

// Add advertisement
export const addAdvertisement = add => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
  axios
    .post("/api/advertisements", add)
    .then(res => {
      dispatch({
        type: ADD_ADVERTISEMENT,
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

// show all advertisementss
export const getAdvertisements = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/advertisements")
    .then(res => {
      dispatch({
        type: GET_ADVERTISEMENTS,
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

// delete single advertisements
export const deleteAdvertisement = id => dispatch => {
  axios
    .delete(`/api/advertisements/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ADVERTISEMENT,
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
    type: LOADING_ADVERTISEMENTS
  };
};
