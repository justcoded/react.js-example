import md5 from 'md5';
import {send} from '../helpers/server-transport';

const DEVICE_ID_KEY = 'deviceId';
const AUTHORIZATION_STATUS_KEY = 'deviceIdAuthorizationStatus';

export const setDeviceId = (id) => {
  localStorage.setItem(DEVICE_ID_KEY, id);
};

export const getDeviceId = () => {
  return localStorage.getItem(DEVICE_ID_KEY);
};

export const generateDeviceId = () => {
  return md5(`${Date.now()}-${getRandomInt(0, 100)}-${getRandomInt(0, 100)}-${getRandomInt(0, 100)}-${getRandomInt(0, 100)}`)
};

export const removeDeviceId = () => {
  return localStorage.removeItem(DEVICE_ID_KEY);
};

export const refreshDeviceId = () => {
  removeDeviceId();

  const newDeviceId = generateDeviceId();

  setDeviceId(newDeviceId);

  return newDeviceId;
};

export const syncDeviceIdWithSockets = (eventName, deviceId) => {
  send(eventName, deviceId);
};

export const setAuthorizationStatus = (status) => {
  return localStorage.setItem(AUTHORIZATION_STATUS_KEY, status);
};

export const getAuthorizationStatus = () => {
  return localStorage.getItem(AUTHORIZATION_STATUS_KEY) === 'true';
};

export const isReady = () => {
  return getDeviceId() && getAuthorizationStatus();
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

