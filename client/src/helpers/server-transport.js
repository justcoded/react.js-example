import io from 'socket.io-client';

import {
  URL
} from '../constants/server-transport';

const socket = io(URL);

export function send(event, data) {
  socket.emit(event, data);
}

export function on(event, cb) {
  socket.on(event, cb);
}