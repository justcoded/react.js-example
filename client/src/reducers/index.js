import {combineReducers} from 'redux';
import roomList from './room-list';
import room from './room';
import activeRoom from './active-room';
import device from './device';
import login from './login';
import setup from './setup-account';
import timer from './timer';

const App = combineReducers({
  roomList,
  room,
  activeRoom,
  device,
  login,
  setup,
  timer
});

export default App