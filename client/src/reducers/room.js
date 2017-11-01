import {
  FETCH_ROOM_ERROR,
  FETCH_ROOM_REQUEST,
  FETCH_ROOM_SUCCESS,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  CLEAR_ERROR_MESSAGES
} from '../constants/room';

const room = (state = {item: null, error: false, loading: false, createEventError: false}, action) => {
  switch (action.type) {
    case FETCH_ROOM_REQUEST:
      return {...state, loading: true};
    case FETCH_ROOM_SUCCESS:
      return {...state, error: false, item: action.payload, loading: false};
    case FETCH_ROOM_ERROR:
      return {...state, error: action.payload, loading: false};
    case UPDATE_EVENT_REQUEST:
      return {...state, loading: true};
    case UPDATE_EVENT_SUCCESS:
      return {...state, error: false, item: action.payload, loading: false};
    case UPDATE_EVENT_ERROR:
      return {...state, error: action.payload, loading: false};
    case CREATE_EVENT_REQUEST:
      return {...state, loading: true};
    case CREATE_EVENT_SUCCESS:
      return {...state, createEventError: false, item: action.payload, loading: false};
    case CREATE_EVENT_ERROR:
      return {...state, createEventError: action.payload, loading: false};
    case CLEAR_ERROR_MESSAGES:
      return {...state, createEventError: false, error: false};
    default:
      return state;
  }
};

export default room;