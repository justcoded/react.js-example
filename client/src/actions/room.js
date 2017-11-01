import axios from '../helpers/request';
import {on} from '../helpers/server-transport';

import {
  FETCH_ROOM_REQUEST,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_ERROR,
  API_ROUTE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_ERROR,
  API_ROUTE_UPDATE_EVENT,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  API_ROUTE_CREATE_EVENT,
  LIVE_RELOAD_EVENT,
  CLEAR_ERROR_MESSAGES
} from '../constants/room';

import {getDeviceId} from '../helpers/device';

export function fetchRoom(roomId) {
  const id = getDeviceId();

  return (dispatch) => {
    dispatch({
      type: FETCH_ROOM_REQUEST
    });

    axios.get(API_ROUTE.replace('{{id}}', roomId), {
      headers: {
        deviceId: id
      }
    })
    .then((response) => {
      return response.data;
    })
    .then((room) => {
      dispatch({
        type: FETCH_ROOM_SUCCESS,
        payload: room
      })
    })
    .catch((error) => {
      dispatch({
        type: FETCH_ROOM_ERROR,
        payload: error
      });
    });
  }
}

export function updateEvent(roomId, eventId, event, cb) {
  const id = getDeviceId();

  return (dispatch) => {
    dispatch({
      type: UPDATE_EVENT_REQUEST
    });

    const url = API_ROUTE_UPDATE_EVENT.replace('{{roomId}}', roomId).replace('{{eventId}}', eventId);

    const options = {
      headers: {
        'Content-Type': 'application/json',
        deviceId: id
      }
    };
    axios.put(url, JSON.stringify(event), options)
      .then((response) => {
        return response.data;
      })
      .then((event) => {
        if (cb) { cb(); }

        dispatch({
          type: UPDATE_EVENT_SUCCESS,
          payload: event
        })
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_EVENT_ERROR,
          payload: error
        });
      });
  }
}

export function createEvent(roomId, deviceId, event, cb) {
  const id = getDeviceId();

  return (dispatch) => {
    dispatch({
      type: CREATE_EVENT_REQUEST
    });

    const url = API_ROUTE_CREATE_EVENT.replace('{{roomId}}', roomId);

    const options = {
      headers: {
        'Content-Type': 'application/json',
        deviceId: id
      }
    };
    axios.post(url, JSON.stringify({...event, deviceId}), options)
      .then((response) => {
        return response.data;
      })
      .then((event) => {
        if (cb) { cb(); }

        dispatch({
          type: CREATE_EVENT_SUCCESS,
          payload: event
        })
      })
      .catch((error) => {
        dispatch({
          type: CREATE_EVENT_ERROR,
          payload: error
        });
      });
  }
}

export function initLiveUpdate(roomId) {
  return (dispatch) => {
    on(LIVE_RELOAD_EVENT, (room) => {
      if (room.id !== roomId) {
        return;
      }

      dispatch({
        type: FETCH_ROOM_SUCCESS,
        payload: room
      })
    });
  };
}

export function clearErrorMessages() {
  return {
    type: CLEAR_ERROR_MESSAGES
  }
}