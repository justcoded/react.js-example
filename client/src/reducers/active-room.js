import {
  SELECT_ROOM,
} from '../constants/active-room';
import {getActiveRoomId} from '../helpers/active-room';

const activeRoom = (state = {id: getActiveRoomId()}, action) => {
  switch (action.type) {
    case SELECT_ROOM:
      return {...state, id: action.payload};
    default:
      return state;
  }
};

export default activeRoom;