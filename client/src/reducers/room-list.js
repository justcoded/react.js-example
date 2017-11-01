import {
  FETCH_ROOMS_ERROR,
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
} from '../constants/room-list';

const roomList = (state = {items: [], pending: false, error: false}, action) => {
  switch (action.type) {
    case FETCH_ROOMS_REQUEST:
      return {...state, pending: true};
    case FETCH_ROOMS_SUCCESS:
      return {...state, pending: false, error: false, items: action.payload};
    case FETCH_ROOMS_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export default roomList;