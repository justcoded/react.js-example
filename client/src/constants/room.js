export const FETCH_ROOM_REQUEST = 'FETCH_ROOM_REQUEST';
export const FETCH_ROOM_SUCCESS = 'FETCH_ROOM_SUCCESS';
export const FETCH_ROOM_ERROR = 'FETCH_ROOM_ERROR';
export const API_ROUTE = `${process.env.REACT_APP_API_HOST}/api/room/{{id}}`;

export const UPDATE_EVENT_REQUEST = 'UPDATE_EVENT_REQUEST';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_ERROR = 'UPDATE_EVENT_ERROR';
export const API_ROUTE_UPDATE_EVENT = `${process.env.REACT_APP_API_HOST}/api/room/{{roomId}}/event/{{eventId}}`;

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_ERROR = 'CREATE_EVENT_ERROR';
export const API_ROUTE_CREATE_EVENT = `${process.env.REACT_APP_API_HOST}/api/room/{{roomId}}/event`;

export const CLEAR_ERROR_MESSAGES = 'CLEAR_ERROR_MESSAGES';

export const LIVE_RELOAD_EVENT = 'room-change';

