import {setActiveRoomId} from '../helpers/active-room';
import {
  SELECT_ROOM,
} from '../constants/active-room';

export function selectRoom(roomId) {
  setActiveRoomId(roomId);

  return {
    type: SELECT_ROOM,
    payload: roomId
  };
}