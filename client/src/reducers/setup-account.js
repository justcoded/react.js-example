import {
  FETCH_LOGIN_LINK_REQUEST,
  FETCH_LOGIN_LINK_SUCCESS,
  FETCH_LOGIN_LINK_ERROR,
  FETCH_SETUP_ACCOUNT_REQUEST,
  FETCH_SETUP_ACCOUNT_SUCCESS,
  FETCH_SETUP_ACCOUNT_ERROR,
} from '../constants/setup-account';

const setup = (state = {link: '', error: false, status: ''}, action) => {
  switch (action.type) {
    case FETCH_LOGIN_LINK_REQUEST:
      return state;
    case FETCH_LOGIN_LINK_SUCCESS:
      return {...state, ...action.payload};
    case FETCH_LOGIN_LINK_ERROR:
      return {...state, error: action.payload};
    case FETCH_SETUP_ACCOUNT_REQUEST:
      return state;
    case FETCH_SETUP_ACCOUNT_SUCCESS:
      return {...state, status: action.payload};
    case FETCH_SETUP_ACCOUNT_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
};

export default setup;