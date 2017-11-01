import {SET_TIMER_COUNTDOWN} from '../constants/timer';

const timer = (state = {endTime: null}, action) => {
  switch (action.type) {
    case SET_TIMER_COUNTDOWN:
      return {...state, endTime: action.payload};
    default:
      return state;
  }
};

export default timer;