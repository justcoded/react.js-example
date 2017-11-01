import {
  SET_DEVICE,
} from '../constants/device';

const device = (state = {id: null}, action) => {
  switch (action.type) {
    case SET_DEVICE:
      return {...state, id: action.payload.id};
    default:
      return state;
  }
};

export default device;