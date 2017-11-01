import {on} from '../helpers/server-transport';
import {CHECK_IS_LOGIN, UPDATE_LOGIN_STATUS} from '../constants/login';

export function checkLoginStatus() {
  return (dispatch) => {
    on(CHECK_IS_LOGIN, (data) => {
      if (!data) {
        return
      }
      dispatch({
        type: UPDATE_LOGIN_STATUS,
        payload: {
          logged: data.status
        }
      })
    });
  };
}