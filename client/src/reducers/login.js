import {UPDATE_LOGIN_STATUS} from '../constants/login';

const login = (state = {logged: false}, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_STATUS:
      return {...state, logged: action.payload.logged};
    default:
      return state;
  }
};

export default login;