import {
  GET_ADVERTISEMENTS,
  LOADING_ADVERTISEMENTS,
  DELETE_ADVERTISEMENT,
  ADD_ADVERTISEMENT
} from "../actions/types";

const initialState = {
  loading: false,
  advertisements: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_ADVERTISEMENTS:
      return {
        ...state,
        advertisements: action.payload,
        loading: true
      };
    case ADD_ADVERTISEMENT:
      return {
        ...state,
        advertisements: [action.payload, ...state.advertisements]
      };
    case GET_ADVERTISEMENTS:
      return {
        ...state,
        advertisements: action.payload,
        loading: false
      };
    case DELETE_ADVERTISEMENT:
      return {
        ...state,
        advertisements: state.advertisements.filter(
          wt => wt._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
