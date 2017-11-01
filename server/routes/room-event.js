const express = require('express');
const router = express.Router();

const RoomRepository = require('../repositories/room');
const RoomEventRepository = require('../repositories/room-event');
const Room = require('../models/room');
const RoomEvent = require('../models/room-event');
const AuthorizationClientRepository = require('../repositories/authorization-client');
const AdminAuthorizationClientRepository = require('../repositories/admin-authorization-client');

router.put('/api/room/:roomId/event/:eventId', (req, res) => {
  const room = new Room({
    id: req.params.roomId
  });
  const deviceId = req.header('deviceId');

  const event = new RoomEvent({
    id: req.params.eventId,
    end: req.body.end
  });

  const client = AdminAuthorizationClientRepository.get(deviceId);
  if (!client) {
    res.status(401);
    res.json({
      scope: 'admin',
      error: 'authorization failed'
    })
  }
  RoomEventRepository.save(room, event, client)
    .then(() => {
      return RoomRepository.get(room.id, client, deviceId)
    })
    .then((room) => {
      return RoomEventRepository.getAll(room.id, client)
        .then((events) => {
          room.events = events;

          res.json(room)
        });
    })
    .catch((err) => {
      res.status(err.code ? err.code : 400);
      res.json({
        error: err.message
      });
    });
});

router.post('/api/room/:roomId/event', (req, res) => {
  const room = new Room({
    id: req.params.roomId
  });

  const deviceId = req.body.deviceId;
  const authClient = AuthorizationClientRepository.get(deviceId);

  const event = new RoomEvent({
    name: req.body.name,
    start: req.body.start,
    end: req.body.end
  });


  if (!authClient) {
    res.status(401);

    return res.json({
      scope: 'client',
      error: 'You don\'t have access, or your session has ended'
    });
  }

  RoomEventRepository.save(room, event, authClient)
    .then(() => {
      return RoomRepository.get(room.id, authClient, deviceId)
    })
    .then((room) => {
      return RoomEventRepository.getAll(room.id, authClient)
        .then((events) => {
          room.events = events;

          res.json(room)
        });
    })
    .catch((err) => {
      res.status(err.code ? err.code : 400);
      res.json({
        error: 'Something was wrong. Please check your access or internet connection'
      });
    });
});

module.exports = function () {
  this.use('/', router);
};
