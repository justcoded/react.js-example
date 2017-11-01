import {SET_TIMER_COUNTDOWN} from '../constants/timer';

export function startCountDown(endTime) {
  return {
    type: SET_TIMER_COUNTDOWN,
    payload: endTime
  }
}