const express = require('express');
const router = express.Router();

const RoomRepository = require('../repositories/room');
const RoomEventRepository = require('../repositories/room-event');
const AdminAuthorizationClientRepository = require('../repositories/admin-authorization-client');

router.get('/api/room/:roomId', (req, res) => {
  const deviceId = req.header('deviceId');

  const client = AdminAuthorizationClientRepository.get(deviceId);
  if (!client) {
    res.status(401);
    res.json({
      scope: 'admin',
      error: 'authorization failed'
    })
  }

  RoomRepository.get(req.params.roomId, client, deviceId)
    .then((room) => {
      return RoomEventRepository.getAll(room.id, client)
        .then((events) => {
          room.events = events;

          res.json(room)
        });
    })
    .catch((err) => {
      res.status(404);
      res.json({
        error: err.message
      });
    });
});

router.get('/api/room/', (req, res) => {
  const deviceId = req.header('deviceId');
  const client = AdminAuthorizationClientRepository.get(deviceId);

  if (!client) {
    res.status(401);
    res.json({
      scope: 'admin',
      error: 'authorization failed'
    })
  }

  RoomRepository.getAll(client)
    .then((rooms) => res.json(rooms))
    .catch((err) => {
      res.status(err.code ? err.code : 400);
      res.json({
        error: err.message
      });
    });
});

module.exports = function () {
  this.use('/', router);
};
