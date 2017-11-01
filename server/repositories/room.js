const debug = require('debug')('app:room-repository');
const google = require('googleapis');
const calendar = google.calendar('v3');

const Room = require('../models/room');

module.exports = class RoomRepository {
  static get registry() {
    if (!RoomRepository._registry) {
      RoomRepository._registry = [];
    }

    return RoomRepository._registry;
  }

  static addToRegistry(room, deviceId) {
    RoomRepository._registry = RoomRepository._registry.filter((savedRoom) => savedRoom.id !== room.id);

    const isExist = RoomRepository._registry.some(item => {
      return item.deviceId === deviceId
    });

    if (!isExist) {
      RoomRepository._registry.push({room, deviceId});
    }
  }

  static getByDeviceId(deviceId) {
    const data = RoomRepository.registry.find((data) => data.deviceId === deviceId);

    return data ? data.room : null;
  }

  static get(id, client, deviceId) {
    return new Promise((resolve, reject) => {
      calendar.calendars.get({
        auth: client,
        calendarId: id
      }, function (err, calendar) {
        if (err) {
          return reject(err);
        }

        const room = new Room({
          id: calendar.id,
          name: calendar.summary
        });

        RoomRepository.addToRegistry(room, deviceId);

        resolve(room);
      });
    });
  }

  static getAll(client) {
    return new Promise((resolve, reject) => {
      calendar.calendarList.list({
        auth: client,
        minAccessRole: 'owner'
      }, function (err, response) {
        if (err) {
          return reject(err);
        }

        resolve(response.items.filter((calendar) => !calendar.primary).map((calendar) => {
          return new Room({
            id: calendar.id,
            name: calendar.summary
          });
        }));
      });
    });
  }
};