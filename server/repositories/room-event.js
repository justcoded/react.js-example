const google = require('googleapis');
const calendar = google.calendar('v3');
const moment = require('moment');

const RoomEvent = require('../models/room-event');

module.exports = class RoomEventRepository {
  static getAll(roomId, client) {
    return new Promise((resolve, reject) => {
      calendar.events.list({
        auth: client,
        calendarId: roomId
      }, function (err, response) {
        if (err) {
          return reject(err);
        }

        resolve(response.items.map((event) => {
          return new RoomEvent({
            id: event.id,
            name: event.summary,
            start: (new Date(event.start.dateTime)).getTime(),
            end: (new Date(event.end.dateTime)).getTime()
          });
        }));
      });
    });
  }

  static update(room, event, client) {
    return new Promise((resolve, reject) => {
      calendar.events.patch({
        auth: client,
        eventId: event.id,
        calendarId: room.id,
        resource: {
          end: {
            dateTime: moment.unix(event.end / 1000).toISOString()
          }
        }
      }, function (err, event) {
        if (err) {
          return reject(err);
        }

        resolve(new RoomEvent({
          id: event.id,
          name: event.summary,
          start: (new Date(event.start.dateTime)).getTime(),
          end: (new Date(event.end.dateTime)).getTime()
        }));
      });
    });
  }

  static save(room, event, client) {
    if (event.id) {
      return RoomEventRepository.update(room, event, client);
    }

    return new Promise((resolve, reject) => {
      calendar.events.insert({
        auth: client,
        calendarId: room.id,
        resource: {
          summary: event.name,
          start: {
            dateTime: moment.unix(event.start / 1000).toISOString()
          },
          end: {
            dateTime: moment.unix(event.end / 1000).toISOString()
          }
        }
      }, function (err, event) {
        if (err) {
          return reject(err);
        }

        resolve(new RoomEvent({
          id: event.id,
          name: event.summary,
          start: (new Date(event.start.dateTime)).getTime(),
          end: (new Date(event.end.dateTime)).getTime()
        }));
      });
    });
  }
};