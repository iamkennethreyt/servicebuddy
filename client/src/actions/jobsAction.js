import axios from "axios";

import {
  GET_ERRORS,
  ADD_JOB,
  GET_JOBS,
  EDIT_JOB,
  CANCEL_JOB,
  DELETE_JOB
} from "./types";

// Add advertisement
export const addJob = add => dispatch => {
  axios
    .post("/api/jobs", add)
    .then(res => {
      dispatch({
        type: ADD_JOB,
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

export const getJobs = () => dispatch => {
  axios
    .get("/api/jobs")
    .then(res => {
      dispatch({
        type: GET_JOBS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: {}
      })
    );
};

export const acceptJob = id => dispatch => {
  axios
    .put(`/api/jobs/${id}`)
    .then(res => {
      alert("Successfully accept request");
      console.log(res);
      dispatch({
        type: EDIT_JOB,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: {}
      })
    );
};

export const cancelJob = (id, _id) => dispatch => {
  axios
    .put(`/api/jobs/balik/${id}`, { id: _id })
    .then(res => {
      alert("Successfully cancel request");
      console.log(res);
      dispatch({
        type: GET_JOBS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: {}
      })
    );
};

export const completeJob = id => dispatch => {
  axios.delete(`/api/jobs/${id}`).then(res => {
    alert("Successfully completted!!");
    console.log(res);
    dispatch({
      type: DELETE_JOB,
      payload: res.data
    });
  });
};

// // show all advertisementss
// export const getAdvertisements = () => dispatch => {
//   dispatch(setLoading());
//   axios
//     .get("/api/advertisements")
//     .then(res => {
//       dispatch({
//         type: GET_ADVERTISEMENTS,
//         payload: res.data
//       });
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: {}
//       })
//     );
// };

// // delete single advertisements
// export const deleteAdvertisement = id => dispatch => {
//   axios
//     .delete(`/api/advertisements/${id}`)
//     .then(res => {
//       dispatch({
//         type: DELETE_ADVERTISEMENT,
//         payload: res.data
//       });
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Set loading state
// export const setLoading = () => {
//   return {
//     type: LOADING_ADVERTISEMENTS
//   };
// };
