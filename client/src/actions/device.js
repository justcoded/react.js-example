import {send, on} from '../helpers/server-transport';
import * as device from '../helpers/device';

import {
  SET_DEVICE,
  SEND_DEVICE_ID_TRANSPORT_EVENT,
  STATE_CHANGE_EVENT
} from '../constants/device';

export function initDevice(onStateChangeCb) {
  return dispatch => {
    let deviceId = device.getDeviceId();
    let authorizationStatus = device.getAuthorizationStatus();

    if (!deviceId || !authorizationStatus) {
      deviceId = device.generateDeviceId();

      device.setDeviceId(deviceId);
      device.setAuthorizationStatus(false);
    }

    send(SEND_DEVICE_ID_TRANSPORT_EVENT, {
      deviceId
    });

    on(STATE_CHANGE_EVENT, (data) => {
      onStateChangeCb(data.state, data.payload);
    });

    dispatch({
      type: SET_DEVICE,
      payload: {
        id: deviceId
      }
    })
  }
}