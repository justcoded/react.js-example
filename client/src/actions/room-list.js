import axios from '../helpers/request';
import {getDeviceId} from '../helpers/device';

import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
  API_ROUTE,
} from '../constants/room-list';

export function fetchRooms() {
  const id = getDeviceId();

  return (dispatch) => {
    dispatch({
      type: FETCH_ROOMS_REQUEST
    });

    axios.get(API_ROUTE, {
      headers: {
        deviceId: id
      }
    })
    .then((response) => {
      return response.data;
    })
    .then((rooms) => {
      dispatch({
        type: FETCH_ROOMS_SUCCESS,
        payload: rooms
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ROOMS_ERROR,
        payload: error
      });
    });
  }
}