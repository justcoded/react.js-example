const debug = require('debug')('app:room-sync');

const roomSyncConfigs = require('../configs/room-sync');

const RoomEventRepository = require('../repositories/room-event');
const RoomRepository = require('../repositories/room');
const DeviceTransportRepository = require('../repositories/device-transport');
const AuthorizedDevicesRepository = require('../repositories/admin-authorization-client');

module.exports = function () {
  const roomCache = {};

  setInterval(() => {
    DeviceTransportRepository.deviceIds.forEach((deviceId) => {
      const client = AuthorizedDevicesRepository.get(deviceId);
      const room = RoomRepository.getByDeviceId(deviceId);

      if (room) {
        RoomRepository.get(room.id, client, deviceId)
          .then((room) => {
            return RoomEventRepository.getAll(room.id, client)
              .then((events) => {
                room.events = events;

                return room;
              })
          })
          .then((newRoom) => {
            if (!room.isEqual(newRoom) && roomCache[room.id]) {
              DeviceTransportRepository.send(deviceId, roomSyncConfigs.roomChangeEventCode, newRoom);
            }

            roomCache[room.id] = newRoom;
          }).catch((err) => {
            debug(err);
          });
      }
    });
  }, roomSyncConfigs.interval);
};