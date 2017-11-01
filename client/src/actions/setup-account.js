import axios from '../helpers/request';

import {
  FETCH_LOGIN_LINK_REQUEST,
  FETCH_LOGIN_LINK_SUCCESS,
  FETCH_LOGIN_LINK_ERROR,
  FETCH_SETUP_ACCOUNT_REQUEST,
  FETCH_SETUP_ACCOUNT_SUCCESS,
  FETCH_SETUP_ACCOUNT_ERROR,
  API_ROUTE,
} from '../constants/setup-account';

import * as device from '../helpers/device';

export function fetchAuthUrl(deviceId) {
  return (dispatch) => {
    dispatch({
      type: FETCH_LOGIN_LINK_REQUEST
    });

    axios.get(API_ROUTE, {
      headers: {
        deviceId
      }
    })
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      dispatch({
        type: FETCH_LOGIN_LINK_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_LOGIN_LINK_ERROR,
        payload: error
      });
    });
  }
}

export function setupAccount(token, id, cb) {
  return (dispatch) => {
    dispatch({
      type: FETCH_SETUP_ACCOUNT_REQUEST
    });

    axios.post(API_ROUTE, {
      token,
      deviceId: id
    })
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      device.setAuthorizationStatus(true);

      cb();

      dispatch({
        type: FETCH_SETUP_ACCOUNT_SUCCESS,
        payload: response.status
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SETUP_ACCOUNT_ERROR,
        payload: error
      });
    });
  }
}
