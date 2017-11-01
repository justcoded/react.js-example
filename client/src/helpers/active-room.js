const ACTIVE_ROOM_ID = 'activeRoomId';

export function getActiveRoomId() {
  return localStorage.getItem(ACTIVE_ROOM_ID);
}

export function setActiveRoomId(roomId) {
  localStorage.setItem(ACTIVE_ROOM_ID, roomId);
}

export function removeActiveRoomId() {
  window.localStorage.removeItem(ACTIVE_ROOM_ID);
}